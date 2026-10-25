import React from 'react';
import { ChameleonLogo } from './ChameleonLogo';
import { CURRENT_RELEASE } from '../config/release';
import { Github, Heart, Shield, Terminal, BookOpen, Download, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <ChameleonLogo size={32} showText={true} />
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              NPad++ is a fast, lightweight native macOS text and code editor inspired by the productivity and editing capabilities of Notepad++.
            </p>
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              Version {CURRENT_RELEASE.version} • Built for macOS Monterey, Ventura, Sonoma, and Sequoia
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Features Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('screenshots')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Screenshot Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('download')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Download DMG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('changelog')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Release Changelog
                </button>
              </li>
            </ul>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Documentation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('docs')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Installation &amp; Gatekeeper
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Keyboard Shortcuts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Regex Search Syntax
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Terminal Integration
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Project &amp; Source
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={CURRENT_RELEASE.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  About &amp; Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Open Source License
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Creator Attribution Tag */}
        <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="https://www.instagram.com/made.by.vijay"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-emerald-500/10 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-emerald-500/20 border border-pink-500/30 dark:border-pink-500/40 text-slate-800 dark:text-slate-100 font-medium text-xs shadow-sm hover:shadow-md transition-all hover:scale-105"
            title="Follow Made By Vijay on Instagram"
          >
            <div className="p-1 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white">
              <Instagram className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold">Made By Vijay</span>
            <span className="text-[11px] text-pink-600 dark:text-pink-400 font-mono group-hover:underline">@made.by.vijay</span>
          </a>

          <div className="text-center sm:text-right max-w-lg text-[11px] text-slate-400 dark:text-slate-500">
            NPad++ is an independent macOS project and is not affiliated with, sponsored by, or endorsed by Notepad++ or Don Ho.
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 mt-4 border-t border-slate-100/60 dark:border-slate-900 flex items-center justify-center text-[11px] text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} NPad++ Contributors. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
