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
  centerImage: z.string().optional().nullable(),
});

type QRFormData = z.infer<typeof qrInputSchema>;

function QRGenerate() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  // TanStack Form setup
  const form = useForm({
    defaultValues: {
      inputText: '',
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
      centerImage: null,
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
          image: value.centerImage || '',
          margin: 20,
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
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: 4,
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
    setImagePreview('');
    form.reset();
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-2 py-4 sm:px-4 sm:py-8">
      <Background />

      <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-0">
        <div className="mb-8 animate-fade-in text-center">
          <h1 className="mb-6 animate-slide-down bg-linear-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-center font-bold text-4xl text-transparent sm:text-6xl">
            QR Code Generator
          </h1>
          <p className="animate-fade-in-delay font-light text-lg text-white/80 sm:text-xl">
            Create beautiful, customizable QR codes in seconds
          </p>
        </div>

        <div className="animate-slide-up rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
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
                <div className="flex animate-fade-in flex-col gap-4">
                  <label
                    htmlFor="qr-input"
                    className="mb-2 block font-semibold text-lg text-white"
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
                      className={`flex-1 rounded-2xl border-2 bg-white/10 px-6 py-4 text-base text-white placeholder-white/60 outline-none backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-lg focus:border-cyan-400 focus:bg-white/20 focus:shadow-xl focus:ring-2 focus:ring-cyan-400/50 sm:px-8 sm:py-5 sm:text-lg ${
                        field.state.meta.errors.length > 0
                          ? 'border-red-400 focus:ring-red-400/50'
                          : 'border-white/30 focus:ring-cyan-400/50'
                      }`}
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <div className="flex animate-shake items-center gap-2">
                      <span className="text-lg text-red-400">⚠️</span>
                      <p className="font-medium text-red-400 text-sm">
                        {typeof field.state.meta.errors[0] === 'string'
                          ? field.state.meta.errors[0]
                          : field.state.meta.errors[0]?.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
            />
            {/* Color Fields Container */}
            <div className="flex animate-fade-in flex-col gap-6 sm:flex-row sm:gap-8">
              {/* Foreground Color Field */}
              <form.Field
                name="foregroundColor"
                children={(field) => (
                  <div className="flex flex-1 flex-col gap-4">
                    <label
                      htmlFor="qr-foreground-color"
                      className="mb-2 block font-semibold text-lg text-white"
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
                        className={`h-14 w-16 cursor-pointer rounded-2xl border-2 border-white/30 p-2 outline-none transition-all duration-300 hover:scale-110 hover:shadow-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 ${
                          field.state.meta.errors.length > 0
                            ? 'border-red-400 focus:ring-red-400/50'
                            : 'border-white/30 focus:ring-cyan-400/50'
                        }`}
                        type="color"
                      />
                      <div className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm">
                        <span className="font-medium text-white/90">
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
                  <div className="flex flex-1 flex-col gap-4">
                    <label
                      htmlFor="qr-background-color"
                      className="mb-2 block font-semibold text-lg text-white"
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
                        className={`h-14 w-16 cursor-pointer rounded-2xl border-2 border-white/30 p-2 outline-none transition-all duration-300 hover:scale-110 hover:shadow-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 ${
                          field.state.meta.errors.length > 0
                            ? 'border-red-400 focus:ring-red-400/50'
                            : 'border-white/30 focus:ring-cyan-400/50'
                        }`}
                        type="color"
                      />
                      <div className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm">
                        <span className="font-medium text-white/90">
                          Selected: {field.state.value || '#FFFFFF'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>

            {/* Center Image Upload Field */}
            <form.Field
              name="centerImage"
              children={(field) => (
                <div className="flex animate-fade-in flex-col gap-4">
                  <label
                    htmlFor="qr-center-image"
                    className="mb-2 block font-semibold text-lg text-white"
                  >
                    Center Image (Optional)
                  </label>
                  <div className="flex flex-col gap-6">
                    <input
                      id="qr-center-image"
                      name={field.name}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            field.handleChange(result);
                            setImagePreview(result);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          field.handleChange(null);
                          setImagePreview('');
                        }
                      }}
                      className={`rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-4 text-base text-white outline-none backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-lg focus:border-cyan-400 focus:bg-white/20 focus:shadow-xl focus:ring-2 focus:ring-cyan-400/50 ${
                        field.state.meta.errors.length > 0
                          ? 'border-red-400 focus:ring-red-400/50'
                          : 'border-white/30 focus:ring-cyan-400/50'
                      }`}
                    />
                    {imagePreview && (
                      <div className="flex justify-center">
                        <div className="group relative">
                          <img
                            src={imagePreview}
                            alt="Center logo preview"
                            className="h-24 w-24 rounded-2xl border-2 border-white/30 object-cover shadow-2xl transition-all duration-300 group-hover:scale-105"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              field.handleChange(null);
                              setImagePreview('');
                            }}
                            className="-right-2 -top-2 absolute flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                    <p className="text-center text-sm text-white/70">
                      Upload a small image (logo, icon) to place at the center
                      of the QR code
                    </p>
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
                  <div className="mt-10 flex animate-fade-in justify-center">
                    <Button
                      disabled={isSubmitting || !canSubmit || isDefaultValue}
                      variant="primary"
                      label={
                        isGenerating ? 'Generating...' : '🚀 Generate QR Code'
                      }
                      type="submit"
                      className={`${isGenerating ? 'loading' : ''} w-full px-10 py-4 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-auto sm:px-16 sm:py-5 sm:text-xl`}
                    />
                  </div>
                );
              }}
            </form.Subscribe>
          </form>

          {/* QR Code Display Section */}
          {qrCodeUrl && (
            <div className="mt-12 animate-fade-in text-center">
              <div className="mb-8 animate-slide-up rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
                <h3 className="mb-6 bg-linear-to-r from-white via-cyan-200 to-purple-200 bg-clip-text font-bold text-3xl text-transparent sm:text-4xl">
                  Generated QR Code
                </h3>
                <div className="flex justify-center">
                  <div className="group relative">
                    <img
                      src={qrCodeUrl}
                      alt="Generated QR Code"
                      className="h-auto max-w-full rounded-3xl border-2 border-white/30 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                    />
                    <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-transparent via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex animate-fade-in-delay flex-col gap-6 sm:flex-row sm:justify-center sm:gap-8">
                <Button
                  onClick={downloadQRCode}
                  variant="success"
                  label="Download PNG"
                  icon={faDownload}
                  className="w-full px-8 py-4 font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
                />
                <Button
                  onClick={clearQRCode}
                  variant="secondary"
                  label="Clear"
                  className="w-full px-8 py-4 font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
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
