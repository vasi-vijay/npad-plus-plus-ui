import { ChangelogItem } from '../types';

export const CHANGELOG_DATA: ChangelogItem[] = [
  {
    version: 'v1.0.0-rc.1',
    date: 'October 24, 2026',
    tag: 'Release Candidate',
    summary: 'First public Release Candidate featuring native AppKit performance, Treesitter syntax highlighting, split view, and macOS integration.',
    added: [
      'Native AppKit multi-tab document workspace with drag-and-drop tab detachment.',
      'High-performance Treesitter syntax highlighting for 50+ languages.',
      'PCRE-compliant Regex Find and Replace engine with live match counters.',
      'Split-View dual editing (horizontal and vertical orientation).',
      'Option-drag column / rectangular block selection.',
      'One-click "Open Terminal in File Directory" supporting macOS Terminal, iTerm2, and Ghostty.',
      'Session snapshot journal preventing data loss on app exit or crash.',
      'Apple Silicon native binary (ARM64) and Intel (x86_64) builds.',
      'Line operations: Duplicate line (⌘D), Delete line (⌘⇧K), Move up/down (⌥↑/⌥↓).',
    ],
    improved: [
      'Sub-100 millisecond cold startup on M-series Apple Silicon Macs.',
      'Decreased idle memory consumption to under 35 MB RAM.',
      'Smooth 120Hz ProMotion scrolling support on MacBook Pro displays.',
      'Proper macOS vibrancy and dark mode theme switching.',
    ],
    fixed: [
      'Fixed cursor offset calculation when using custom tab stop widths.',
      'Resolved intermittent file watcher race condition during rapid external disk changes.',
      'Corrected UTF-16 surrogate pair rendering in regex match highlights.',
    ],
    knownIssues: [
      'Gatekeeper security warning on first launch for ad-hoc signed release before Apple Developer ID Notarization is finalized.',
      'User-Defined Language (UDL) import wizard is scheduled for upcoming v1.1 update.',
    ],
  },
  {
    version: 'v0.9.4-beta',
    date: 'September 12, 2026',
    tag: 'Beta',
    summary: 'Internal beta focusing on regex engine stabilization, line sorting, and memory profiling on large 100MB+ logs.',
    added: [
      'Alphabetical ascending/descending line sorting.',
      'Remove duplicate lines command.',
      'Encoding conversion menu for UTF-8, UTF-16, ISO-8859-1, and Windows-1252.',
      'Convert line endings between Unix (LF) and Windows (CRLF).',
    ],
    improved: [
      'Chunked memory mapping for large log files up to 500 MB without UI freezing.',
      'Refined status bar typography and clickable indicators.',
    ],
    fixed: [
      'Fixed memory leak when repeatedly splitting and merging dual editor panes.',
      'Fixed tab title truncation for deeply nested directory paths.',
    ],
  },
  {
    version: 'v0.9.0-alpha',
    date: 'July 18, 2026',
    tag: 'Beta',
    summary: 'Initial private alpha preview demonstrating core Swift 6 / AppKit text engine and basic tab handling.',
    added: [
      'Core text layout engine using NSTextView and TextKit 2.',
      'Basic multi-tab buffer management.',
      'Simple Find and Replace dialog.',
      'Light and Dark color schemes.',
    ],
    improved: [
      'Initial performance benchmarks compared against Electron-based text editors.',
    ],
    fixed: [
      'Initial release bugfixes.',
    ],
  },
  {
    version: 'v1.1.0 (Roadmap)',
    date: 'Planned Q1 2027',
    tag: 'Roadmap',
    summary: 'Upcoming feature release focusing on User-Defined Language (UDL) XML importer, hex viewer mode, and plugin API.',
    added: [
      'Interactive User-Defined Language (UDL) designer compatible with Notepad++ XML schemas.',
      'Integrated Hex & Binary file inspector.',
      'Native Swift plugin API with sandbox permissions.',
      'Automated background updates via Sparkle framework.',
    ],
    improved: [
      'LSP (Language Server Protocol) code intelligence integration for autocompletion.',
    ],
    fixed: [],
  },
];
