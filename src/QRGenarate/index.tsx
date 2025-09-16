import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '@tanstack/react-form';
import QRCode from 'qrcode';
import { useState } from 'react';
import { z } from 'zod';
import Button from '../components/Button';

// Zod schema for validation
const qrInputSchema = z.object({
  inputText: z
    .string()
    .min(1, 'Please enter a URL or text')
    .max(2000, 'Input text is too long (max 2000 characters)')
    .refine(
      (val) => {
        // Allow URLs, text, or email addresses
        const urlPattern = /^https?:\/\/.+/i;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return urlPattern.test(val) || emailPattern.test(val) || val.length > 0;
      },
      {
        message: 'Please enter a valid URL, email, or text',
      },
    ),
});

type QRFormData = z.infer<typeof qrInputSchema>;

function QRGenerate() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // TanStack Form setup
  const form = useForm({
    defaultValues: {
      inputText: '',
    } as QRFormData,
    validators: {
      onChange: qrInputSchema,
    },
    onSubmit: async ({ value }) => {
      setIsGenerating(true);
      setQrCodeUrl('');

      try {
        // Generate QR code as data URL
        const url = await QRCode.toDataURL(value.inputText, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error('QR Code generation error:', err);
        // Handle error through form state
        form.setFieldMeta('inputText', (prev) => ({
          ...prev,
          errors: ['Failed to generate QR code'],
        }));
      } finally {
        setIsGenerating(false);
      }
    },
  });

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearQRCode = () => {
    setQrCodeUrl('');
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center font-bold text-4xl text-gray-800">
          QR Code Generator
        </h1>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          {/* Input Section */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="mb-8"
          >
            <form.Field
              name="inputText"
              children={(field) => (
                <>
                  <label
                    htmlFor="qr-input"
                    className="mb-2 block font-medium text-gray-700 text-sm"
                  >
                    Enter URL or Text
                  </label>
                  <div className="flex gap-4">
                    <input
                      id="qr-input"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com or any text..."
                      className={`flex-1 rounded-lg border px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        field.state.meta.errors.length > 0
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    <Button
                      disabled={isGenerating || !field.state.value.trim()}
                      variant="primary"
                      label={isGenerating ? 'Generating...' : 'Generate'}
                      type="submit"
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <p className="m-1 text-red-500 text-sm">
                      {typeof field.state.meta.errors[0] === 'string'
                        ? field.state.meta.errors[0]
                        : field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </>
              )}
            />
          </form>

          {/* QR Code Display Section */}
          {qrCodeUrl && (
            <div className="text-center">
              <div className="mb-6 rounded-lg bg-gray-50 p-6">
                <h3 className="mb-4 font-semibold text-gray-700 text-lg">
                  Generated QR Code
                </h3>
                <div className="flex justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={downloadQRCode}
                  variant="success"
                  label="Download PNG"
                  icon={faDownload}
                />
                <Button
                  onClick={clearQRCode}
                  variant="secondary"
                  label="Clear"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRGenerate;
