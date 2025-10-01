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
  color: z.string().min(1, 'Please enter a color').optional().nullable(),
});

type QRFormData = z.infer<typeof qrInputSchema>;

function QRGenerate() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // TanStack Form setup
  const form = useForm({
    defaultValues: {
      inputText: '',
      color: '#000000',
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
            dark: value.color ?? '#000000',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 px-4 py-8">
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-center font-bold text-4xl text-gray-800">
            QR Code Generator
          </h1>
          <p className="font-light text-gray-600 text-lg">
            Create beautiful QR codes in seconds
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          {/* Input Section */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-4"
          >
            <form.Field
              name="inputText"
              children={(field) => (
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="qr-input"
                    className="mb-2 block font-semibold text-gray-700 text-lg"
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
                      className={`flex-1 rounded-lg border-2 bg-white px-6 py-4 text-lg placeholder-gray-400 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        field.state.meta.errors.length > 0
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-red-500">⚠️</span>
                      <p className="font-medium text-red-500 text-sm">
                        {typeof field.state.meta.errors[0] === 'string'
                          ? field.state.meta.errors[0]
                          : field.state.meta.errors[0]?.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
            />
            <form.Field
              name="color"
              children={(field) => (
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="qr-color"
                    className="mb-2 block font-semibold text-gray-700 text-lg"
                  >
                    Choose Color for QR Code
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="qr-color"
                      name={field.name}
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`h-16 w-20 cursor-pointer rounded-lg border-2 border-gray-300 outline-none transition-all duration-200 hover:scale-105 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        field.state.meta.errors.length > 0
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      type="color"
                    />
                    <div className="flex-1 rounded-lg bg-gray-50 px-4 py-3">
                      <span className="font-medium text-gray-700">
                        Selected: {field.state.value || '#000000'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            />
            <form.Subscribe
              selector={(state) => [
                state.isSubmitting,
                state.canSubmit,
                state.isDefaultValue,
              ]}
            >
              {([isSubmitting, canSubmit, isDefaultValue]) => {
                return (
                  <div className="mt-8 flex justify-center">
                    <Button
                      disabled={isSubmitting || !canSubmit || isDefaultValue}
                      variant="primary"
                      label={
                        isGenerating ? 'Generating...' : '🚀 Generate QR Code'
                      }
                      type="submit"
                      className={`${isGenerating ? 'loading' : ''} px-12 py-4 text-xl transition-all duration-200`}
                    />
                  </div>
                );
              }}
            </form.Subscribe>
          </form>

          {/* QR Code Display Section */}
          {qrCodeUrl && (
            <div className="mt-12 text-center">
              <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="mb-6 font-bold text-2xl text-gray-800">
                  Generated QR Code
                </h3>
                <div className="flex justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="rounded-lg border-2 border-gray-200 shadow-lg"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-6">
                <Button
                  onClick={downloadQRCode}
                  variant="success"
                  label="Download PNG"
                  icon={faDownload}
                  className="px-8 py-4 text-lg transition-all duration-200"
                />
                <Button
                  onClick={clearQRCode}
                  variant="secondary"
                  label="Clear"
                  className="px-8 py-4 text-lg transition-all duration-200"
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
