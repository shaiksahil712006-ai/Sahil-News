import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle, Flame, Clock, TrendingUp } from 'lucide-react';
import { NewsArticle, FilterType } from '../types/news';
import { ArticleCard } from './ArticleCard';

interface HomeScreenProps {
  articles: NewsArticle[];
  isLoading: boolean;
  error?: string;
  isLive: boolean;
  activeFilter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
  onRefresh: () => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (article: NewsArticle) => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  articles,
  isLoading,
  error,
  isLive,
  activeFilter,
  onChangeFilter,
  onRefresh,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
}) => {
  const [isPulling, setIsPulling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY > 0 && window.scrollY === 0) {
      const currentY = e.touches[0].clientY;
      if (currentY - touchStartY > 60) {
        setIsPulling(true);
      }
    }
  };

  const handleTouchEnd = () => {
    if (isPulling) {
      onRefresh();
      setIsPulling(false);
    }
    setTouchStartY(0);
  };

  const breakingArticle = articles.find((a) => a.isBreaking) || articles[0];
  const remainingArticles = articles.filter((a) => a.id !== breakingArticle?.id);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="flex-1 pb-16 px-3 sm:px-4 pt-3 flex flex-col gap-4 max-w-4xl mx-auto w-full transition-colors"
    >
      {/* Pull to refresh visual trigger */}
      {isPulling && (
        <div className="w-full flex items-center justify-center py-2 text-xs font-semibold text-red-600 dark:text-red-400 gap-1.5 animate-bounce">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Release to refresh Sahil News...</span>
        </div>
      )}

      {/* Breaking News Ticker */}
      {breakingArticle && (
        <div
          onClick={() => onSelectArticle(breakingArticle)}
          className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl px-3 py-2 flex items-center gap-2.5 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
        >
          <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider shrink-0">
            FLASH
          </span>
          <p className="text-xs font-semibold text-slate-800 dark:text-red-200 truncate flex-1">
            {breakingArticle.title}
          </p>
        </div>
      )}

      {/* Error or Notice Banner */}
      {error && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Notice: </span>
            {error} (Viewing high-priority verified news bureau feed).
          </div>
          <button
            onClick={onRefresh}
            className="text-amber-800 dark:text-amber-300 font-bold hover:underline shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {/* Filter Tabs (Segmented Controls) */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          <button
            onClick={() => onChangeFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Stories
          </button>

          <button
            onClick={() => onChangeFilter('trending')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'trending'
                ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Trending</span>
          </button>

          <button
            onClick={() => onChangeFilter('latest')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'latest'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Latest</span>
          </button>

          <button
            onClick={() => onChangeFilter('popular')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'popular'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Top Reads</span>
          </button>
        </div>

        {/* Live status badge */}
        <div className="shrink-0 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 px-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isLive ? 'Live API' : 'Curated Feed'}</span>
        </div>
      </div>

      {/* Shimmer skeleton state */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="w-full aspect-16/9 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      ) : articles.length === 0 ? (
        /* Empty State */
        <div className="py-16 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
            <RefreshCw className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            No articles found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-4">
            Try refreshing the feed or switching filter tabs to view more coverage.
          </p>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-md"
          >
            Refresh News Feed
          </button>
        </div>
      ) : (
        /* Article Feed */
        <div className="flex flex-col gap-4">
          {/* Featured Top Story */}
          {breakingArticle && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Lead Story
                </span>
                <span className="text-[11px] text-slate-400">Tap to read full dispatch</span>
              </div>
              <ArticleCard
                article={breakingArticle}
                isBookmarked={isBookmarked(breakingArticle.id)}
                onToggleBookmark={onToggleBookmark}
                onSelectArticle={onSelectArticle}
                layout="featured"
              />
            </div>
          )}

          {/* Remaining Stories Section */}
          {remainingArticles.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Latest Coverage
                </span>
                <span className="text-[11px] text-slate-400">
                  {remainingArticles.length} stories
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {remainingArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isBookmarked={isBookmarked(article.id)}
                    onToggleBookmark={onToggleBookmark}
                    onSelectArticle={onSelectArticle}
                    layout="compact"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
