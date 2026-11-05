import React, { useState } from 'react';
import { Bookmark, Trash2, Search, ArrowRight, BookOpen } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { ArticleCard } from './ArticleCard';

interface BookmarksScreenProps {
  bookmarks: NewsArticle[];
  onToggleBookmark: (article: NewsArticle) => void;
  onClearAll: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onNavigateHome: () => void;
}

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({
  bookmarks,
  onToggleBookmark,
  onClearAll,
  onSelectArticle,
  onNavigateHome,
}) => {
  const [search, setSearch] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filtered = bookmarks.filter((b) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.source.name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 pb-16 px-3 sm:px-4 pt-3 flex flex-col gap-4 max-w-4xl mx-auto w-full transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-0.5">
            Saved Articles
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {bookmarks.length} {bookmarks.length === 1 ? 'dispatch' : 'dispatches'} saved for offline reading
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
            title="Clear all saved bookmarks"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Clear Confirmation Modal / Banner */}
      {showClearConfirm && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl flex items-center justify-between text-xs">
          <span className="font-semibold text-red-900 dark:text-red-200">
            Remove all {bookmarks.length} saved bookmarks?
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClearAll();
                setShowClearConfirm(false);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 cursor-pointer"
            >
              Confirm Clear
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search within bookmarks if there are items */}
      {bookmarks.length > 1 && (
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search within your saved stories..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/40"
          />
        </div>
      )}

      {/* Bookmarks List or Empty State */}
      {bookmarks.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
            No Saved Articles Yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-5 leading-relaxed">
            While browsing dispatches on Sahil News, tap the bookmark icon on any headline to save it for reading anytime.
          </p>
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Latest News</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500">
          No saved articles match &ldquo;{search}&rdquo;.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              onSelectArticle={onSelectArticle}
              layout="compact"
            />
          ))}
        </div>
      )}
    </div>
  );
};
