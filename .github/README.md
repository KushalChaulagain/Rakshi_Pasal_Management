# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated building and releasing.

## build-release.yml

This workflow automatically builds the Liquor Store Management System for both Windows and macOS platforms.

### Triggers

The workflow runs on:

- **Push to main/master branches**: Builds both platforms and uploads artifacts
- **Pull requests**: Builds to verify no breaking changes
- **Tagged releases (v\*)**: Builds and creates a GitHub Release
- **Manual trigger**: Can be run manually from the Actions tab

### Jobs

#### 1. build-windows

- **Runner**: `windows-latest`
- **Purpose**: Build Windows installers (NSIS + Portable)
- **Output**: Uploads Windows .exe files as artifacts
- **Duration**: ~3-5 minutes

#### 2. build-macos

- **Runner**: `macos-latest`
- **Purpose**: Build macOS DMG files (Intel + Apple Silicon)
- **Output**: Uploads macOS .dmg files as artifacts
- **Duration**: ~5-8 minutes
- **Note**: Code signing is disabled by default (`CSC_IDENTITY_AUTO_DISCOVERY: false`)

#### 3. release

- **Runner**: `ubuntu-latest`
- **Purpose**: Create GitHub Release with all installers
- **Trigger**: Only runs on tagged releases (v\*)
- **Output**: Draft release with all Windows and macOS installers attached

### Artifacts

After each build, artifacts are available for 30 days:

- **windows-installers**: Contains all .exe files
- **macos-dmg**: Contains all .dmg files

### How to Use

#### For Regular Builds

1. Push your code:

   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. Go to GitHub → Actions tab → View your workflow run
3. Download artifacts after build completes

#### For Releases

1. Create and push a tag:

   ```bash
   git tag v1.0.2
   git push origin v1.0.2
   ```

2. Workflow automatically:
   - Builds both platforms
   - Creates a draft release
   - Attaches all installers

3. Go to Releases → Edit the draft → Publish

### Adding Code Signing (Optional)

To sign macOS builds:

1. Get an Apple Developer account ($99/year)
2. Create signing certificates
3. Add these secrets to your GitHub repository:
   - `APPLE_ID`: Your Apple ID email
   - `APPLE_PASSWORD`: App-specific password
   - `CSC_LINK`: Base64-encoded .p12 certificate
   - `CSC_KEY_PASSWORD`: Certificate password

4. Update `build-release.yml`:

   ```yaml
   # Remove this line from the macOS job:
   # CSC_IDENTITY_AUTO_DISCOVERY: false

   # Add these environment variables:
   env:
     APPLE_ID: ${{ secrets.APPLE_ID }}
     APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
     CSC_LINK: ${{ secrets.CSC_LINK }}
     CSC_KEY_PASSWORD: ${{ secrets.CSC_KEY_PASSWORD }}
   ```

### Troubleshooting

**Build fails on Windows:**

- Check that all dependencies are in package.json
- Verify PowerShell scripts work on Windows

**Build fails on macOS:**

- Ensure build/icon.icns exists
- Check package.json macOS configuration
- Review electron-builder logs

**Release not created:**

- Verify tag starts with 'v' (e.g., v1.0.0)
- Check that both build jobs succeeded
- Ensure GITHUB_TOKEN has sufficient permissions

### Costs

- **Public repositories**: Free (unlimited minutes)
- **Private repositories**: 2,000 minutes/month free
  - Windows: 1 minute = 2 minutes
  - macOS: 1 minute = 10 minutes
  - Example: One full build (~8 min Windows + 6 min macOS) = 76 minutes charged

### Customization

To modify the workflow:

1. Edit `.github/workflows/build-release.yml`
2. Change triggers, runners, or steps as needed
3. Test with a commit or manual trigger
4. See [GitHub Actions docs](https://docs.github.com/en/actions) for more options

### Local Testing

You can test the build commands locally:

**Windows:**

```bash
npm run build:installer
```

**macOS (requires Mac):**

```bash
npm run build:mac
```

But remember: The whole point of GitHub Actions is you don't need a Mac! 🎉
