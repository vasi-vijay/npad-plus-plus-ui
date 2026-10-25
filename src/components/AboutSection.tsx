import React from 'react';
import { ChameleonLogo } from './ChameleonLogo';
import { CURRENT_RELEASE } from '../config/release';
import {
  ShieldAlert,
  Cpu,
  Github,
  Heart,
  FileCode2,
  Terminal,
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ChameleonLogo size={48} showText={false} className="justify-center mb-4" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About NPad++ for macOS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A native macOS code and text editor inspired by the productivity, speed, and muscle memory of Notepad++.
          </p>
        </div>

        {/* Independent Project Notice / Disclaimer */}
        <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-2">
              <div className="font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Independent Project Notice &amp; Trademark Clarification
              </div>
              <p>
                <strong>NPad++ is an independent macOS project</strong> created for Mac developers who value the fast, lightweight editing workflows of Notepad++. NPad++ is <strong>not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with Don Ho or the official Notepad++ project</strong>.
              </p>
              <p>
                The name &quot;Notepad++&quot; and related trademarks belong to their respective copyright holders. NPad++ is a ground-up native macOS application written in Swift and AppKit.
              </p>
            </div>
          </div>
        </div>

        {/* The Motivation */}
        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Why We Built NPad++
          </h3>
          <p>
            NPad++ is a native macOS code editor developed by <strong>vasi-vijay</strong>, designed to bring a clean, fast, and productive editing experience to Mac users. Built directly with <strong>Swift, SwiftUI, AppKit, Foundation, and Xcode</strong>, NPad++ launches cold in under 100 milliseconds, sips less than 35 megabytes of memory, and responds to keystrokes at the native display refresh rate (including 120Hz ProMotion).
          </p>
          <p>
            For decades, Notepad++ has been the go-to scratchpad and quick code editor for millions of developers on Windows. When switching to macOS, developers faced an unfortunate dilemma: either run heavyweight Electron-based editors that take 5 seconds to boot and consume 500 MB of RAM just to take a quick note, or attempt running Windows binaries through Wine emulation layers. NPad++ delivers the speed and muscle memory of Notepad++ natively on Apple Silicon.
          </p>
        </div>

        {/* Technical Architecture */}
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90">
            <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Native Swift 6 &amp; AppKit</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-normal">
              Zero web runtimes, zero V8 garbage collection pauses, and zero Chromium rendering loops. Pure Cocoa typography.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90">
            <FileCode2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Treesitter Syntax Parsing</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-normal">
              Incremental concrete syntax tree parsing for 50+ programming languages that highlights code without blocking the main thread.
            </p>
          </div>
        </div>

        {/* Open Source & Contributing */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Contributing &amp; Community</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            NPad++ is developed in the open. We welcome bug reports, pull requests, syntax grammar additions, and localization contributions from developers around the world.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={CURRENT_RELEASE.githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href={`${CURRENT_RELEASE.githubRepoUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <span>Report an Issue / Bug</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
