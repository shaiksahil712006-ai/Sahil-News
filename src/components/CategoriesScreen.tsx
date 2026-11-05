import React, { useState } from 'react';
import {
  Globe2,
  Cpu,
  Trophy,
  TrendingUp,
  Film,
  GraduationCap,
  Flag,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { NewsCategory, NewsArticle } from '../types/news';
import { CATEGORIES_CONFIG } from '../data/mockNews';
import { ArticleCard } from './ArticleCard';

interface CategoriesScreenProps {
  articles: NewsArticle[];
  selectedCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (article: NewsArticle) => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  articles,
  selectedCategory,
  onSelectCategory,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const getCategoryIcon = (name: NewsCategory) => {
    switch (name) {
      case 'India':
        return Flag;
      case 'World':
        return Globe2;
      case 'Technology':
        return Cpu;
      case 'Sports':
        return Trophy;
      case 'Business':
        return TrendingUp;
      case 'Entertainment':
        return Film;
      case 'Education':
        return GraduationCap;
      default:
        return Flag;
    }
  };

  // Filter articles by currently selected category
  const categoryArticles = articles.filter((art) => {
    const matchesCat = art.category.toLowerCase() === selectedCategory.toLowerCase();
    if (!matchesCat) return false;
    if (searchFilter.trim()) {
      return (
        art.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        art.description.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="flex-1 pb-16 px-3 sm:px-4 pt-3 flex flex-col gap-4 max-w-4xl mx-auto w-full transition-colors">
      {/* Categories Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">
          Explore by Category
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Curated streams across India, global politics, innovation, and culture
        </p>
      </div>

      {/* Horizontal Category Carousel / Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const Icon = getCategoryIcon(cat.name as NewsCategory);

          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name as NewsCategory)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Category Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-700/60 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-red-400 font-semibold mb-1">
              <span>Selected Section</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {selectedCategory}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              {CATEGORIES_CONFIG.find((c) => c.name === selectedCategory)?.description}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-2xl font-extrabold font-mono text-white">
              {categoryArticles.length}
            </span>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Articles</div>
          </div>
        </div>
      </div>

      {/* Category In-Stream Search Filter */}
      <div className="relative">
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder={`Filter inside ${selectedCategory}...`}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/40"
        />
        {searchFilter && (
          <button
            onClick={() => setSearchFilter('')}
            className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Articles Feed for Selected Category */}
      {categoryArticles.length === 0 ? (
        <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            No articles found in {selectedCategory}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {searchFilter ? 'Try clearing your filter keyword' : 'More coverage is currently being filed by correspondents'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {categoryArticles.map((article, idx) => (
            <ArticleCard
              key={article.id}
              article={article}
              isBookmarked={isBookmarked(article.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectArticle={onSelectArticle}
              layout={idx === 0 && !searchFilter ? 'featured' : 'compact'}
            />
          ))}
        </div>
      )}
    </div>
  );
};
