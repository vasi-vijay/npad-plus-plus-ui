import React, { useState } from 'react';
import { CURRENT_RELEASE } from '../config/release';
import { Architecture } from '../types';
import {
  Download,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldAlert,
  Terminal,
  Info,
  Copy,
  Check
} from 'lucide-react';

interface DownloadSectionProps {
  onNavigateDocs?: () => void;
  onNavigateChangelog?: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  onNavigateDocs,
  onNavigateChangelog,
}) => {
  const [selectedArch, setSelectedArch] = useState<Architecture>('arm64');
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [copiedDmgQuarantine, setCopiedDmgQuarantine] = useState(false);
  const [copiedAppQuarantine, setCopiedAppQuarantine] = useState(false);

  const activeAsset = CURRENT_RELEASE.assets[selectedArch];
  const effectiveDownloadUrl = activeAsset.downloadUrl || `/downloads/${activeAsset.filename}`;

  const handleCopyDmgQuarantine = () => {
    navigator.clipboard.writeText('xattr -d com.apple.quarantine ~/Downloads/"NPad++.dmg"');
    setCopiedDmgQuarantine(true);
    setTimeout(() => setCopiedDmgQuarantine(false), 2000);
  };

  const handleCopyAppQuarantine = () => {
    navigator.clipboard.writeText('xattr -cr /Applications/NPad++.app');
    setCopiedAppQuarantine(true);
    setTimeout(() => setCopiedAppQuarantine(false), 2000);
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Analytics telemetry payload measuring user intent and chosen architecture
    const analyticsEvent = {
      event: 'dmg_download_initiated',
      appName: CURRENT_RELEASE.appName,
      version: CURRENT_RELEASE.version,
      architecture: selectedArch,
      archLabel: activeAsset.archLabel,
      filename: activeAsset.filename,
      sizeHuman: activeAsset.sizeHuman,
      downloadUrl: effectiveDownloadUrl,
      timestamp: new Date().toISOString(),
      referrer: typeof document !== 'undefined' ? document.referrer : '',
    };

    // Log to console for observability / debugging
    console.log('[NPad++ Analytics] DMG Download Triggered:', analyticsEvent);

    // Support standard web analytics buses (e.g. Google Tag Manager / window.dataLayer)
    if (typeof window !== 'undefined') {
      const anyWin = window as unknown as { dataLayer?: Record<string, unknown>[] };
      if (Array.isArray(anyWin.dataLayer)) {
        anyWin.dataLayer.push(analyticsEvent);
      }
      // Broadcast CustomEvent for any listening subscriber or embedder
      window.dispatchEvent(
        new CustomEvent('npad:download', { detail: analyticsEvent })
      );
    }

    setDownloadStarted(true);
    setTimeout(() => setDownloadStarted(false), 2500);
  };

  return (
    <section id="download" className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
            <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>macOS Installer Portal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Download NPad++ for macOS
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Current stable release: <strong className="text-slate-900 dark:text-white font-mono">{CURRENT_RELEASE.version}</strong> ({CURRENT_RELEASE.releaseDate})
          </p>
        </div>

        {/* Architecture Selector Tabs */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex p-1 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm" role="tablist">
            <button
              role="tab"
              aria-selected={selectedArch === 'arm64'}
              onClick={() => setSelectedArch('arm64')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                selectedArch === 'arm64'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Apple Silicon (All M Chips: M1–M6)</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-800/80 text-white hidden sm:inline-block">
                Recommended
              </span>
            </button>

            <button
              role="tab"
              aria-selected={selectedArch === 'x86_64'}
              onClick={() => setSelectedArch('x86_64')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                selectedArch === 'x86_64'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Intel (x86_64)</span>
            </button>
          </div>
        </div>

        {/* Main Download Card */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10 mb-12">
          {/* Release Status & Filename Details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {CURRENT_RELEASE.appName} {CURRENT_RELEASE.version}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>DMG Ready</span>
                </span>
              </div>

              <div className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                Package: <span className="text-slate-700 dark:text-slate-300 font-semibold">{activeAsset.filename}</span> ({activeAsset.sizeHuman})
              </div>
            </div>

            {/* Release specs summary */}
            <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
              <div>Arch: <strong className="text-slate-700 dark:text-slate-300">{activeAsset.archLabel}</strong></div>
              <div>Min OS: <strong className="text-slate-700 dark:text-slate-300">{CURRENT_RELEASE.minimumMacOS}</strong></div>
            </div>
          </div>

          {/* Download Action Area */}
          <div className="py-8 text-center">
            <a
              href={effectiveDownloadUrl}
              download={activeAsset.filename}
              onClick={handleDownloadClick}
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-lg shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              {downloadStarted ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-200 animate-pulse" />
                  <span>Starting Download...</span>
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  <span>Download {activeAsset.filename}</span>
                </>
              )}
            </a>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Direct macOS disk image installer • {activeAsset.sizeHuman} • Native AppKit
            </p>
          </div>

          {/* macOS Gatekeeper Alert Notice & One-Line Terminal Command */}
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-left space-y-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                    macOS Gatekeeper Alert? Quick Fix
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                    Normal Behavior
                  </span>
                </div>
                <p className="mt-1 text-xs text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                  This alert is caused by macOS Gatekeeper. It is completely normal for apps downloaded from the internet that are not distributed through the Mac App Store.
                </p>
              </div>
            </div>

            {/* Why Does This Happen? */}
            <div className="p-4 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-amber-200/70 dark:border-amber-900/40 text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Why Does This Happen?</span>
              </div>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                Whenever any file is downloaded through a web browser (Chrome, Safari), macOS automatically attaches an extended quarantine attribute (<code className="font-mono bg-amber-100/70 dark:bg-amber-950/60 px-1 py-0.5 rounded text-amber-900 dark:text-amber-300 font-semibold">com.apple.quarantine</code>) to the file.
              </p>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                Because NPad++ is an independent open-source application signed with an ad-hoc signature (rather than an Apple Developer ID Certificate ($99/year) that has been notarized by Apple's servers), Gatekeeper blocks opening it via a standard double-click.
              </p>
            </div>

            {/* One-Line Terminal Command */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>One-Line Terminal Command (Remove Quarantine):</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-1.5">
                  If you prefer the terminal, you can remove the browser quarantine attribute with a single command:
                </p>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs flex items-center justify-between gap-3 border border-slate-800 shadow-inner">
                  <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                    <span className="text-slate-500 select-none">$</span>
                    <span className="text-emerald-400 select-all">xattr -d com.apple.quarantine ~/Downloads/&quot;NPad++.dmg&quot;</span>
                  </div>
                  <button
                    onClick={handleCopyDmgQuarantine}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors shrink-0"
                    title="Copy command"
                  >
                    {copiedDmgQuarantine ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDmgQuarantine ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mb-1.5">
                  Once installed into <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200 font-semibold">/Applications</code>, if Gatekeeper ever prompts when launching the app:
                </div>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs flex items-center justify-between gap-3 border border-slate-800 shadow-inner">
                  <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                    <span className="text-slate-500 select-none">$</span>
                    <span className="text-emerald-400 select-all">xattr -cr /Applications/NPad++.app</span>
                  </div>
                  <button
                    onClick={handleCopyAppQuarantine}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors shrink-0"
                    title="Copy command"
                  >
                    {copiedAppQuarantine ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAppQuarantine ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Clean 2-Step Drag-and-Drop Installation Guide */}
          <div className="p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Simple Drag-and-Drop Installation
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Open the DMG</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">Double-click <strong>{activeAsset.filename}</strong> to mount the volume.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Drag to Applications</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">Drag <strong>NPad++</strong> into the Applications shortcut.</div>
                </div>
              </div>
            </div>

            {/* Visual DMG Installer Preview */}
            <div className="pt-2">
              <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm bg-black/10">
                <img
                  src="/assets/aistudio/image_f8026479.png"
                  alt="Mounted NPad++ DMG Disk Image"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Requirements Grid */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Operating System</div>
            <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">macOS 12.0 Monterey+</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Compatible with Ventura, Sonoma, Sequoia</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Processor Architecture</div>
            <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">Apple Silicon &amp; Intel</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Native ARM64 for all M chips (M1, M2, M3, M4, M5, M6, Pro, Max, Ultra)</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Memory &amp; Storage</div>
            <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">&lt; 35 MB RAM / 50 MB Disk</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Zero Electron dependencies</div>
          </div>
        </div>
      </div>
    </section>
  );
};
