# Build Instructions

This document provides instructions for building the Liquor Store Management System for different platforms.

## ⚠️ Important Note

**macOS DMG files cannot be built from Windows.** electron-builder requires macOS to build macOS apps.

**Solution: Use GitHub Actions** - This project includes a GitHub Actions workflow that automatically builds both Windows and macOS installers on GitHub's cloud runners. See the [GitHub Actions CI/CD](#github-actions-cicd) section below.

## Prerequisites

### For Local Windows Builds

- Node.js 18.x or higher
- npm 9.x or higher
- PowerShell (included with Windows)

### For macOS Builds via GitHub Actions

- GitHub account (free)
- Git repository pushed to GitHub
- No Mac required!

### For Local macOS Builds (Optional)

- macOS computer
- Xcode Command Line Tools
- Node.js 18.x or higher

## Quick Start

### Build for Windows

```bash
# Build all Windows installers (NSIS + Portable)
npm run build:installer

# Or build just the unpacked version
npm run build:electron
```

### Build for macOS

**⚠️ Important: macOS builds MUST be run on macOS**

electron-builder does not support building macOS DMG files from Windows or Linux. You have two options:

**Option 1: Use GitHub Actions (Recommended)**

```bash
# Push your code to GitHub
git push origin main

# The GitHub Actions workflow will automatically build both Windows and macOS versions
# Download the artifacts from the Actions tab
```

**Option 2: Build locally on a Mac**

```bash
# On a macOS machine, run:
npm run build:mac
```

### Build for All Platforms

To build for all platforms, use GitHub Actions by pushing to your repository. Local cross-platform builds are not supported.

## Build Scripts

| Script                    | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| `npm run build`           | Full build: type-check, lint, build renderer, build main, and package |
| `npm run build:renderer`  | Build React frontend only                                             |
| `npm run build:main`      | Compile Electron main process TypeScript                              |
| `npm run build:electron`  | Package Electron app (unpacked) for Windows                           |
| `npm run build:installer` | Create Windows installers (NSIS + Portable)                           |
| `npm run build:mac`       | Create macOS DMG installer (requires macOS)                           |
| `npm run build:all`       | Create both Windows and macOS installers (requires macOS)             |
| `npm run clean`           | Remove all build artifacts (dist, dist-electron, release)             |
| `npm run clean:release`   | Remove only the release directory (cross-platform)                    |

## Output Locations

All build artifacts are placed in the `release/` directory:

### Windows Builds

- `release/Liquor Store Management System {version}.exe` - NSIS installer
- `release/Liquor Store Management System {version} Portable.exe` - Portable executable
- `release/win-unpacked/` - Unpacked application files

### macOS Builds

- `release/Liquor Store Management System {version}.dmg` - macOS disk image
- `release/Liquor Store Management System {version}-arm64.dmg` - Apple Silicon version
- `release/mac/` - Unpacked .app bundle

## GitHub Actions CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/build-release.yml`) that automatically builds for both Windows and macOS.

### Automatic Builds

**On every push to main/master:**

- Builds Windows installers (NSIS + Portable)
- Builds macOS DMG files (x64 + arm64)
- Uploads artifacts that you can download from the Actions tab

**On tagged releases (v\*):**

- Builds for both platforms
- Creates a GitHub Release with all installers attached
- Sets the release as draft for you to review and publish

### How to Use GitHub Actions

1. **Push your code to GitHub:**

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **View build progress:**
   - Go to your repository on GitHub
   - Click the "Actions" tab
   - Watch the build progress in real-time

3. **Download built installers:**
   - After the build completes, click on the workflow run
   - Scroll to "Artifacts" section
   - Download `windows-installers` and/or `macos-dmg`

4. **Create a release:**

   ```bash
   git tag v1.0.2
   git push origin v1.0.2
   ```

   - This triggers a build and creates a draft release
   - Go to Releases on GitHub to edit and publish

### Workflow Configuration

The workflow runs on:

- **Windows runner** (windows-latest) - For Windows builds
- **macOS runner** (macos-latest) - For macOS DMG builds
- **Ubuntu runner** (ubuntu-latest) - For release creation

Build time: ~5-10 minutes per platform

## Platform-Specific Details

### Windows

Windows builds are created on Windows and are fully functional with no limitations.

**Build targets:**

- NSIS installer (requires admin, installs to Program Files)
- Portable executable (no installation required)

**Architectures:**

- x64 (64-bit Intel/AMD)

### macOS

**⚠️ IMPORTANT: electron-builder does not support building macOS apps from Windows or Linux.**

To build macOS DMG files, you must either:

1. Use GitHub Actions (recommended) - See the "GitHub Actions CI/CD" section above
2. Build on an actual Mac computer
3. Use a cloud Mac service (MacStadium, MacinCloud)

