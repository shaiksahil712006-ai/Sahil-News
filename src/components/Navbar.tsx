import React from 'react';
import { Newspaper, Search, Moon, Sun, Code2, RefreshCw } from 'lucide-react';
import { TabType } from '../types/news';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenFlutterModal: () => void;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  activeTab,
  onSelectTab,
  onOpenFlutterModal,
  isRefreshing = false,
  onRefresh,
}) => {
  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Area */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            <Newspaper className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                Sahil <span className="text-red-600 dark:text-red-500">News</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              {todayFormatted} · Daily Edition
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Refresh */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              title="Refresh News Feed"
              aria-label="Refresh News Feed"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-red-600' : ''}`} />
            </button>
          )}

          {/* Search Trigger */}
          <button
            onClick={() => onSelectTab('search')}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              activeTab === 'search'
                ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Search News"
            aria-label="Search News"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Flutter Code Modal Trigger */}
          <button
            onClick={onOpenFlutterModal}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors cursor-pointer"
            title="View Flutter & Dart Android Source Code"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Flutter Code</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
