import React from 'react';
import { CHANGELOG_DATA } from '../data/changelogData';
import {
  GitCommit,
  Tag,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Wrench,
  Bug,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { CURRENT_RELEASE } from '../config/release';

export const ChangelogSection: React.FC = () => {
  return (
    <section id="changelog" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
            <GitCommit className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Version History &amp; Release Notes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Release Changelog
          </h2>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Track what’s new, improved, and resolved in each release of NPad++ for macOS.
          </p>
        </div>

        {/* Timeline of releases */}
        <div className="space-y-10 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {CHANGELOG_DATA.map((entry) => {
            const isLatest = entry.version.includes(CURRENT_RELEASE.version);
            return (
              <div key={entry.version} className="relative pl-10">
                {/* Timeline node */}
                <div
                  className={`absolute left-1.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                    isLatest
                      ? 'bg-emerald-500 border-white dark:border-slate-900 ring-4 ring-emerald-500/20'
                      : 'bg-slate-300 dark:bg-slate-700 border-white dark:border-slate-900'
                  }`}
                />

                {/* Release Card */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 shadow-sm">
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                        {entry.version}
                      </h3>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          entry.tag === 'Release Candidate'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                            : entry.tag === 'Beta'
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                            : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                        }`}
                      >
                        {entry.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{entry.date}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {entry.summary}
                  </p>

                  {/* Added Items */}
                  {entry.added.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Added Features</span>
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        {entry.added.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-normal">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {entry.improved.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-2.5">
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Improvements &amp; Optimizations</span>
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        {entry.improved.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-normal">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Bug Fixes */}
                  {entry.fixed.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-2.5">
                        <Bug className="w-3.5 h-3.5" />
                        <span>Bug Fixes</span>
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        {entry.fixed.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-normal">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Known Issues */}
                  {entry.knownIssues && entry.knownIssues.length > 0 && (
                    <div className="mt-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Known Disclosures</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pl-1">
                        {entry.knownIssues.map((issue, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span>-</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
