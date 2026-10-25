import { DocArticle } from '../types';

export const DOCS_DATA: DocArticle[] = [
  {
    id: 'installation-and-gatekeeper',
    title: 'Installation & macOS Gatekeeper Guide',
    category: 'getting-started',
    summary: 'Step-by-step instructions for installing NPad++ from DMG and handling macOS Gatekeeper verification.',
    tags: ['install', 'dmg', 'gatekeeper', 'security', 'quarantine', 'apple silicon'],
    content: `
### Downloading & Installing NPad++

1. Download the **NPad++ .dmg** image appropriate for your Mac architecture (All Apple Silicon M Chips: M1, M2, M3, M4, M5, M6 or Intel).
2. Double-click the downloaded \`.dmg\` file to mount the disk image.
3. Drag the **NPad++.app** icon into your **Applications** folder shortcut.
4. Eject the disk image from Finder.

---

### Understanding Apple Gatekeeper

Because early public builds and release candidates of NPad++ may be distributed prior to official Apple Developer ID Notarization (ad-hoc signed), macOS Gatekeeper may display a security alert on first launch:

> *"NPad++ cannot be opened because Apple cannot check it for malicious software."* or *"NPad++ is from an unidentified developer."*

This is standard macOS security behavior for indie open-source applications that have not been routed through Apple's paid notarization servers.

#### Method 1: The Finder Right-Click (Quickest)
1. Open your **Applications** folder in Finder.
2. Locate **NPad++.app**.
3. **Right-click** (or Control-click) on **NPad++.app** and choose **Open**.
4. In the confirmation dialog, click the **Open** button.
5. macOS will permanently whitelist NPad++ and you can launch it normally from Spotlight, Launchpad, or the Dock thereafter.

#### Method 2: Terminal Quarantine Removal (Power Users)
If macOS blocks execution completely, remove the downloaded quarantine flag via Terminal:

\`\`\`bash
sudo xattr -r -d com.apple.quarantine /Applications/NPad++.app
\`\`\`

Press Enter and enter your Mac administrator password. NPad++ will now open immediately.
    `,
  },
  {
    id: 'first-launch-and-basics',
    title: 'First Launch & Interface Overview',
    category: 'getting-started',
    summary: 'Get familiar with NPad++ tab management, line numbering, status bar indicators, and document encoding.',
    tags: ['interface', 'tabs', 'status bar', 'encoding', 'basics'],
    content: `
### The NPad++ Workspace

NPad++ is built exclusively with native macOS AppKit components, delivering instant rendering and near-zero memory footprint.

- **Unified Native Title Bar**: Features macOS traffic light window controls, active document name, file path inspection, and quick action icons.
- **Tab Bar**: Shows all open buffers with dirty status indicators (red dot for unsaved edits). Drag tabs to reorder or drag off window to detach into a new window.
- **Editor Canvas**: Crisp monospaced rendering with customizable font (SF Mono, Menlo, JetBrains Mono, Fira Code), line numbers, code folding arrows, and indentation guidelines.
- **Bottom Status Bar**: Displays current Line & Column position, selection character count, document encoding (UTF-8, ISO-8859, etc.), line ending format (LF vs CRLF), syntax grammar, and zoom level.

### Changing Character Encoding & Line Endings

1. Click the **LF** or **CRLF** pill in the status bar to instantly switch line ending formats.
2. Click the **UTF-8** label to convert encoding or reload with another character set (e.g. Windows-1252, Shift-JIS, UTF-16).
    `,
  },
  {
    id: 'keyboard-shortcuts-guide',
    title: 'Essential Keyboard Shortcuts',
    category: 'editing',
    summary: 'Comprehensive cheatsheet of macOS keyboard shortcuts for editing, navigation, and multi-cursor workflows.',
    tags: ['shortcuts', 'hotkeys', 'navigation', 'line operations'],
    content: `
### Editing & Line Operations

| Action | macOS Shortcut | Notepad++ Equivalent |
| :--- | :--- | :--- |
| **Duplicate Line / Selection** | \`⌘D\` | \`Ctrl+D\` |
| **Delete Line** | \`⌘⇧K\` | \`Ctrl+Shift+L\` |
| **Move Line Up** | \`⌥↑\` | \`Ctrl+Shift+Up\` |
| **Move Line Down** | \`⌥↓\` | \`Ctrl+Shift+Down\` |
| **Toggle Line Comment** | \`⌘/\` | \`Ctrl+Q\` |
| **Convert to Uppercase** | \`⌘⇧U\` | \`Ctrl+Shift+U\` |
| **Convert to Lowercase** | \`⌘U\` | \`Ctrl+U\` |
| **Column / Block Select** | \`⌥ + Drag\` | \`Alt + Drag\` |

### Split View & Tab Navigation

- **Toggle Split View**: \`⌘⌥D\`
- **New Tab**: \`⌘N\`
- **Close Tab**: \`⌘W\`
- **Next Tab**: \`⌘⌥→\` or \`⌃Tab\`
- **Previous Tab**: \`⌘⌥←\` or \`⌃⇧Tab\`
- **Zoom In / Out**: \`⌘+\` / \`⌘-\`
    `,
  },
  {
    id: 'regex-find-and-replace',
    title: 'Regex Find & Replace Syntax',
    category: 'search-replace',
    summary: 'Learn how to use PCRE regular expressions, lookahead/behind assertions, and replacement backreferences.',
    tags: ['regex', 'search', 'replace', 'patterns', 'pcre'],
    content: `
### Activating Regex Search

Press **⌘F** to open Find, or **⌘H** to open Find and Replace. Toggle the **.* (Regular Expression)** button on the search toolbar.

### Supported Regex Features

- **Wildcards**: \`. matches any character (except newline)\`
- **Character Classes**: \`\\d\` (digits), \`\\w\` (word chars), \`\\s\` (whitespace)
- **Quantifiers**: \`*\` (0+), \`+\` (1+), \`?\` (0 or 1), \`{n,m}\` (between n and m)
- **Anchors**: \`^\` (beginning of line), \`$\` (end of line), \`\\b\` (word boundary)
- **Capture Groups**: \`(pattern)\` captures match into group \`$1\`, \`$2\`, etc.
- **Lookaround**: \`(?=pattern)\` positive lookahead, \`(?<=pattern)\` positive lookbehind.

### Example: Converting camelCase to snake_case

- **Find**: \`([a-z])([A-Z])\`
- **Replace**: \`$1_$2\`
    `,
  },
  {
    id: 'terminal-and-script-execution',
    title: 'Terminal Integration & Code Execution',
    category: 'terminal',
    summary: 'Launch your preferred macOS terminal emulator or run supported scripts directly inside NPad++.',
    tags: ['terminal', 'run', 'scripts', 'python', 'bash', 'node'],
    content: `
### Opening Terminal in File Directory

Developers frequently need to run Git commands, npm scripts, or cargo builds in the folder containing their current document.

- Press **⌘⌥T** or click **File → Open Terminal in Folder**.
- NPad++ will automatically launch your configured terminal (Default macOS Terminal, iTerm2, Kitty, Ghostty, or Alacritty) with the current directory set.

### Running Code Directly

Press **⌘R** to execute the active file. Supported interpreters:
- **Python**: \`python3 <file>\`
- **Node.js**: \`node <file>\`
- **Shell**: \`bash <file>\` or \`zsh <file>\`
- **Swift**: \`swift <file>\`
- **Go**: \`go run <file>\`
    `,
  },
  {
    id: 'session-recovery-guide',
    title: 'Unsaved Document Auto-Recovery',
    category: 'customization',
    summary: 'How NPad++ prevents data loss through continuous disk snapshots and session journaling.',
    tags: ['recovery', 'autosave', 'session', 'backup'],
    content: `
### Zero-Loss Session Management

Like Notepad++, NPad++ features automatic session persistence:

1. You can create temporary scratchpads (\`⌘N\`), paste logs or snippets, and quit NPad++ without being forced to name or save them.
2. When you relaunch NPad++, all previous tabs, cursor coordinates, and unsaved contents are restored exactly as you left them.
3. Snapshot journals are stored locally in:
   \`\`\`
   ~/Library/Application Support/NPad++/Backups/
   \`\`\`

To disable session restoration or clear temporary buffers, visit **Preferences (⌘,) → Session & Backup**.
    `,
  },
  {
    id: 'uninstalling-npad',
    title: 'Clean Uninstallation Guide',
    category: 'troubleshooting',
    summary: 'How to completely remove NPad++ and its local configuration files from your Mac.',
    tags: ['uninstall', 'cleanup', 'preferences', 'cache'],
    content: `
### Standard Removal

1. Quit NPad++ (\`⌘Q\`).
2. Open **Finder** and navigate to **/Applications**.
3. Drag **NPad++.app** to the **Trash**.

### Complete Configuration Cleanup

If you wish to remove all local settings, bookmarks, and session backups:

\`\`\`bash
rm -rf ~/Library/Application\\ Support/NPad++
rm -rf ~/Library/Preferences/org.npadplusplus.npad.plist
rm -rf ~/Library/Caches/org.npadplusplus.npad
\`\`\`
    `,
  },
];
