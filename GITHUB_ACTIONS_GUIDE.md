# Quick Start: Building macOS DMG with GitHub Actions

Since electron-builder **cannot build macOS apps from Windows**, this project now uses GitHub Actions to build macOS DMG files automatically on GitHub's macOS runners.

## ✅ What Was Set Up

1. **Icon converted**: `build/icon.icns` created from `build/icon.png`
2. **Package.json updated**: Enhanced macOS and DMG build configuration
3. **GitHub Actions workflow**: `.github/workflows/build-release.yml` created
4. **Documentation**: Complete build instructions in `BUILD.md`

## 🚀 How to Build macOS DMG

### Step 1: Push Your Code to GitHub

```bash
# Make sure your repository is connected to GitHub
git add .
git commit -m "Add GitHub Actions for macOS builds"
git push origin main
```

### Step 2: View Build Progress

1. Go to your GitHub repository
2. Click the **"Actions"** tab at the top
3. You'll see the "Build & Release" workflow running
4. Click on the workflow run to see real-time progress

### Step 3: Download Your DMG Files

Once the build completes (5-10 minutes):

1. Scroll down to the **"Artifacts"** section
2. Download **"macos-dmg"** (contains your DMG files)
3. Download **"windows-installers"** (if you want Windows builds too)
4. Extract and test!

## 📦 What You Get

From each build:

**macOS:**

- `Liquor Store Management System 1.0.1.dmg` (Intel Macs - x64)
- `Liquor Store Management System 1.0.1-arm64.dmg` (Apple Silicon - M1/M2/M3)

**Windows:**

- `Liquor Store Management System 1.0.1.exe` (NSIS installer)
- `Liquor Store Management System 1.0.1 Portable.exe` (Portable version)

## 🏷️ Creating Releases

To create an official release:

```bash
# Tag your commit with a version number (must start with 'v')
git tag v1.0.2
git push origin v1.0.2
```

This will:

1. Build both Windows and macOS versions
2. Create a **draft release** on GitHub
3. Attach all installers to the release
4. You can then edit and publish the release

## ⚙️ Workflow Triggers

The workflow runs automatically on:

- ✅ Push to `main` or `master` branch
- ✅ Pull requests (for testing)
- ✅ Tagged releases (v\*)
- ✅ Manual trigger (from Actions tab → "Run workflow")

## 💰 Cost

- **Public repositories**: FREE (unlimited)
- **Private repositories**: 2,000 free minutes/month
  - Each build uses ~70-80 minutes (billed)
  - macOS minutes count as 10x (1 actual minute = 10 billed minutes)

## ⚠️ Important Notes

### Code Signing

The DMG files are **NOT signed** by default. macOS users will see security warnings:

> "App is from an unidentified developer"

**Users can bypass this:**

1. Right-click the app → "Open"
2. Click "Open" in the security dialog
3. The app will remember this for future launches

**To eliminate warnings (optional):**

1. Get an Apple Developer account ($99/year)
2. Add signing certificates to GitHub Secrets
3. Update the workflow (instructions in BUILD.md)

### Testing

Always test DMG files on an actual Mac before distributing:

- Drag app to Applications folder
- Launch and verify all features work
- Test on both Intel and Apple Silicon if possible

## 🔧 Local Windows Builds

You can still build Windows installers locally:

```bash
npm run build:installer
```

Output will be in the `release/` folder.

## 📚 More Information

- **Full documentation**: See [BUILD.md](BUILD.md)
- **Workflow details**: See [.github/README.md](.github/README.md)
- **Troubleshooting**: Check BUILD.md troubleshooting section

## 🎉 That's It!

You're now set up to build macOS DMG files without owning a Mac. Just push your code and let GitHub Actions do the work!

---

**Questions?** Check BUILD.md or open an issue in the repository.
