export type Architecture = 'arm64' | 'x86_64' | 'universal';

export type ReleaseStatus = 'published' | 'pending_publish';

export interface ReleaseAsset {
  architecture: Architecture;
  archLabel: string;
  filename: string;
  downloadUrl?: string;
  localPath?: string;
  sizeBytes: number;
  sizeHuman: string;
  sha256: string;
  isRecommended?: boolean;
}

export interface ReleaseMetadata {
  appName: string;
  bundleId: string;
  version: string;
  releaseDate: string;
  status: ReleaseStatus;
  minimumMacOS: string;
  supportedArchitectures: string[];
  signingStatus: 'ad-hoc' | 'developer-id' | 'notarized';
  githubRepoUrl: string;
  releasesPageUrl: string;
  assets: Record<Architecture, ReleaseAsset>;
}

export interface FeatureItem {
  id: string;
  title: string;
  category: 'editing' | 'search' | 'languages' | 'productivity' | 'macos';
  description: string;
  detail: string;
  isAvailable: boolean; // true = working in current release, false = planned in roadmap
  highlight?: string;
  shortcut?: string;
}

export interface DocArticle {
  id: string;
  title: string;
  category: 'getting-started' | 'editing' | 'search-replace' | 'terminal' | 'customization' | 'troubleshooting';
  summary: string;
  content: string; // Markdown or rich structured text
  tags: string[];
}

export interface KeyboardShortcut {
  id: string;
  action: string;
  shortcut: string;
  macKeys: string[];
  category: 'Editing' | 'Navigation' | 'Search' | 'View & Tabs' | 'File & System';
  notepadComparison?: string;
}

export interface ChangelogItem {
  version: string;
  date: string;
  tag: 'Stable' | 'Release Candidate' | 'Beta' | 'Roadmap';
  summary: string;
  added: string[];
  improved: string[];
  fixed: string[];
  knownIssues?: string[];
}
