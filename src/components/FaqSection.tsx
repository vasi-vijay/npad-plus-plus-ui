import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Why does macOS Gatekeeper warn me when I open NPad++ for the first time?',
    answer:
      'Early builds and Release Candidates of NPad++ are currently distributed with ad-hoc signing while Apple Developer ID notarization is being finalized. Because of this, macOS Gatekeeper shows a precautionary security prompt. You can open it easily by right-clicking NPad++.app in your Applications folder and selecting "Open", or by running "sudo xattr -r -d com.apple.quarantine /Applications/NPad++.app" in Terminal.',
  },
  {
    question: 'Does NPad++ support all Apple Silicon M chips (M1, M2, M3, M4, M5, M6)?',
    answer:
      'Yes, 100%. NPad++ natively supports all Apple Silicon M-series chips, including M1, M2, M3, M4, M5, and M6, as well as Pro, Max, and Ultra variants. It compiles directly into ARM64 native machine instructions, delivering sub-100ms startup times, minimal memory consumption, and peak battery efficiency on all Apple Silicon MacBooks, Mac mini, Mac Studio, and iMacs. An Intel (x86_64) version is also provided.',
  },
  {
    question: 'Does NPad++ collect any telemetry or track my editing data?',
    answer:
      'No. NPad++ has zero telemetry, zero analytics scripts, and zero cloud synchronization requirements. All buffers, scratchpads, and session backups remain strictly on your local disk in ~/Library/Application Support/NPad++.',
  },
  {
    question: 'How does NPad++ compare to running Notepad++ in Wine?',
    answer:
      'Running Notepad++ through Wine often results in blurry text rendering on Retina screens, broken macOS keyboard shortcuts (Ctrl vs Cmd), lack of macOS dark mode integration, sluggish file dialogs, and high battery consumption. NPad++ is written specifically for macOS with native Cocoa/AppKit text views, native menus, and Mac shortcuts.',
  },
  {
    question: 'Can I split views and edit two documents side-by-side?',
    answer:
      'Yes! Press ⌘⌥D or select "View → Toggle Split View" to create dual vertical or horizontal viewports. You can edit two separate files simultaneously or inspect different sections of the same file.',
  },
  {
    question: 'How do I completely uninstall NPad++?',
    answer:
      'Simply drag NPad++.app from your Applications folder to the Trash. If you wish to remove cached session files and settings, delete the folder at ~/Library/Application Support/NPad++.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Answers to common questions about installation, Apple Silicon compatibility, Gatekeeper, and privacy.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
