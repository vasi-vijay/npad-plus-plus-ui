# NPad++ macOS Official Website & Release Portal

The official product website and download portal for **NPad++**, a native macOS code and text editor inspired by the productivity and editing capabilities of Notepad++.

---

## 🌟 Key Features of the Website

- **Interactive macOS Editor Demo:** Live in-browser demonstration of NPad++ featuring realistic AppKit window chrome, split-view editing, live PCRE regex find & replace, language syntax grammars, and theme toggling.
- **Verified Product Feature Explorer:** Clean breakdown of capabilities distinguishing verified v1.0 features from roadmap items (Treesitter syntax, column block selection, line operations, session auto-recovery, and terminal launcher).
- **Production DMG Download Flow:** Full release integration showing version, architecture tabs (Apple Silicon vs Intel), file size, SHA-256 checksums, and a diagnostic state switcher.
- **Gatekeeper & Security Transparency:** Clear guidance for users launching ad-hoc signed release candidate builds on macOS (right-click Open or `xattr -cr`).
- **Comprehensive Documentation:** Searchable guides for installation, keyboard shortcuts cheatsheet, regex syntax, script execution, and clean uninstallation.
- **Release Changelog:** Transparent release notes and future roadmap.
- **Independent Project Disclosure:** Prominent clarification that NPad++ is an independent macOS project, not affiliated with or endorsed by Don Ho or Notepad++.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
# The website will be available at http://localhost:3000
```

---

## 📦 Building for Production

```bash
# Type check and build static production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## ⚙️ Environment Variables & Release Configuration

Configure the release download URLs and repository details in `.env` or during deployment:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_DOWNLOAD_URL` | Direct URL to the Apple Silicon (ARM64) `.dmg` | Empty (shows *Pending Publication*) |
| `VITE_DOWNLOAD_URL_INTEL` | Direct URL to the Intel (x86_64) `.dmg` | Empty |
| `VITE_RELEASE_STATUS` | Force release status (`published` or `pending_publish`) | `pending_publish` if URL is empty |
| `VITE_GITHUB_REPO_URL` | URL to the public GitHub repository | `https://github.com/npadplusplus/npadplusplus` |
| `VITE_RELEASES_URL` | URL to GitHub Releases page | `https://github.com/npadplusplus/npadplusplus/releases` |

---

## 🛠️ DMG Release Packaging Workflow

### Option 1: Automated GitHub Actions
Push a Git tag to trigger `.github/workflows/release-dmg.yml`:
```bash
git tag v1.0.0-rc.1
git push origin v1.0.0-rc.1
```
The workflow will:
1. Spin up an Apple Silicon `macos-14` runner.
2. Build the native Swift / AppKit app bundle.
3. Package the `.dmg` using `hdiutil`.
4. Generate the SHA-256 checksum.
5. Publish a GitHub Release with the attached DMG asset.

### Option 2: Local Packaging Script
On a macOS machine:
```bash
chmod +x scripts/build-dmg.sh
./scripts/build-dmg.sh 1.0.0-rc.1 arm64
```

---

## 🧪 Running Unit Tests

Unit tests are written using Node's native test runner (`node:test`) and verify all release utilities, checksum validation, and documentation search algorithms:

```bash
npx --yes tsx --test src/utils/releaseUtils.test.ts
```

---

## 🛡️ macOS Gatekeeper First-Launch Command

For users running the ad-hoc signed release candidate:
```bash
sudo xattr -r -d com.apple.quarantine /Applications/NPad++.app
```
