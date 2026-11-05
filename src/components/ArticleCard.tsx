import React, { useState } from 'react';
import { Bookmark, Clock, Share2, Eye, Newspaper } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface ArticleCardProps {
  article: NewsArticle;
  isBookmarked: boolean;
  onToggleBookmark: (article: NewsArticle) => void;
  onSelectArticle: (article: NewsArticle) => void;
  layout?: 'featured' | 'compact' | 'grid';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  layout = 'compact',
}) => {
  const [imgError, setImgError] = useState(false);

  const formatTimeAgo = (dateStr: string) => {
    try {
      const diffMinutes = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60));
      if (diffMinutes < 60) return `${Math.max(1, diffMinutes)}m ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
    }
  };

  // Fallback visual container when image fails or is missing
  const renderFallbackImage = (aspectClass: string) => (
    <div
      className={`w-full ${aspectClass} bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-slate-400 p-4 relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-red-950/20" />
      <Newspaper className="w-8 h-8 text-slate-500 mb-1 z-10" />
      <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase z-10">
        {article.category}
      </span>
      <span className="text-[10px] text-slate-500 z-10">{article.source.name}</span>
    </div>
  );

  if (layout === 'featured') {
    return (
      <article
        onClick={() => onSelectArticle(article)}
        className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all cursor-pointer flex flex-col"
      >
        {/* Large Media with Scrim */}
        <div className="relative w-full aspect-16/9 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          {!imgError && article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            renderFallbackImage('aspect-16/9')
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Top metadata tags */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-xs">
              {article.isBreaking ? 'Breaking News' : article.category}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article);
              }}
              className="p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full backdrop-blur-md transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
              title={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
              aria-label={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          {/* Source overlay */}
          <div className="absolute bottom-3 left-3 text-white text-xs font-semibold drop-shadow-md">
            {article.source.name}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
              {article.description}
            </p>
          </div>

          {/* Clean unboxed metadata separator */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-700 dark:text-slate-300">{article.author || article.source.name}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTimeAgo(article.publishedAt)}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            {article.viewsCount && (
              <span className="hidden xs:flex items-center gap-1 font-mono text-[11px]">
                <Eye className="w-3 h-3" />
                {article.viewsCount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Compact List Item layout (essential for mobile feed)
  return (
    <article
      onClick={() => onSelectArticle(article)}
      className="group bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex gap-3 sm:gap-4 items-center"
    >
      {/* Thumbnail */}
      <div className="relative w-24 sm:w-28 h-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
        {!imgError && article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          renderFallbackImage('h-full')
        )}
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
        <div>
          {/* Category & Source kicker */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-bold text-red-600 dark:text-red-400">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{article.source.name}</span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {article.title}
          </h3>
        </div>

        {/* Footer info & Bookmark */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
          <div className="flex items-center gap-2 text-[11px]">
            <span>{formatTimeAgo(article.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article);
            }}
            className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            title={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
            aria-label={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
};
