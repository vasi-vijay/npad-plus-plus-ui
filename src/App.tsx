/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { ScreenshotGallery } from './components/ScreenshotGallery';
import { DownloadSection } from './components/DownloadSection';
import { DocsSection } from './components/DocsSection';
import { ChangelogSection } from './components/ChangelogSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('npad_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['features', 'screenshots', 'download', 'docs', 'changelog', 'about'].includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync dark class on document element and persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('npad_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('npad_theme', 'light');
    }
  }, [isDark]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view === 'home') {
      window.history.pushState(null, '', ' ');
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <DownloadSection
              onNavigateDocs={() => handleNavigate('docs')}
              onNavigateChangelog={() => handleNavigate('changelog')}
            />
            <ScreenshotGallery />
            <FeatureSection onNavigateDownload={() => handleNavigate('download')} />
            <FaqSection />
          </>
        )}

        {currentView === 'features' && (
          <div className="pt-6">
            <FeatureSection onNavigateDownload={() => handleNavigate('download')} />
          </div>
        )}

        {currentView === 'screenshots' && (
          <div className="pt-6">
            <ScreenshotGallery />
          </div>
        )}

        {currentView === 'download' && (
          <div className="pt-6">
            <DownloadSection
              onNavigateDocs={() => handleNavigate('docs')}
              onNavigateChangelog={() => handleNavigate('changelog')}
            />
          </div>
        )}

        {currentView === 'docs' && (
          <div className="pt-6">
            <DocsSection />
          </div>
        )}

        {currentView === 'changelog' && (
          <div className="pt-6">
            <ChangelogSection />
          </div>
        )}

        {currentView === 'about' && (
          <div className="pt-6">
            <AboutSection />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
