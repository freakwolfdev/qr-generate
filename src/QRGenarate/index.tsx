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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 h-32 w-32 animate-float rounded-full bg-gradient-to-r from-indigo-300/40 to-cyan-300/40 blur-xl" />
        <div className="absolute top-40 right-20 h-24 w-24 animate-float-delay rounded-full bg-gradient-to-r from-cyan-300/50 to-blue-300/50 blur-lg" />
        <div className="absolute bottom-40 left-20 h-40 w-40 animate-float-slow rounded-full bg-gradient-to-r from-purple-300/30 to-indigo-300/30 blur-2xl" />
        <div className="absolute right-20 bottom-20 h-28 w-28 animate-float rounded-full bg-gradient-to-r from-cyan-400/40 to-teal-400/40 blur-xl" />

        {/* Additional floating elements */}
        <div className="absolute top-1/2 left-1/4 h-20 w-20 animate-float rounded-full bg-gradient-to-r from-pink-300/30 to-rose-300/30 blur-lg" />
        <div className="absolute top-2/3 right-1/4 h-16 w-16 animate-float-delay rounded-full bg-gradient-to-r from-emerald-300/40 to-teal-300/40 blur-md" />

        {/* Dotted background pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full bg-[length:40px_40px] bg-[radial-gradient(circle_at_2px_2px,rgba(99,102,241,0.6)_2px,transparent_0)]" />
        </div>

        {/* Additional dotted patterns for depth */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[length:60px_60px] bg-[radial-gradient(circle_at_3px_3px,rgba(6,182,212,0.4)_1px,transparent_0)]" />
        </div>

        {/* Subtle dot overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[length:80px_80px] bg-[radial-gradient(circle_at_4px_4px,rgba(139,92,246,0.3)_1px,transparent_0)]" />
        </div>

        {/* Subtle gradient lines */}
        <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
        <div className="absolute right-0 bottom-1/4 h-px w-full bg-gradient-to-l from-transparent via-cyan-300/40 to-transparent" />
        <div className="absolute top-3/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-purple-300/30 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto max-w-2xl">
        <div className="mb-4 animate-fade-in text-center">
          <h1 className="mb-4 animate-slide-down bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-center font-bold text-5xl text-transparent">
            QR Code Generator
          </h1>
          <p className="animate-fade-in-delay font-light text-gray-600 text-xl">
            Create beautiful QR codes in seconds
          </p>
        </div>

        <div className="animate-slide-up rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
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
                  <div className="flex gap-4">
                    <input
                      id="qr-input"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com or any text..."
                      className={`flex-1 rounded-xl border-2 bg-white/90 px-6 py-4 text-lg placeholder-gray-400 outline-none backdrop-blur-sm transition-all duration-300 hover:shadow-md focus:border-transparent focus:shadow-lg focus:ring-2 focus:ring-indigo-500 ${
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
            <form.Field
              name="color"
              children={(field) => (
                <div className="flex animate-fade-in flex-col gap-3">
                  <label
                    htmlFor="qr-color"
                    className="mb-2 block font-semibold text-gray-800 text-lg"
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
                      className={`h-16 w-20 cursor-pointer rounded-xl border-2 border-indigo-200 outline-none transition-all duration-300 hover:scale-110 hover:shadow-lg focus:border-transparent focus:ring-2 focus:ring-indigo-500 ${
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
                      className={`${isGenerating ? 'loading' : ''} px-12 py-4 text-xl transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                    />
                  </div>
                );
              }}
            </form.Subscribe>
          </form>

          {/* QR Code Display Section */}
          {qrCodeUrl && (
            <div className="mt-12 animate-fade-in text-center">
              <div className="mb-8 animate-slide-up rounded-3xl border border-indigo-100 bg-white/90 p-8 shadow-xl backdrop-blur-sm">
                <h3 className="mb-6 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text font-bold text-3xl text-transparent">
                  Generated QR Code
                </h3>
                <div className="flex justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="rounded-2xl border-2 border-indigo-200 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex animate-fade-in-delay justify-center gap-6">
                <Button
                  onClick={downloadQRCode}
                  variant="success"
                  label="Download PNG"
                  icon={faDownload}
                  className="px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                />
                <Button
                  onClick={clearQRCode}
                  variant="secondary"
                  label="Clear"
                  className="px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
