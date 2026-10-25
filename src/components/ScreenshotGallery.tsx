import React, { useState } from 'react';
import {
  Maximize2,
  X,
  CheckCircle2,
  Columns2,
  Search,
  Terminal,
  Sparkles,
  Download,
  Layers,
  ChevronRight,
  ZoomIn
} from 'lucide-react';

interface RealScreenshot {
  id: string;
  title: string;
  tabLabel: string;
  category: string;
  imagePath: string;
  badge: string;
  description: string;
  highlightText: string;
  features: string[];
}

const REAL_SCREENSHOTS: RealScreenshot[] = [
  {
    id: 'dmg-installer',
    tabLabel: 'macOS DMG Installer',
    title: 'Official macOS DMG Drag-and-Drop Installer',
    category: 'Distribution & Release',
    imagePath: '/assets/aistudio/image_f8026479.png',
    badge: 'Native DMG',
    description: 'Clean, native macOS disk image (.dmg) with Applications shortcut for effortless drag-and-drop installation onto any Apple Silicon or Intel Mac.',
    highlightText: 'Instant drag-and-drop installer with native macOS volume mount',
    features: [
      'Standard macOS drag-and-drop installation into /Applications',
      'Native app bundle with official green chameleon mascot icon',
      'Zero external dependencies or runtimes required',
      'Compatible with macOS Monterey, Ventura, Sonoma, Sequoia & future releases',
    ],
  },
  {
    id: 'split-view',
    tabLabel: 'Dual-Pane Split View',
    title: 'Dual-Pane Side-by-Side Editing & Comparison',
    category: 'Productivity & Compare',
    imagePath: '/assets/aistudio/image_32bf1aa7.png',
    badge: 'Split-View',
    description: 'Edit two documents simultaneously with independent tabs, synchronized scrolling, draggable split divider, and dedicated Left & Right pane status indicators.',
    highlightText: 'Side-by-side editing with native macOS Unix (LF) and UTF-8 encoding support',
    features: [
      'Independent tabs (new 1, new 2) per editor pane',
      'Left & Right pane indicators with drag-and-drop tab detachment',
      'Accurate line and column tracking (e.g. Line 3, Column 3,083)',
      'Notepad++-style visual comparison and synchronized scrolling',
    ],
  },
  {
    id: 'find-replace',
    tabLabel: 'Find & Replace Dialog',
    title: 'Advanced Regular Expression Find & Replace',
    category: 'Search Engine',
    imagePath: '/assets/aistudio/image_d46d1574.png',
    badge: 'PCRE Regex',
    description: 'Full-featured Notepad++ search experience on macOS: Regular Expression matching, Extended escapes (\\n, \\r, \\t), Fuzzy search, window transparency slider, and match counters.',
    highlightText: 'High-performance pattern matching across project files with transparency controls',
    features: [
      'Search tabs: Find, Replace, Find in Files, Find in Projects, Mark',
      'Search modes: Normal, Extended (\\n, \\r, \\t, \\0, \\x...), Regular expression, Fuzzy search',
      'Window transparency slider for keeping context visible while finding matches',
      'Instant match counter (e.g. "2 of 17 matches") and In-selection filtering',
    ],
  },
  {
    id: 'main-editor',
    tabLabel: 'Native Code Editor',
    title: 'Full macOS Code Editor with Developer Toolbar',
    category: 'Core Editor',
    imagePath: '/assets/aistudio/image_71caae08.png',
    badge: 'AppKit + Swift',
    description: 'Clean native AppKit canvas featuring swift typography, quick-action toolbar, instant "Run File" execution, bookmarks, line numbers, and font sizing controls.',
    highlightText: 'Instant cold launch in < 100ms with sub-35MB memory usage on Apple Silicon',
    features: [
      'Integrated toolbar: Sidebar, New, Open, Save, Undo/Redo, Color, Run File, Bookmarks',
      'Instant Run File button for executing scripts with direct output streaming',
      'Font scaling (13pt) with quick increase/decrease shortcuts',
      'Multi-tab workspace with unsaved modification indicators (red dot)',
    ],
  },
  {
    id: 'welcome-modal',
    tabLabel: 'Welcome Onboarding',
    title: 'Welcome Dashboard & Project Quick Start',
    category: 'Workflow & Navigation',
    imagePath: '/assets/aistudio/image_de5072b6.png',
    badge: 'Apple Silicon',
    description: 'Clean macOS native onboarding window allowing instant access to new files, existing files, project folder explorer, feature guides, and GitHub.',
    highlightText: 'Tailored for macOS Apple Silicon with zero friction and clean AppKit design',
    features: [
      'New File: Start typing in an instant untitled buffer with zero delay',
      'Open Folder...: Browse and manage complete project directories',
      'Explore Features: Built-in discovery guide for diffs, terminal, and plugins',
      'Quick link to star and contribute on GitHub',
    ],
  },
  {
    id: 'features-modal',
    tabLabel: 'Built-in Features Guide',
    title: 'Built-in Feature Overview & Developer Tools',
    category: 'Feature Guide',
    imagePath: '/assets/aistudio/image_5a1d8158.png',
    badge: 'All-in-One',
    description: 'Detailed in-app guide detailing Dual-Pane editing, File comparison, fast real-time Syntax Highlighting, Search & Replace, and developer tools.',
    highlightText: 'Built-in Terminal (^`), one-click code runner (F5), and Base64 tools',
    features: [
      'File Comparison: Notepad++-style visual diff with character-level diff highlighting',
      'Syntax Highlighting: Swift, Python, Java, JavaScript, HTML, C++, XML, JSON, Markdown',
      'Developer Tools: Integrated developer terminal (^`), code runner (F5), Base64 encode/decode',
      'One-click "Start Coding" workflow',
    ],
  },
];

