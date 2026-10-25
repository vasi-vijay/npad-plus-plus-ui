import React, { useState } from 'react';
import {
  Columns2,
  Search,
  Check,
  Copy,
  ChevronDown,
  Terminal,
  FileCode,
  Sparkles,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

interface TabDocument {
  id: string;
  name: string;
  language: string;
  dirty: boolean;
  content: string;
}

const SAMPLE_DOCS: TabDocument[] = [
  {
    id: 'rust',
    name: 'main.rs',
    language: 'Rust',
    dirty: true,
    content: `// NPad++ native high-performance text buffer
use std::fs::File;
use std::io::{self, BufRead, BufReader};

pub struct EditorEngine {
    pub buffer_length: usize,
    pub encoding: &'static str,
    pub is_dirty: bool,
}

impl EditorEngine {
    pub fn new() -> Self {
        println!("🚀 NPad++ started in < 80ms on Apple Silicon");
        Self {
            buffer_length: 0,
            encoding: "UTF-8",
            is_dirty: false,
        }
    }

    pub fn execute_regex_search(&self, pattern: &str) -> usize {
        // Instant PCRE regex matching without Electron lag
        println!("Compiling pattern: {}", pattern);
        42 // 42 matches found
    }
}

fn main() {
    let editor = EditorEngine::new();
    println!("NPad++ buffer ready. Memory: < 35 MB RAM");
}`,
  },
  {
    id: 'typescript',
    name: 'server.ts',
    language: 'TypeScript',
    dirty: false,
    content: `import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// NPad++ fast project server endpoint
app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    app: 'NPad++',
    platform: 'macOS Sonoma / Sequoia',
    status: 'Ready',
    startupTimeMs: 64,
  });
});

app.listen(PORT, () => {
  console.log(\`Server listening at http://localhost:\${PORT}\`);
});`,
  },
  {
    id: 'swift',
    name: 'NPadAppKit.swift',
    language: 'Swift',
    dirty: false,
    content: `import AppKit
import SwiftUI

/// Native AppKit window controller for zero-lag editing
final class NPadWindowController: NSWindowController {
    override func windowDidLoad() {
        super.windowDidLoad()
        window?.title = "NPad++ — Native macOS Editor"
        window?.titleVisibility = .visible
        window?.titlebarAppearsTransparent = true
        
        // Native Apple Silicon ARM64 optimizations
        print("Initialized native NSTextView with TextKit 2")
    }
    
    @IBAction func openTerminalInDirectory(_ sender: Any?) {
        guard let url = currentDocumentURL?.deletingLastPathComponent() else { return }
        NSWorkspace.shared.open(url)
    }
}`,
  },
  {
    id: 'markdown',
    name: 'README.md',
    language: 'Markdown',
    dirty: false,
    content: `# NPad++ for macOS

> Your Code. Your Mac. Your Flow.

A native, ultra-lightweight macOS text and code editor inspired by Notepad++.

### Key Features
- **Fast Startup**: Launches in under 100 milliseconds
- **Low Memory**: Uses less than 35 MB of RAM
- **Split-View**: Dual horizontal and vertical editing
- **Regex Search**: Powerful PCRE search and replace
- **Native AppKit**: No Electron, no WebViews, no telemetry
`,
  },
];

export const InteractiveEditorDemo: React.FC = () => {
  const [tabs, setTabs] = useState<TabDocument[]>(SAMPLE_DOCS);
  const [activeTabId, setActiveTabId] = useState<string>('rust');
  const [secondaryTabId, setSecondaryTabId] = useState<string>('typescript');
  const [splitView, setSplitView] = useState<boolean>(false);
  const [showFindBar, setShowFindBar] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('buffer');
  const [replaceQuery, setReplaceQuery] = useState<string>('textEngine');
  const [useRegex, setUseRegex] = useState<boolean>(true);
  const [matchCase, setMatchCase] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [theme, setTheme] = useState<'light' | 'obsidian' | 'solarized'>('obsidian');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const activeDoc = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const secondaryDoc = tabs.find((t) => t.id === secondaryTabId) || tabs[1];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeDoc.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          window: 'bg-white text-slate-900 border-slate-200 shadow-xl',
          header: 'bg-slate-100 border-b border-slate-200 text-slate-700',
          tabActive: 'bg-white text-emerald-700 font-semibold border-b-2 border-emerald-500 shadow-sm',
          tabInactive: 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60',
          editorBg: 'bg-white text-slate-800',
          lineNumbers: 'text-slate-400 bg-slate-50 border-r border-slate-100',
          statusBar: 'bg-slate-100 border-t border-slate-200 text-slate-600',
          findBar: 'bg-slate-50 border-b border-slate-200 text-slate-800',
        };
      case 'solarized':
        return {
          window: 'bg-[#002b36] text-[#839496] border-[#073642] shadow-2xl',
          header: 'bg-[#073642] border-b border-[#002b36] text-[#93a1a1]',
          tabActive: 'bg-[#002b36] text-[#2aa198] font-semibold border-b-2 border-[#2aa198]',
          tabInactive: 'text-[#586e75] hover:text-[#93a1a1] hover:bg-[#002b36]/40',
          editorBg: 'bg-[#002b36] text-[#93a1a1]',
          lineNumbers: 'text-[#586e75] bg-[#073642]/50 border-r border-[#073642]',
          statusBar: 'bg-[#073642] border-t border-[#002b36] text-[#839496]',
          findBar: 'bg-[#073642] border-b border-[#002b36] text-[#93a1a1]',
        };
      case 'obsidian':
      default:
        return {
          window: 'bg-[#0d1117] text-slate-200 border-slate-800 shadow-2xl',
          header: 'bg-[#161b22] border-b border-slate-800/80 text-slate-300',
          tabActive: 'bg-[#0d1117] text-emerald-400 font-semibold border-t-2 border-emerald-500 border-b-0 shadow-sm',
          tabInactive: 'text-slate-400 hover:text-slate-200 hover:bg-[#1f242c]',
          editorBg: 'bg-[#0d1117] text-slate-200',
          lineNumbers: 'text-slate-600 bg-[#0d1117] border-r border-slate-800/60',
          statusBar: 'bg-[#161b22] border-t border-slate-800/80 text-slate-400',
          findBar: 'bg-[#161b22] border-b border-slate-800 text-slate-200',
        };
    }
  };

  const currentTheme = getThemeClasses();

  // Simple syntax highlighter for display
  const renderHighlightedCode = (code: string) => {
    const lines = code.split('\n');
    return (
      <div className="font-mono text-[13px] leading-relaxed select-text">
        {lines.map((line, idx) => {
          let lineContent = line;
          const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('#');
          const isKeyword =
            line.includes('fn ') ||
            line.includes('let ') ||
            line.includes('pub ') ||
            line.includes('struct ') ||
            line.includes('import ') ||
            line.includes('const ') ||
            line.includes('class ');

          // Highlight search matches
          const hasMatch =
            searchQuery.trim().length > 0 &&
            (matchCase
              ? line.includes(searchQuery)
              : line.toLowerCase().includes(searchQuery.toLowerCase()));

          return (
            <div
              key={idx}
              className={`flex items-start px-3 hover:bg-emerald-500/10 ${
                hasMatch ? 'bg-amber-500/15 border-l-2 border-amber-400' : ''
              }`}
            >
              <span className={`w-8 shrink-0 text-right pr-3 select-none text-xs font-mono opacity-50`}>
                {idx + 1}
              </span>
              <span
                className={`whitespace-pre flex-1 ${
                  isComment
                    ? 'text-emerald-500/80 italic'
                    : isKeyword
                    ? 'text-purple-400 font-medium'
                    : ''
                }`}
              >
                {lineContent}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-300/80 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-300">
      {/* Interactive Controls Bar above editor */}
      <div className="bg-slate-100 dark:bg-slate-900/90 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive Live Editor Preview</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Split View Toggle */}
          <button
            onClick={() => setSplitView(!splitView)}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors font-medium ${
              splitView
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle Split-View Dual Editing (⌘⌥D)"
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Split View {splitView ? 'ON' : 'OFF'}</span>
          </button>

          {/* Regex Search Toggle */}
          <button
            onClick={() => setShowFindBar(!showFindBar)}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors font-medium ${
              showFindBar
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle Find & Replace Bar (⌘F)"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find & Replace</span>
          </button>

          {/* Theme Selector */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-md border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTheme('obsidian')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                theme === 'obsidian'
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Obsidian Dark
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                theme === 'light'
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('solarized')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                theme === 'solarized'
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Solarized
            </button>
          </div>

          {/* Copy snippet button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            title="Copy current document text"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Actual macOS Window */}
      <div className={`${currentTheme.window} font-sans flex flex-col min-h-[460px]`}>
        {/* macOS Title Bar & Traffic Lights */}
        <div className={`px-3 py-2 flex items-center justify-between select-none ${currentTheme.header}`}>
          <div className="flex items-center gap-2">
            {/* Native Traffic Lights */}
            <div className="flex items-center gap-1.5 pr-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 cursor-pointer" />
            </div>

            {/* Document icon & Window title */}
            <div className="flex items-center gap-1.5 text-xs font-medium opacity-85">
              <FileCode className="w-3.5 h-3.5 text-emerald-500" />
              <span>{activeDoc.name} — NPad++</span>
              {activeDoc.dirty && <span className="w-2 h-2 rounded-full bg-rose-500" title="Unsaved changes" />}
            </div>
          </div>

          <div className="text-[11px] font-mono opacity-60 hidden sm:block">
            PID: 49201 • Native ARM64 • 24.8 MB RAM
          </div>
        </div>

        {/* Tab Bar */}
        <div className={`flex items-center overflow-x-auto border-b ${currentTheme.header} px-1 pt-1`}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-t-md transition-all border-r border-slate-700/30 whitespace-nowrap ${
                  isActive ? currentTheme.tabActive : currentTheme.tabInactive
                }`}
              >
                {tab.dirty && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                <span>{tab.name}</span>
                <span className="text-[10px] opacity-40 ml-1 hover:opacity-100 hover:text-rose-400">×</span>
              </button>
            );
          })}
        </div>

        {/* Find & Replace Bar (Collapsible) */}
        {showFindBar && (
          <div className={`px-3 py-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b ${currentTheme.findBar}`}>
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find pattern..."
                  className="w-full px-2.5 py-1 text-xs rounded border border-slate-600 bg-black/20 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  placeholder="Replace with..."
                  className="w-full px-2.5 py-1 text-xs rounded border border-slate-600 bg-black/20 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Regex & Case buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setUseRegex(!useRegex)}
                  className={`px-1.5 py-0.5 rounded font-mono text-[11px] border ${
                    useRegex
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'border-slate-600 text-slate-400 hover:text-white'
                  }`}
                  title="Toggle Regular Expression (.*)"
                >
                  .*
                </button>
                <button
                  onClick={() => setMatchCase(!matchCase)}
                  className={`px-1.5 py-0.5 rounded font-mono text-[11px] border ${
                    matchCase
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'border-slate-600 text-slate-400 hover:text-white'
                  }`}
                  title="Match Case (Aa)"
                >
                  Aa
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-emerald-400 font-mono">
                {searchQuery ? '4 matches' : 'Ready'}
              </span>
              <button className="px-2 py-0.5 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-500 text-[11px]">
                Find Next
              </button>
              <button className="px-2 py-0.5 rounded bg-slate-700 text-slate-200 font-medium hover:bg-slate-600 text-[11px]">
                Replace All
              </button>
            </div>
          </div>
        )}

        {/* Editor Body: Single or Split View */}
        <div className={`flex-1 flex overflow-hidden min-h-[280px] ${currentTheme.editorBg}`}>
          {/* Main Pane */}
          <div className="flex-1 overflow-auto py-2">
            {renderHighlightedCode(activeDoc.content)}
          </div>

          {/* Secondary Pane for Split View */}
          {splitView && (
            <div className="flex-1 border-l border-slate-800/80 overflow-auto py-2 bg-black/10">
              <div className="px-3 pb-1 border-b border-slate-800/50 mb-2 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-emerald-400">Split View Pane:</span>
                <select
                  value={secondaryTabId}
                  onChange={(e) => setSecondaryTabId(e.target.value)}
                  className="bg-transparent border border-slate-700 rounded px-1.5 py-0.5 text-xs text-slate-200 focus:outline-none"
                >
                  {tabs.map((t) => (
                    <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              {renderHighlightedCode(secondaryDoc.content)}
            </div>
          )}
        </div>

        {/* Native macOS Status Bar */}
        <div
          className={`px-3 py-1.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono select-none ${currentTheme.statusBar}`}
        >
          <div className="flex items-center gap-4">
            <span className="hover:text-emerald-400 cursor-pointer">Ln 14, Col 28</span>
            <span className="opacity-70">Pos 412 (1,048 chars)</span>
            <span className="text-emerald-400 font-semibold cursor-pointer" title="Document Line Count">
              28 lines
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-emerald-400 cursor-pointer" title="Character Encoding">
              UTF-8
            </span>
            <span className="hover:text-emerald-400 cursor-pointer" title="Line Ending: Unix LF">
              Unix (LF)
            </span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-medium">
              {activeDoc.language}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 10, 70))}
                className="hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="w-10 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 10, 150))}
                className="hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
