import { ReleaseMetadata } from '../types';

/**
 * Single source of truth for NPad++ release metadata.
 * Values can be overridden via environment variables:
 * - VITE_DOWNLOAD_URL: Direct URL to the hosted Apple Silicon .dmg
 * - VITE_DOWNLOAD_URL_INTEL: Direct URL to the hosted Intel .dmg
 * - VITE_RELEASE_STATUS: 'published' | 'pending_publish'
 * - VITE_GITHUB_REPO_URL: GitHub repository URL
 */

// Bundled local path inside /public/downloads/ or remote URL override
const defaultLocalArm64 = '/downloads/NPad++.dmg';
const defaultLocalIntel = '/downloads/NPad++-v1.0.0-rc.1-x86_64.dmg';

const envDownloadUrlArm64 = import.meta.env.VITE_DOWNLOAD_URL || defaultLocalArm64;
const envDownloadUrlIntel = import.meta.env.VITE_DOWNLOAD_URL_INTEL || defaultLocalIntel;
const envReleaseStatus = (import.meta.env.VITE_RELEASE_STATUS as 'published' | 'pending_publish') || 'published';

export const CURRENT_RELEASE: ReleaseMetadata = {
  appName: 'NPad++',
  bundleId: 'org.npadplusplus.npad',
  version: '1.0.0-rc.1',
  releaseDate: 'October 24, 2026',
  status: envReleaseStatus,
  minimumMacOS: 'macOS 12.0 (Monterey) or later',
  supportedArchitectures: ['Apple Silicon (All M Chips: M1, M2, M3, M4, M5, M6, Pro, Max, Ultra)', 'Intel (x86_64)'],
  signingStatus: 'ad-hoc', // Transparently documented as ad-hoc/self-signed until Apple Developer ID notarization is active
  githubRepoUrl: import.meta.env.VITE_GITHUB_REPO_URL || 'https://github.com/vasi-vijay/npad-plus-plus',
  releasesPageUrl: import.meta.env.VITE_RELEASES_URL || 'https://github.com/vasi-vijay/npad-plus-plus/releases',
  assets: {
    arm64: {
      architecture: 'arm64',
      archLabel: 'Apple Silicon (All M Chips: M1, M2, M3, M4, M5, M6)',
      filename: 'NPad++.dmg',
      localPath: '/public/downloads/NPad++.dmg',
      downloadUrl: envDownloadUrlArm64,
      sizeBytes: 3318598, // ~3.2 MB native DMG
      sizeHuman: '3.2 MB',
      sha256: '044ddf462535208040822050cd73344794c39114211643c9b9f3ba0013714da2',
      isRecommended: true,
    },
    x86_64: {
      architecture: 'x86_64',
      archLabel: 'Intel (x86_64 Macs)',
      filename: 'NPad++-v1.0.0-rc.1-x86_64.dmg',
      localPath: '/public/downloads/NPad++-v1.0.0-rc.1-x86_64.dmg',
      downloadUrl: envDownloadUrlIntel,
      sizeBytes: 15414067,
      sizeHuman: '14.7 MB',
      sha256: '8b7f3a09e356d22ef1492ba265ff3a5e8840c83a7c645b2e59df913e64be731b',
      isRecommended: false,
    },
    universal: {
      architecture: 'universal',
      archLabel: 'Universal Binary (Apple Silicon & Intel)',
      filename: 'NPad++-v1.0.0-rc.1-universal.dmg',
      localPath: '/public/downloads/NPad++-v1.0.0-rc.1-universal.dmg',
      downloadUrl: '/downloads/NPad++-v1.0.0-rc.1-universal.dmg',
      sizeBytes: 28311552,
      sizeHuman: '27.0 MB',
      sha256: 'd5e12aa3195f4c40b7cf2969db2ad83f36bfb777a83d7aa07a04c107f9c2d159',
      isRecommended: false,
    },
  },
};
