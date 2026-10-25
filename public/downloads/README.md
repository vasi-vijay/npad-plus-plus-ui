# NPad++ Local macOS DMG Storage

Place your macOS `.dmg` installer files in this directory to serve them directly from the web application without needing external cloud hosting.

## Recommended File Paths

- **Apple Silicon (M1 / M2 / M3 / M4)**:
  `/public/downloads/NPad++-v1.0.0-rc.1-arm64.dmg`
  *(Served at: `/downloads/NPad++-v1.0.0-rc.1-arm64.dmg`)*

- **Intel (x86_64)**:
  `/public/downloads/NPad++-v1.0.0-rc.1-x86_64.dmg`
  *(Served at: `/downloads/NPad++-v1.0.0-rc.1-x86_64.dmg`)*

- **Universal Binary**:
  `/public/downloads/NPad++-v1.0.0-rc.1-universal.dmg`
  *(Served at: `/downloads/NPad++-v1.0.0-rc.1-universal.dmg`)*

## How it works

Any file placed inside `/public/` in this Vite project is automatically served at the root URL path.
When visitors click **"Download"** on the website, their browser will download the DMG directly from your web server.
