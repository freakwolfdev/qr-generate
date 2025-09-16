import { useState } from 'react'
import QRCode from 'qrcode'

function QRGenerate() {
  const [inputText, setInputText] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const generateQRCode = async () => {
    if (!inputText.trim()) {
      setError('Please enter a URL or text')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      // Generate QR code as data URL
      const url = await QRCode.toDataURL(inputText, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
      setQrCodeUrl(url)
    } catch (err) {
      setError('Failed to generate QR code')
      console.error('QR Code generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = qrCodeUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearQRCode = () => {
    setQrCodeUrl('')
    setInputText('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">QR Code Generator</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Input Section */}
          <div className="mb-8">
            <label htmlFor="qr-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter URL or Text
            </label>
            <div className="flex gap-4">
              <input
                id="qr-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="https://example.com or any text..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                onKeyPress={(e) => e.key === 'Enter' && generateQRCode()}
              />
              <button
                onClick={generateQRCode}
                disabled={isGenerating}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* QR Code Display Section */}
          {qrCodeUrl && (
            <div className="text-center">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Generated QR Code</h3>
                <div className="flex justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="border border-gray-200 rounded-lg shadow-sm"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={downloadQRCode}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">How to use:</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Enter any URL (like https://example.com) or text</li>
              <li>• Click "Generate" to create your QR code</li>
              <li>• Use "Download PNG" to save the QR code to your device</li>
              <li>• QR codes can be scanned by any smartphone camera</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRGenerate
