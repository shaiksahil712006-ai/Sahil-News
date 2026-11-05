import React, { useState, useEffect, useCallback } from 'react';
import { NewsArticle, NewsCategory, TabType, FilterType, AppSettings } from './types/news';
import { NewsService } from './services/newsService';
import { SplashScreen } from './components/SplashScreen';
import { AndroidFrame } from './components/AndroidFrame';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { SearchScreen } from './components/SearchScreen';
import { BookmarksScreen } from './components/BookmarksScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { NewsDetailModal } from './components/NewsDetailModal';
import { FlutterCodeModal } from './components/FlutterCodeModal';

const SETTINGS_STORAGE_KEY = 'sahil_news_app_settings';

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Core Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('India');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Articles & Data State
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLive, setIsLive] = useState(false);

  // Selected Article & Modals
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isFlutterModalOpen, setIsFlutterModalOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // App Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      darkMode: false,
      apiKey: NewsService.getApiKey(),
      fontSize: 'medium',
      autoRefresh: true,
      notificationsEnabled: true,
      viewMode: 'phone', // Default to authentic Android smartphone frame
    };
  });

  // Theme Syncing with DOM
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Save Settings Changes
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Toast Helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Load Bookmarks on Mount
  useEffect(() => {
    setBookmarks(NewsService.getBookmarks());
  }, []);

  // Fetch Articles
  const loadArticles = useCallback(
    async (isSilent = false) => {
      if (!isSilent) setIsLoading(true);
      setError(undefined);

      try {
        const result = await NewsService.fetchArticles({
          category: activeTab === 'categories' ? selectedCategory : 'All',
          filter: activeFilter,
          searchQuery: activeTab === 'search' ? searchQuery : '',
          apiKey: settings.apiKey,
        });

        setArticles(result.articles);
        setIsLive(result.isLive);
        if (result.error) {
          setError(result.error);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load news dispatches');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [activeTab, selectedCategory, activeFilter, searchQuery, settings.apiKey]
  );

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadArticles(true);
    showToast('Sahil News feed updated');
  };

  // Bookmark Toggle
  const handleToggleBookmark = (article: NewsArticle) => {
    const isNowSaved = NewsService.toggleBookmark(article);
    setBookmarks(NewsService.getBookmarks());
    showToast(isNowSaved ? 'Saved to Bookmarks' : 'Removed from Bookmarks');
  };

  const isArticleBookmarked = (id: string): boolean => {
    return bookmarks.some((b) => b.id === id);
  };

  const handleClearAllBookmarks = () => {
    NewsService.clearAllBookmarks();
    setBookmarks([]);
    showToast('All bookmarks cleared');
  };

  const handleSelectCategory = (cat: NewsCategory) => {
    setSelectedCategory(cat);
    setActiveTab('categories');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 font-sans-ui text-slate-900 dark:text-slate-100 transition-colors">
      {/* Splash Screen */}
      {showSplash && <SplashScreen onDismiss={() => setShowSplash(false)} />}

      {/* Android Device Simulator or Fluid View Wrapper */}
      <AndroidFrame
        viewMode={settings.viewMode}
        onToggleViewMode={() =>
          handleUpdateSettings({
            viewMode: settings.viewMode === 'phone' ? 'fluid' : 'phone',
          })
        }
      >
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-full">
          {/* Top App Bar */}
          <Navbar
            darkMode={settings.darkMode}
            onToggleDarkMode={() =>
              handleUpdateSettings({ darkMode: !settings.darkMode })
            }
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-14 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
              {toastMessage}
            </div>
          )}

          {/* Active Screen Tab View */}
          <main className="flex-1 flex flex-col overflow-y-auto">
            {activeTab === 'home' && (
              <HomeScreen
                articles={articles}
                isLoading={isLoading}
                error={error}
                isLive={isLive}
                activeFilter={activeFilter}
                onChangeFilter={setActiveFilter}
                onRefresh={handleRefresh}
                isBookmarked={isArticleBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onSelectArticle={setSelectedArticle}
              />
            )}

            {activeTab === 'categories' && (
              <CategoriesScreen
                articles={articles}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                isBookmarked={isArticleBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onSelectArticle={setSelectedArticle}
              />
            )}

            {activeTab === 'search' && (
              <SearchScreen
                articles={articles}
                isBookmarked={isArticleBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onSelectArticle={setSelectedArticle}
                onPerformSearch={(q) => setSearchQuery(q)}
              />
            )}

            {activeTab === 'bookmarks' && (
              <BookmarksScreen
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onClearAll={handleClearAllBookmarks}
                onSelectArticle={setSelectedArticle}
                onNavigateHome={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsScreen
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onReplaySplash={() => setShowSplash(true)}
                onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
                onRefreshArticles={loadArticles}
              />
            )}
          </main>

          {/* Bottom Navigation Bar */}
          <BottomNav
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            bookmarksCount={bookmarks.length}
          />
        </div>
      </AndroidFrame>

      {/* Article Detail View Modal */}
      {selectedArticle && (
        <NewsDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={isArticleBookmarked(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          fontSize={settings.fontSize}
          relatedArticles={articles.filter(
            (a) =>
              a.id !== selectedArticle.id && a.category === selectedArticle.category
          )}
          onSelectRelated={(art) => setSelectedArticle(art)}
        />
      )}

      {/* Flutter & Dart Project Source Modal */}
      <FlutterCodeModal
        isOpen={isFlutterModalOpen}
        onClose={() => setIsFlutterModalOpen(false)}
      />
    </div>
  );
}
