import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '@tanstack/react-form';
import QRCodeStyling from 'qr-code-styling';
import { useState } from 'react';
import { z } from 'zod';
import Background from '../components/Background';
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
  foregroundColor: z
    .string()
    .min(1, 'Please enter a foreground color')
    .optional()
    .nullable(),
  backgroundColor: z
    .string()
    .min(1, 'Please enter a background color')
    .optional()
    .nullable(),
});

type QRFormData = z.infer<typeof qrInputSchema>;

function QRGenerate() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // TanStack Form setup
  const form = useForm({
    defaultValues: {
      inputText: '',
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
    } as QRFormData,
    validators: {
      onChange: qrInputSchema,
    },
    onSubmit: async ({ value }) => {
      setIsGenerating(true);
      setQrCodeUrl('');

      try {
        // Create QR code styling instance
        const qrCode = new QRCodeStyling({
          width: 300,
          height: 300,
          type: 'svg',
          data: value.inputText,
          image: '',
          dotsOptions: {
            color: value.foregroundColor ?? '#000000',
            type: 'rounded',
          },
          backgroundOptions: {
            color: value.backgroundColor ?? '#FFFFFF',
          },
          cornersSquareOptions: {
            color: value.foregroundColor ?? '#000000',
            type: 'rounded',
          },
          cornersDotOptions: {
            color: value.foregroundColor ?? '#000000',
            type: 'dot',
          },
        });

        // Generate QR code as data URL
        const rawData = await qrCode.getRawData('png');
        if (rawData) {
          let url: string;
          if (rawData instanceof Blob) {
            url = URL.createObjectURL(rawData);
          } else {
            // Handle Buffer case - convert to Uint8Array first
            const uint8Array = new Uint8Array(rawData);
            const blob = new Blob([uint8Array], { type: 'image/png' });
            url = URL.createObjectURL(blob);
          }
          setQrCodeUrl(url);
        }
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-2 py-4 sm:px-4 sm:py-8">
      <Background />

      <div className="relative z-20 mx-auto max-w-2xl px-4 sm:px-0">
        <div className="mb-4 animate-fade-in text-center">
          <h1 className="mb-4 animate-slide-down bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-center font-bold text-3xl text-transparent sm:text-5xl">
            QR Code Generator
          </h1>
          <p className="animate-fade-in-delay font-light text-gray-600 text-lg sm:text-xl">
            Create beautiful QR codes in seconds
          </p>
        </div>

        <div className="animate-slide-up rounded-3xl border border-indigo-100 bg-white/80 p-4 shadow-xl backdrop-blur-sm sm:p-6">
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
                <div className="flex animate-fade-in flex-col gap-3">
                  <label
                    htmlFor="qr-input"
                    className="mb-2 block font-semibold text-gray-800 text-lg"
                  >
                    Enter URL or Text
                  </label>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <input
                      id="qr-input"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com or any text..."
                      className={`flex-1 rounded-xl border-2 bg-white/90 px-4 py-3 text-base placeholder-gray-400 outline-none backdrop-blur-sm transition-all duration-300 hover:shadow-md focus:border-transparent focus:shadow-lg focus:ring-2 focus:ring-indigo-500 sm:px-6 sm:py-4 sm:text-lg ${
                        field.state.meta.errors.length > 0
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-indigo-200 focus:ring-indigo-500'
                      }`}
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <div className="flex animate-shake items-center gap-2">
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
            {/* Foreground Color Field */}
            <form.Field
              name="foregroundColor"
              children={(field) => (
                <div className="flex animate-fade-in flex-col gap-3">
                  <label
                    htmlFor="qr-foreground-color"
                    className="mb-2 block font-semibold text-gray-800 text-lg"
                  >
                    QR Code Color (Foreground)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="qr-foreground-color"
                      name={field.name}
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`h-12 w-20 cursor-pointer rounded-xl border-2 border-indigo-200 outline-none transition-all duration-300 hover:scale-110 hover:shadow-lg focus:border-transparent focus:ring-2 focus:ring-indigo-500 ${
                        field.state.meta.errors.length > 0
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-indigo-200 focus:ring-indigo-500'
                      }`}
                      type="color"
                    />
                    <div className="flex-1 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-cyan-50 px-4 py-3">
                      <span className="font-medium text-gray-700">
                        Selected: {field.state.value || '#000000'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            />

            {/* Background Color Field */}
            <form.Field
              name="backgroundColor"
              children={(field) => (
                <div className="flex animate-fade-in flex-col gap-3">
                  <label
                    htmlFor="qr-background-color"
                    className="mb-2 block font-semibold text-gray-800 text-lg"
                  >
                    Background Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="qr-background-color"
                      name={field.name}
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`h-12 w-20 cursor-pointer rounded-xl border-2 border-indigo-200 outline-none transition-all duration-300 hover:scale-110 hover:shadow-lg focus:border-transparent focus:ring-2 focus:ring-indigo-500 ${
                        field.state.meta.errors.length > 0
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-indigo-200 focus:ring-indigo-500'
                      }`}
                      type="color"
                    />
                    <div className="flex-1 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-cyan-50 px-4 py-3">
                      <span className="font-medium text-gray-700">
                        Selected: {field.state.value || '#FFFFFF'}
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
                  <div className="mt-8 flex animate-fade-in justify-center">
                    <Button
                      disabled={isSubmitting || !canSubmit || isDefaultValue}
                      variant="primary"
                      label={
                        isGenerating ? 'Generating...' : '🚀 Generate QR Code'
                      }
                      type="submit"
                      className={`${isGenerating ? 'loading' : ''} w-full px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-auto sm:px-12 sm:py-4 sm:text-xl`}
                    />
                  </div>
                );
              }}
            </form.Subscribe>
          </form>

          {/* QR Code Display Section */}
          {qrCodeUrl && (
            <div className="mt-8 animate-fade-in text-center sm:mt-12">
              <div className="mb-6 animate-slide-up rounded-3xl border border-indigo-100 bg-white/90 p-4 shadow-xl backdrop-blur-sm sm:mb-8 sm:p-8">
                <h3 className="mb-4 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text font-bold text-2xl text-transparent sm:mb-6 sm:text-3xl">
                  Generated QR Code
                </h3>
                <div className="flex justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="h-auto max-w-full rounded-2xl border-2 border-indigo-200 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex animate-fade-in-delay flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
                <Button
                  onClick={downloadQRCode}
                  variant="success"
                  label="Download PNG"
                  icon={faDownload}
                  className="w-full px-6 py-3 text-base transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                />
                <Button
                  onClick={clearQRCode}
                  variant="secondary"
                  label="Clear"
                  className="w-full px-6 py-3 text-base transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
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
