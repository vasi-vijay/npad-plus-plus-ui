import React, { useState } from 'react';
import { Download, ArrowRight, Zap, Cpu, ShieldCheck, Terminal, Sparkles, Layers } from 'lucide-react';
import { InteractiveEditorDemo } from './InteractiveEditorDemo';
import { CURRENT_RELEASE } from '../config/release';

interface HeroProps {
  onNavigate: (view: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [heroPreviewMode, setHeroPreviewMode] = useState<'interactive' | 'screenshot'>('interactive');
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Release Version pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>NPad++ {CURRENT_RELEASE.version} for macOS is now in Public Release Candidate</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Your Code. <span className="text-emerald-600 dark:text-emerald-400">Your Mac.</span> Your Flow.
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            NPad++ is a developer-focused text and code editor for macOS, designed to make everyday editing, code navigation, and file management simple and productive.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('download')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-base shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Download className="w-5 h-5" />
              <span>Download NPad++ for macOS</span>
              <span className="text-xs font-mono opacity-85 px-1.5 py-0.5 rounded bg-emerald-700/80">
                {CURRENT_RELEASE.assets.arm64.sizeHuman}
              </span>
            </button>

            <button
              onClick={() => onNavigate('features')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
            >
              <span>Explore Features</span>
              <ArrowRight className="w-4 h-4 text-emerald-500" />
            </button>
          </div>

          {/* System requirements note */}
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Supports all Apple M chips (M1, M2, M3, M4, M5, M6 &amp; beyond) &amp; Intel • Requires {CURRENT_RELEASE.minimumMacOS}
          </p>
        </div>

        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900 dark:text-white">&lt; 100ms Launch</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Instant cold startup</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <Cpu className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900 dark:text-white">&lt; 35 MB RAM</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Pure native AppKit</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <Layers className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Split-View Editing</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Dual pane workspaces</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Zero Telemetry</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">100% private &amp; local</div>
            </div>
          </div>
        </div>

        {/* Hero Preview Selector: Interactive Editor vs Real Application Capture */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 flex items-center gap-1 text-xs font-semibold shadow-inner">
            <button
              onClick={() => setHeroPreviewMode('interactive')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                heroPreviewMode === 'interactive'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-500" />
              <span>Interactive Playground</span>
            </button>
            <button
              onClick={() => setHeroPreviewMode('screenshot')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                heroPreviewMode === 'screenshot'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real macOS App Screenshot</span>
            </button>
          </div>
        </div>

        {/* Hero Preview Render */}
        {heroPreviewMode === 'interactive' ? (
          <InteractiveEditorDemo />
        ) : (
          <div className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-300 dark:border-slate-700 shadow-2xl overflow-hidden bg-slate-950 group">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-white">NPad++ Dual-Pane Split View — Live macOS Capture</span>
              </div>
              <button
                onClick={() => onNavigate('screenshots')}
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View all 6 screenshots</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src="/assets/aistudio/image_32bf1aa7.png"
              alt="NPad++ Split View on macOS"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};
