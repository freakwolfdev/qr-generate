# QR Code Generator

A modern, responsive web application for generating customizable QR codes from URLs or text. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🚀 **Fast QR Code Generation** - Generate QR codes instantly from any text or URL
- 🎨 **Customizable Colors** - Choose custom foreground and background colors
- 🖼️ **Center Image Support** - Add logos or icons at the center of QR codes
- 📱 **Mobile Responsive** - Works perfectly on desktop and mobile devices
- 🎯 **Modern UI** - Clean, intuitive interface with Tailwind CSS styling
- 💾 **Download Support** - Save generated QR codes as PNG files
- ⚡ **TypeScript** - Full type safety and better development experience
- 🔧 **Modern Tooling** - Built with Vite for fast development and builds

## Screenshots

The application features a clean, gradient background with a centered form for inputting text or URLs. Users can customize QR code colors, add center images, and generate professional-looking QR codes with download and clear options.

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **QR Code Library**: qr-code-styling
- **Form Management**: TanStack React Form
- **Validation**: Zod
- **Icons**: Font Awesome
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
2. **Customize Colors**: Choose custom foreground and background colors using the color pickers
3. **Add Center Image** (Optional): Upload a logo or icon to place at the center of the QR code
4. **Generate QR Code**: Click the "Generate" button or press Enter
5. **Download**: Click "Download PNG" to save the QR code to your device
6. **Clear**: Use the "Clear" button to reset and start over

## QR Code Features

- **Size**: 300x300 pixels with 20px margin
- **Colors**: Customizable foreground and background colors
- **Style**: Rounded dots and corners for modern appearance
- **Center Image**: Optional logo/icon placement with proper spacing
- **Format**: PNG with high quality
- **Compatibility**: Works with all standard QR code scanners

## Customization Options

### Color Customization
- **Foreground Color**: Choose any color for the QR code pattern
- **Background Color**: Select custom background colors
- **Real-time Preview**: See color changes instantly in the UI

### Center Image Features
- **Image Upload**: Support for all common image formats (PNG, JPG, GIF, etc.)
- **Image Preview**: See uploaded image before generating QR code
- **Automatic Sizing**: Images are automatically sized to fit properly
- **Easy Removal**: One-click removal of center images

### QR Code Styling
- **Rounded Elements**: Modern rounded dots and corner squares
- **Professional Appearance**: Clean, branded look for business use
- **High Quality**: 300x300 pixel output with crisp details

## Project Structure

```
qr-generate/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Background.tsx    # Animated background component
│   │   └── Button.tsx        # Reusable button component
│   ├── QRGenarate/
│   │   └── index.tsx         # Main QR generator component
│   ├── lib/
│   │   └── helper.ts         # Utility functions
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   └── vite-env.d.ts         # Vite type definitions
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── biome.json               # Biome linting configuration
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

- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) for advanced QR code generation with styling options
- [TanStack React Form](https://tanstack.com/form) for form management
- [Zod](https://zod.dev/) for schema validation
- [Font Awesome](https://fontawesome.com/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for build tooling
- [React](https://react.dev/) for the UI framework
