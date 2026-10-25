import { DocArticle, KeyboardShortcut } from '../types';

/**
 * Format raw byte size into human readable string (KB, MB, GB).
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes <= 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Validates whether a string is a valid 64-character hex SHA-256 string.
 */
export function validateSha256(hash: string): boolean {
  if (!hash || typeof hash !== 'string') return false;
  const clean = hash.trim();
  return /^[a-fA-F0-9]{64}$/.test(clean);
}

/**
 * Generates the terminal verification command for checking a downloaded DMG.
 */
export function generateShasumCommand(filename: string): string {
  const safeFilename = filename.trim().replace(/[;&|`$]/g, '');
  return `shasum -a 256 "${safeFilename}"`;
}

/**
 * Generates the macOS Gatekeeper terminal command to clear quarantine attribute
 * for ad-hoc / self-signed builds.
 */
export function generateGatekeeperCommand(appPath: string = '/Applications/NPad++.app'): string {
  return `sudo xattr -r -d com.apple.quarantine "${appPath}"`;
}

/**
 * Parses semantic version string into major, minor, patch and prerelease.
 */
export function parseSemanticVersion(version: string): {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
} {
  const clean = version.trim().replace(/^v/, '');
  const [core, ...preParts] = clean.split('-');
  const [major, minor, patch] = core.split('.').map(Number);
  return {
    major: isNaN(major) ? 0 : major,
    minor: isNaN(minor) ? 0 : minor,
    patch: isNaN(patch) ? 0 : patch,
    prerelease: preParts.length > 0 ? preParts.join('-') : undefined,
  };
}

/**
 * Filter documentation articles by search term and optional category.
 */
export function filterDocumentation(
  docs: DocArticle[],
  searchQuery: string,
  categoryFilter?: string
): DocArticle[] {
  const q = searchQuery.toLowerCase().trim();

  return docs.filter((doc) => {
    const matchesCategory = !categoryFilter || categoryFilter === 'all' || doc.category === categoryFilter;
    if (!matchesCategory) return false;

    if (!q) return true;

    return (
      doc.title.toLowerCase().includes(q) ||
      doc.summary.toLowerCase().includes(q) ||
      doc.content.toLowerCase().includes(q) ||
      doc.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}

/**
 * Filter keyboard shortcuts by search query and category.
 */
export function filterShortcuts(
  shortcuts: KeyboardShortcut[],
  searchQuery: string,
  categoryFilter?: string
): KeyboardShortcut[] {
  const q = searchQuery.toLowerCase().trim();

  return shortcuts.filter((sc) => {
    const matchesCategory = !categoryFilter || categoryFilter === 'All' || sc.category === categoryFilter;
    if (!matchesCategory) return false;

    if (!q) return true;

    return (
      sc.action.toLowerCase().includes(q) ||
      sc.shortcut.toLowerCase().includes(q) ||
      sc.macKeys.some((k) => k.toLowerCase().includes(q)) ||
      (sc.notepadComparison && sc.notepadComparison.toLowerCase().includes(q))
    );
  });
}