export const ScreenshotGallery: React.FC = () => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<RealScreenshot | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dmg-installer');

  const currentItem = REAL_SCREENSHOTS.find((s) => s.id === activeTab) || REAL_SCREENSHOTS[0];

  return (
    <section id="screenshots" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Real Application Screenshots</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            See NPad++ Running on macOS
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Actual screenshots captured from the NPad++ native macOS application — featuring dual-pane editing, regex search, developer toolbar, and the DMG installer.
          </p>
        </div>

        {/* Screenshot View Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10" role="tablist">
          {REAL_SCREENSHOTS.map((s) => {
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(s.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800'
                }`}
              >
                {s.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Active Mockup Display Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-4 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details & Capabilities */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {currentItem.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-semibold">
                  {currentItem.badge}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {currentItem.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentItem.description}
              </p>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                ⚡ {currentItem.highlightText}
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Verified Functionality
                </h4>
                {currentItem.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedScreenshot(currentItem)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 text-xs font-semibold shadow-sm transition-opacity"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>Enlarge Screenshot in Full Detail</span>
                </button>
              </div>
            </div>

            {/* Right Column: Real Application Screenshot with Zoom Hover */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setSelectedScreenshot(currentItem)}
                className="group relative cursor-pointer rounded-2xl border border-slate-300 dark:border-slate-700 overflow-hidden shadow-2xl bg-slate-900 transition-all hover:ring-2 hover:ring-emerald-500"
              >
                <img
                  src={currentItem.imagePath}
                  alt={currentItem.title}
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-black/80 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Zoom</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip of All Real Screenshots */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {REAL_SCREENSHOTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`rounded-xl overflow-hidden border p-1 text-left transition-all ${
                activeTab === s.id
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-400'
              }`}
            >
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-950 mb-1.5">
                <img src={s.imagePath} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate px-1">
                {s.tabLabel}
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox Zoom Modal */}
        {selectedScreenshot && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedScreenshot(null)}
          >
            <div
              className="relative w-full max-w-6xl max-h-[92vh] bg-slate-950 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{selectedScreenshot.title}</span>
                    <span className="text-xs font-normal text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                      {selectedScreenshot.badge}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedScreenshot.description}</p>
                </div>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="flex-1 overflow-auto rounded-xl border border-slate-800 bg-black flex items-center justify-center">
                <img
                  src={selectedScreenshot.imagePath}
                  alt={selectedScreenshot.title}
                  className="max-w-full max-h-[72vh] object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                <span>{selectedScreenshot.highlightText}</span>
                <span className="text-[11px] opacity-70">Press ESC or click outside to close</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
