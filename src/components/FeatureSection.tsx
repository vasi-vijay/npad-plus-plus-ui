import React, { useState } from 'react';
import { FEATURES_DATA } from '../data/featuresData';
import { FeatureItem } from '../types';
import {
  Code,
  Search,
  Sparkles,
  Terminal,
  Apple,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

interface FeatureSectionProps {
  onNavigateDownload: () => void;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({ onNavigateDownload }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'editing', label: 'Editing & Buffer', icon: Code },
    { id: 'search', label: 'Search & Replace', icon: Search },
    { id: 'languages', label: 'Languages & Grammars', icon: Sparkles },
    { id: 'productivity', label: 'Productivity & Scripts', icon: Terminal },
    { id: 'macos', label: 'macOS Native', icon: Apple },
  ];

  const filteredFeatures = FEATURES_DATA.filter((feat) => {
    if (selectedCategory === 'all') return true;
    return feat.category === selectedCategory;
  });

  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Verified Functionality &amp; Transparent Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Designed for Speed. Built for macOS.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            NPad++ combines the responsive feel and muscle memory of Notepad++ with the precision of native macOS AppKit typography and Apple Silicon hardware acceleration.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10" role="tablist">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feat) => (
            <div
              key={feat.id}
              className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Badge: Available vs Planned */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  {feat.isAvailable ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Available in v1.0</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/80">
                      <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span>Planned Roadmap</span>
                    </span>
                  )}

                  {feat.shortcut && (
                    <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {feat.shortcut}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                  {feat.description}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal border-t border-slate-100 dark:border-slate-800 pt-3">
                  {feat.detail}
                </p>
              </div>

              {feat.highlight && (
                <div className="mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>{feat.highlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA block */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold">Ready to experience instant editing on your Mac?</h3>
            <p className="mt-2 text-emerald-100 text-sm">
              Download the native NPad++ macOS Release Candidate today and leave heavy editor startup behind.
            </p>
          </div>

          <button
            onClick={onNavigateDownload}
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-emerald-800 font-semibold text-sm hover:bg-emerald-50 active:bg-emerald-100 transition-all shadow-md"
          >
            Go to Downloads
          </button>
        </div>
      </div>
    </section>
  );
};
