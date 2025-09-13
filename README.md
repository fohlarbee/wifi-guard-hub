# WiFi Guard Hub

A modern web application for monitoring and managing WiFi network security, built with React and TypeScript.

## Features

- **Network Status Monitoring**: Real-time WiFi network status and security analysis
- **Security Controls**: Advanced security management tools for your network
- **Log Panel**: Comprehensive logging and monitoring capabilities
- **WireGuard Integration**: VPN configuration and management
- **Modern UI**: Clean, responsive interface built with shadcn/ui components

## Tech Stack

This project is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <YOUR_GIT_URL>
   cd wifi-guard-hub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run build:dev` - Build the application in development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui component library
│   ├── LogPanel.tsx    # Network log monitoring
│   ├── NetworkStatusCard.tsx  # Network status display
│   ├── SecurityControls.tsx   # Security management
│   └── WireGuardDialog.tsx    # VPN configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Application pages
├── types/              # TypeScript type definitions
└── utils/              # Helper utilities
```

## Development

### Code Style

This project uses ESLint for code linting and follows modern React/TypeScript best practices.

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For support and questions, please open an issue in the repository or contact the development team.