**Build targets:**

- DMG (Disk Image) installer

**Architectures:**

- x64 (Intel Macs)
- arm64 (Apple Silicon M1/M2/M3)

#### GitHub Actions Benefits

Using GitHub Actions to build macOS apps:

1. **No Mac Required**
   - Builds run on GitHub's macOS runners
   - Free for public repositories (2,000 minutes/month for private repos)
   - Automatic builds on every push

2. **Consistent Environment**
   - Same build environment every time
   - All dependencies installed fresh
   - No "works on my machine" issues

3. **Parallel Builds**
   - Windows and macOS build simultaneously
   - Faster than sequential local builds
   - Artifacts ready to download in ~5-10 minutes

#### Code Signing and Notarization

For production macOS releases, you should add code signing:

1. **Get Apple Developer Account** ($99/year)
2. **Create certificates** in Apple Developer Portal
3. **Add secrets to GitHub:**
   - `APPLE_ID` - Your Apple ID email
   - `APPLE_PASSWORD` - App-specific password
   - `CSC_LINK` - Base64-encoded .p12 certificate
   - `CSC_KEY_PASSWORD` - Certificate password

4. **Update workflow** to enable signing (remove `CSC_IDENTITY_AUTO_DISCOVERY: false`)

Without code signing, users will see security warnings (see below).

#### macOS User Instructions

If you receive a security warning when opening the app:

**Method 1: Right-click Open**

1. Locate the app in Finder
2. Right-click (or Control+click) on the app
3. Select "Open" from the menu
4. Click "Open" in the security dialog
5. The app will open and be remembered for future launches

**Method 2: System Preferences**

1. Try to open the app normally (it will be blocked)
2. Go to System Preferences → Security & Privacy
3. Click "Open Anyway" button
4. Enter your password if prompted

### Linux

Linux builds (AppImage) are supported but not included in the standard build commands. Use:

```bash
npm run build:linux
```

## Icon Requirements

The application uses different icon formats for each platform:

- **Windows**: `build/icon.png` (PNG format, 256x256 or higher)
- **macOS**: `build/icon.icns` (ICNS format, contains multiple sizes)
- **Linux**: `build/icon.png` (PNG format, 512x512 or higher)

### Converting Icons

If you need to regenerate the macOS icon from the PNG source:

```bash
# Install png2icons (if not already installed)
npm install --save-dev png2icons

# Create a conversion script or use this one-liner
node -e "const png2icons = require('png2icons'); const fs = require('fs'); const input = fs.readFileSync('build/icon.png'); const output = png2icons.createICNS(input, png2icons.BICUBIC, 0); fs.writeFileSync('build/icon.icns', output); console.log('Icon converted');"
```

## Troubleshooting

### Build Fails with "Cannot find module"

Make sure all dependencies are installed:

```bash
npm install
```

### macOS Build Fails on Windows

Ensure you have the latest version of electron-builder:

```bash
npm update electron-builder
```

### Build Size is Too Large

The application uses Electron which includes Chromium, resulting in a large bundle size (~150MB). This is normal for Electron applications.

### "Command failed" errors on Windows

Make sure PowerShell execution policy allows running scripts:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Development Builds

For development and testing:

```bash
# Run in development mode with hot-reload
npm run dev:electron

# Build without linting/type-checking (faster)
npm run build:renderer && npm run build:main
```

## Production Recommendations

For distributing to real users:

### Use GitHub Actions for Builds

- **Automated**: Builds happen automatically on push
- **Consistent**: Same environment every time
- **Fast**: Parallel builds for Windows and macOS
- **Free**: For public repos, low cost for private repos

### Windows

- Current build process is production-ready
- Consider adding code signing for enterprise deployment
- Windows Defender SmartScreen may flag unsigned apps

### macOS

- **Use GitHub Actions** with proper code signing
- Get an Apple Developer account ($99/year)
- Configure signing in the workflow
- Notarize the app through Apple
- This eliminates all security warnings for users

### Both Platforms

- Test on clean systems before distribution
- Create checksums (SHA256) for download verification
- Provide installation instructions for end users
- Consider auto-update mechanisms (electron-updater)
- Use GitHub Releases for version distribution

## Additional Resources

- [electron-builder Documentation](https://www.electron.build/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions for Electron](https://www.electron.build/configuration/publish#github-releases)
- [Code Signing Guide](https://www.electron.build/code-signing)
- [macOS Notarization Guide](https://www.electron.build/configuration/mac#notarization)
- [Multi-Platform Build Guide](https://www.electron.build/multi-platform-build)
- [electron-builder GitHub Actions Examples](https://github.com/electron-userland/electron-builder/tree/master/.github/workflows)
