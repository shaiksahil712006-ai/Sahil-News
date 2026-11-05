import React, { useState } from 'react';
import { Search, X, Sparkles, TrendingUp, History } from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types/news';
import { ArticleCard } from './ArticleCard';

interface SearchScreenProps {
  articles: NewsArticle[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (article: NewsArticle) => void;
  onSelectArticle: (article: NewsArticle) => void;
  onPerformSearch: (query: string) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  articles,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  onPerformSearch,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const popularKeywords = [
    'ISRO Space Station',
    'Cricket T20',
    'Silicon AI',
    'Reserve Bank UPI',
    'STEM Curriculum',
    'Quantum Satellite',
    'Bullet Train',
    'Clean Energy',
  ];

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    onPerformSearch(keyword);
  };

  const handleClear = () => {
    setQuery('');
    onPerformSearch('');
  };

  const categories = ['All', 'India', 'World', 'Technology', 'Sports', 'Business', 'Entertainment', 'Education'];

  // Filter articles based on query and category
  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === 'All' || art.category.toLowerCase() === selectedCategory.toLowerCase();
    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    return (
      art.title.toLowerCase().includes(q) ||
      art.description.toLowerCase().includes(q) ||
      art.content.toLowerCase().includes(q) ||
      art.source.name.toLowerCase().includes(q) ||
      (art.author && art.author.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex-1 pb-16 px-3 sm:px-4 pt-3 flex flex-col gap-4 max-w-4xl mx-auto w-full transition-colors">
      {/* Search Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">
          Search Sahil News
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Find dispatches by headline, topic, journalist, or keywords
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onPerformSearch(e.target.value);
          }}
          placeholder="Search news, topics, sports, business..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-red-500/40"
          autoFocus
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Trending Search Keywords Chips */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
          <TrendingUp className="w-3.5 h-3.5 text-red-500" />
          <span>Trending Search Topics</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {popularKeywords.map((keyword) => (
            <button
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                query.toLowerCase() === keyword.toLowerCase()
                  ? 'bg-red-600 text-white border-red-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-red-400'
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Results Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
        <span>
          {query.trim() ? (
            <>
              Found <strong className="text-slate-900 dark:text-white">{filteredArticles.length}</strong> results for &ldquo;{query}&rdquo;
            </>
          ) : (
            `Showing ${filteredArticles.length} articles`
          )}
        </span>
        {selectedCategory !== 'All' && <span>Category: {selectedCategory}</span>}
      </div>

      {/* Results List */}
      {filteredArticles.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-500 flex items-center justify-center mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
            No matching news found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-3">
            Try searching for terms like &ldquo;ISRO&rdquo;, &ldquo;Cricket&rdquo;, &ldquo;Economy&rdquo;, or reset category filters.
          </p>
          <button
            onClick={handleClear}
            className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
          >
            Reset Search Filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredArticles.map((article) => (
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
      )}
    </div>
  );
};
