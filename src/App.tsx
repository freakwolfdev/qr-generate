import QRCode from 'qrcode';
import { useState } from 'react';

function QRGenerate() {
  const [inputText, setInputText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateQRCode = async () => {
    if (!inputText.trim()) {
      setError('Please enter a URL or text');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Generate QR code as data URL
      const url = await QRCode.toDataURL(inputText, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(url);
    } catch (err) {
      setError('Failed to generate QR code');
      console.error('QR Code generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

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
    setInputText('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center font-bold text-4xl text-gray-800">
          QR Code Generator
        </h1>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          {/* Input Section */}
          <div className="mb-8">
            <label
              htmlFor="qr-input"
              className="mb-2 block font-medium text-gray-700 text-sm"
            >
              Enter URL or Text
            </label>
            <div className="flex gap-4">
              <input
                id="qr-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="https://example.com or any text..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && generateQRCode()}
              />
              <button
                onClick={generateQRCode}
                disabled={isGenerating}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                type="button"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </div>

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
                <button
                  onClick={downloadQRCode}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
                  type="button"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PNG
                </button>
                <button
                  onClick={clearQRCode}
                  className="rounded-lg bg-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 font-semibold text-blue-800">How to use:</h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• Enter any URL (like https://example.com) or text</li>
              <li>• Click "Generate" to create your QR code</li>
              <li>• Use "Download PNG" to save the QR code to your device</li>
              <li>• QR codes can be scanned by any smartphone camera</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRGenerate;
