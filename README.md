# QR Code Generator

A modern, responsive web application for generating QR codes from URLs or text. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🚀 **Fast QR Code Generation** - Generate QR codes instantly from any text or URL
- 📱 **Mobile Responsive** - Works perfectly on desktop and mobile devices
- 🎨 **Modern UI** - Clean, intuitive interface with Tailwind CSS styling
- 💾 **Download Support** - Save generated QR codes as PNG files
- ⚡ **TypeScript** - Full type safety and better development experience
- 🔧 **Modern Tooling** - Built with Vite for fast development and builds

## Screenshots

The application features a clean, gradient background with a centered form for inputting text or URLs. Generated QR codes are displayed prominently with download and clear options.

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **QR Code Library**: qrcode.js
- **Package Manager**: Bun
- **Linting**: Biome
- **Development**: Hot Module Replacement (HMR)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qr-generate
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
bun run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
bun run preview
```

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run type checking and linting
- `bun run lint:fix` - Fix linting issues automatically
- `bun run format` - Format code with Biome
- `bun run check` - Run all checks and fixes

## Usage

1. **Enter Text or URL**: Type any text or URL in the input field
2. **Generate QR Code**: Click the "Generate" button or press Enter
3. **Download**: Click "Download PNG" to save the QR code to your device
4. **Clear**: Use the "Clear" button to reset and start over

## QR Code Features

- **Size**: 300x300 pixels with 2px margin
- **Colors**: Black on white background
- **Format**: PNG with high quality
- **Compatibility**: Works with all standard QR code scanners

## Project Structure

```
qr-generate/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx          # Main QR generator component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # Vite type definitions
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── biome.json          # Biome linting configuration
```

## Development

### Code Quality

This project uses Biome for linting and formatting:
- Automatic code formatting
- TypeScript type checking
- ESLint-style rules
- Import sorting

### Styling

The project uses Tailwind CSS v4 with:
- Utility-first CSS framework
- Responsive design utilities
- Custom gradient backgrounds
- Modern component styling

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and linting: `bun run check`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [qrcode.js](https://github.com/soldair/node-qrcode) for QR code generation
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for build tooling
- [React](https://react.dev/) for the UI framework
