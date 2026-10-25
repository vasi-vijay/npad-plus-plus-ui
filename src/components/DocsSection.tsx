import React, { useState } from 'react';
import { DOCS_DATA } from '../data/docsData';
import { SHORTCUTS_DATA } from '../data/shortcutsData';
import { filterDocumentation, filterShortcuts } from '../utils/releaseUtils';
import {
  Search,
  BookOpen,
  Keyboard,
  Check,
  Copy,
  ChevronRight,
  Terminal,
  ShieldCheck,
  HelpCircle,
  FileText
} from 'lucide-react';

export const DocsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guides' | 'shortcuts'>('guides');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDocId, setSelectedDocId] = useState(DOCS_DATA[0].id);
  const [copiedShortcut, setCopiedShortcut] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'editing', label: 'Editing & Buffers' },
    { id: 'search-replace', label: 'Search & Replace' },
    { id: 'terminal', label: 'Terminal & Scripts' },
    { id: 'customization', label: 'Settings & Sessions' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ];

  const filteredDocs = filterDocumentation(DOCS_DATA, searchQuery, selectedCategory);
  const activeDoc = DOCS_DATA.find((d) => d.id === selectedDocId) || filteredDocs[0] || DOCS_DATA[0];

  const filteredShortcuts = filterShortcuts(SHORTCUTS_DATA, searchQuery);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedShortcut(id);
    setTimeout(() => setCopiedShortcut(null), 2000);
  };

  return (
    <section id="docs" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>NPad++ Knowledge Base &amp; Guides</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Documentation &amp; User Manual
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Everything you need to know about installation, keyboard shortcuts, regex patterns, terminal integration, and configuration.
          </p>
        </div>

        {/* Search Bar & Mode Switcher */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search docs, shortcuts, or commands (e.g. 'gatekeeper', 'regex', 'split-view', 'duplicate')..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'guides'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Guides &amp; Articles ({filteredDocs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('shortcuts')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'shortcuts'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Keyboard className="w-4 h-4" />
              <span>Keyboard Shortcuts ({filteredShortcuts.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Guides & Articles */}
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar list of articles */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-2">
                Articles
              </div>
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-2">
                {filteredDocs.map((doc) => {
                  const isSelected = activeDoc.id === doc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 border ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold leading-tight">{doc.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                          {doc.summary}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    </button>
                  );
                })}

                {filteredDocs.length === 0 && (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No articles match &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            </div>

            {/* Active Article Content Area */}
            <div className="lg:col-span-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {activeDoc.category.replace('-', ' ')}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {activeDoc.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  {activeDoc.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {activeDoc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300">
                <div
                  className="space-y-3 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: activeDoc.content
                      .trim()
                      .split('\n\n')
                      .map((block) => {
                        const trimmed = block.trim();
                        if (trimmed.startsWith('### ')) {
                          return `<h4 class="text-base font-bold text-slate-900 dark:text-white mt-6 mb-2 border-b border-slate-200/60 dark:border-slate-800 pb-1.5">${trimmed.replace('### ', '')}</h4>`;
                        }
                        if (trimmed.startsWith('#### ')) {
                          return `<h5 class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">${trimmed.replace('#### ', '')}</h5>`;
                        }
                        if (trimmed.startsWith('```bash')) {
                          const code = trimmed.replace('```bash', '').replace('```', '').trim();
                          return `<pre class="p-3.5 my-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">${code}</pre>`;
                        }
                        if (trimmed.startsWith('> ')) {
                          return `<blockquote class="border-l-2 border-emerald-500 pl-3 italic text-xs text-slate-600 dark:text-slate-400 my-2">${trimmed.replace('> ', '')}</blockquote>`;
                        }
                        if (trimmed === '---') {
                          return `<hr class="my-4 border-slate-200 dark:border-slate-800" />`;
                        }

                        // Process inline formatting (bold, code)
                        let formatted = trimmed
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
                          .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-mono text-xs">$1</code>');

                        // Line breaks within paragraph/list
                        formatted = formatted.split('\n').join('<br />');

                        return `<p class="my-2">${formatted}</p>`;
                      })
                      .join('')
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Keyboard Shortcuts Cheatsheet */}
        {activeTab === 'shortcuts' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Keyboard Shortcuts Cheatsheet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {filteredShortcuts.length} shortcuts with Notepad++ equivalents
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">macOS Key</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Notepad++ Comparison</th>
                    <th className="py-3 px-4 text-right">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-sans">
                  {filteredShortcuts.map((sc) => (
                    <tr key={sc.id} className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                        {sc.action}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-2xs">
                          {sc.shortcut}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                        {sc.notepadComparison || '—'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {sc.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
