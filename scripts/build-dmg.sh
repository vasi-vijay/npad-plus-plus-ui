#!/usr/bin/env bash
# scripts/build-dmg.sh
# Local DMG packaging script for NPad++ macOS application
set -e

VERSION="${1:-1.0.0-rc.1}"
ARCH="${2:-arm64}"
OUTPUT_DMG="NPad++-v${VERSION}-${ARCH}.dmg"
STAGING_DIR="build/dmg-staging"

echo "=================================================="
echo " Packaging NPad++ for macOS ($ARCH)"
echo " Version: $VERSION"
echo " Target DMG: $OUTPUT_DMG"
echo "=================================================="

# Check for macOS environment
if [[ "$(uname)" != "Darwin" ]]; then
  echo "⚠️ Warning: DMG creation requires macOS with 'hdiutil'. Running in simulation mode."
  exit 0
fi

# Clean previous staging
rm -rf "$STAGING_DIR" "$OUTPUT_DMG"
mkdir -p "$STAGING_DIR"

# Ensure NPad++.app exists
if [ ! -d "build/NPad++.app" ]; then
  echo "Error: build/NPad++.app not found. Build the Swift/Xcode project first."
  exit 1
fi

echo "Copying NPad++.app to staging..."
cp -R "build/NPad++.app" "$STAGING_DIR/"

echo "Creating /Applications shortcut..."
ln -s /Applications "$STAGING_DIR/Applications"

echo "Creating DMG disk image with hdiutil..."
hdiutil create -volname "NPad++ $VERSION" \
  -srcfolder "$STAGING_DIR" \
  -ov -format UDZO \
  "$OUTPUT_DMG"

echo "Generating SHA-256 Checksum..."
shasum -a 256 "$OUTPUT_DMG" > "${OUTPUT_DMG}.sha256"

echo "✅ DMG Packaging complete: $OUTPUT_DMG"
cat "${OUTPUT_DMG}.sha256"
