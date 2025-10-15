# 🍷 Liquor Store Management System

A professional desktop application built with Electron, React, and TypeScript for managing liquor store operations including inventory, point of sale, and analytics.

## ✨ Features

- **📊 Dashboard**: Real-time analytics and key performance indicators
- **🛒 Point of Sale**: Complete transaction management with age verification
- **📦 Inventory Management**: Product catalog, stock tracking, and low stock alerts
- **👥 Customer Management**: Customer database with age verification tracking
- **📈 Reports & Analytics**: Sales reports, profitability analysis, and trend tracking
- **🔧 Administration**: User management, system settings, and data backup

## 🏗️ Architecture

This application follows professional Electron architecture patterns:

```
src/
├── main/                 # Main process (Electron backend)
│   ├── app/             # Core application logic
│   ├── ipc/             # Inter-process communication
│   ├── windows/         # Window management
│   └── utils/           # Main process utilities
├── renderer/            # Renderer process (React frontend)
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   ├── stores/          # State management
│   └── utils/           # Utility functions
├── preload/             # Preload scripts
├── shared/              # Shared code between processes
└── types/               # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Liquor_Management_System
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev:electron
   ```

### Available Scripts

| Script                  | Description                        |
| ----------------------- | ---------------------------------- |
| `npm run dev`           | Start Vite development server      |
| `npm run dev:electron`  | Start Electron in development mode |
| `npm run build`         | Build for production               |
| `npm run build:win`     | Build Windows executable           |
| `npm run build:mac`     | Build macOS application            |
| `npm run build:linux`   | Build Linux application            |
| `npm run lint`          | Run ESLint                         |
| `npm run lint:fix`      | Fix ESLint issues                  |
| `npm run format`        | Format code with Prettier          |
| `npm run test`          | Run tests                          |
| `npm run test:ui`       | Run tests with UI                  |
| `npm run test:coverage` | Run tests with coverage            |
| `npm run type-check`    | Run TypeScript type checking       |
| `npm run clean`         | Clean build directories            |

## 🛠️ Development

### Code Quality

This project enforces high code quality standards:

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files
- **TypeScript**: Static type checking

### Testing

- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM environment for tests
- **Coverage**: Code coverage reporting

### Project Structure

- **Modular Architecture**: Clear separation between main and renderer processes
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Comprehensive error handling and logging
- **Security**: Context isolation and secure IPC communication
- **Performance**: Optimized builds and lazy loading

## 📦 Building

### Development Build

```bash
npm run dev:electron
```

### Production Build

```bash
npm run build
```

### Platform-Specific Builds

**Local Windows Build:**

```bash
npm run build:installer  # Creates Windows NSIS and Portable installers
```

**macOS Build (GitHub Actions - Recommended):**

⚠️ **Important**: macOS builds cannot be created from Windows. Use GitHub Actions instead:

1. Push your code to GitHub
2. Go to the Actions tab
3. Download the built DMG files from artifacts

See [BUILD.md](BUILD.md) for detailed instructions.

**Alternative platforms:**

```bash
npm run build:mac    # macOS (requires Mac)
npm run build:linux  # Linux
```

### 🚀 Automated Builds with GitHub Actions

This project includes automated builds for both Windows and macOS:

- **Automatic**: Builds run on every push to main/master
- **Multi-platform**: Windows and macOS built simultaneously
- **No Mac needed**: macOS DMG files built on GitHub's macOS runners
- **Releases**: Tag commits with `v*` to create GitHub Releases

See `.github/workflows/build-release.yml` and [BUILD.md](BUILD.md) for details.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
NODE_ENV=development
```

### Build Configuration

The application uses `electron-builder` for packaging. Configuration is in `package.json` under the `build` section.

## 🧪 Testing

### Run Tests

```bash
npm run test
```

### Run Tests with UI

```bash
npm run test:ui
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@liquorstore.com or create an issue in the repository.

## 🎯 Roadmap

- [ ] Backend API integration
- [ ] Database integration
- [ ] User authentication
- [ ] Advanced reporting
- [ ] Mobile companion app
- [ ] Cloud synchronization

---

**Built with ❤️ using Electron, React, and TypeScript**
