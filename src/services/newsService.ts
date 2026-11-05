import { NewsArticle, NewsCategory, FilterType } from '../types/news';
import { INITIAL_ARTICLES } from '../data/mockNews';

const STORAGE_BOOKMARKS_KEY = 'sahil_news_bookmarks';
const STORAGE_API_KEY = 'sahil_news_api_key';
const STORAGE_SETTINGS_KEY = 'sahil_news_settings';

export class NewsService {
  // Bookmarks Storage
  static getBookmarks(): NewsArticle[] {
    try {
      const data = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static isBookmarked(articleId: string): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.some((item) => item.id === articleId);
  }

  static toggleBookmark(article: NewsArticle): boolean {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.findIndex((item) => item.id === article.id);
    let isNowSaved = false;

    if (index >= 0) {
      bookmarks.splice(index, 1);
      isNowSaved = false;
    } else {
      bookmarks.unshift(article);
      isNowSaved = true;
    }

    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Could not save bookmark to localStorage', e);
    }

    return isNowSaved;
  }

  static clearAllBookmarks(): void {
    try {
      localStorage.removeItem(STORAGE_BOOKMARKS_KEY);
    } catch (e) {
      console.warn(e);
    }
  }

  // API Key Storage
  static getApiKey(): string {
    return localStorage.getItem(STORAGE_API_KEY) || '';
  }

  static saveApiKey(key: string): void {
    localStorage.setItem(STORAGE_API_KEY, key.trim());
  }

  // Test connection to NewsAPI
  static async testApiKey(apiKey: string): Promise<{ success: boolean; message: string; totalResults?: number }> {
    if (!apiKey.trim()) {
      return { success: false, message: 'Please enter a valid API key.' };
    }

    try {
      // First try via our Vite proxy middleware
      const proxyUrl = `/api/news?endpoint=top-headlines&country=in&pageSize=5&apiKey=${encodeURIComponent(apiKey.trim())}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();

      if (response.ok && data.status === 'ok') {
        return {
          success: true,
          message: `Connected successfully! Retrieved ${data.totalResults} live headlines.`,
          totalResults: data.totalResults,
        };
      }

      // If proxy responded with error
      if (data.message) {
        return {
          success: false,
          message: data.message,
        };
      }

      return {
        success: false,
        message: 'Unable to verify API key with NewsAPI.org.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Network error while contacting NewsAPI server.',
      };
    }
  }

  // Fetch articles
  static async fetchArticles(options: {
    category?: NewsCategory | 'All';
    filter?: FilterType;
    searchQuery?: string;
    apiKey?: string;
  }): Promise<{ articles: NewsArticle[]; isLive: boolean; error?: string }> {
    const { category = 'All', filter = 'all', searchQuery = '', apiKey } = options;
    const key = apiKey !== undefined ? apiKey : this.getApiKey();

    // If an API key is provided, attempt live fetch from NewsAPI
    if (key.trim()) {
      try {
        let endpoint = 'top-headlines';
        const params = new URLSearchParams();
        params.set('apiKey', key.trim());

        if (searchQuery.trim()) {
          endpoint = 'everything';
          params.set('q', searchQuery.trim());
          params.set('sortBy', 'publishedAt');
          params.set('pageSize', '25');
        } else {
          // Top headlines endpoint
          if (category === 'India') {
            params.set('country', 'in');
          } else if (category === 'World') {
            params.set('category', 'general');
          } else if (category === 'Technology') {
            params.set('category', 'technology');
          } else if (category === 'Sports') {
            params.set('category', 'sports');
          } else if (category === 'Business') {
            params.set('category', 'business');
          } else if (category === 'Entertainment') {
            params.set('category', 'entertainment');
          } else if (category === 'Education') {
            // NewsAPI doesn't have an education top-headline category, so query everything
            endpoint = 'everything';
            params.set('q', 'education OR university OR CBSE OR IIT OR exam');
            params.set('sortBy', 'relevancy');
          } else {
            params.set('country', 'in');
          }
          params.set('pageSize', '25');
        }

        const proxyUrl = `/api/news?endpoint=${endpoint}&${params.toString()}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (response.ok && data.status === 'ok' && Array.isArray(data.articles) && data.articles.length > 0) {
          const liveArticles: NewsArticle[] = data.articles
            .filter((art: any) => art.title && art.title !== '[Removed]')
            .map((art: any, idx: number) => {
              const assignedCategory: NewsCategory = 
                category !== 'All' ? category : 
                (art.title.toLowerCase().includes('cricket') || art.title.toLowerCase().includes('ipl') ? 'Sports' :
                 art.title.toLowerCase().includes('ai') || art.title.toLowerCase().includes('tech') ? 'Technology' :
                 art.title.toLowerCase().includes('rupee') || art.title.toLowerCase().includes('market') ? 'Business' : 'India');

              return {
                id: `live-${idx}-${encodeURIComponent(art.url || art.title).slice(0, 20)}`,
                title: art.title,
                description: art.description || 'Click to read full coverage on Sahil News.',
                content: art.content || art.description || 'Full investigative coverage available via source dispatch.',
                url: art.url || '#',
                urlToImage: art.urlToImage || '/src/assets/images/hero_breaking_news_1793885196210.jpg',
                publishedAt: art.publishedAt || new Date().toISOString(),
                source: {
                  id: art.source?.id || null,
                  name: art.source?.name || 'NewsAPI Dispatch',
                },
                author: art.author || 'Sahil News Bureau',
                category: assignedCategory,
                readTime: `${Math.max(2, Math.min(8, Math.ceil((art.description?.length || 200) / 120)))} min read`,
                isBreaking: idx < 2,
                isTrending: idx >= 2 && idx < 6,
                viewsCount: 1000 + Math.floor(Math.random() * 25000),
              };
            });

          return { articles: liveArticles, isLive: true };
        } else if (data.status === 'error') {
          // If error returned (e.g. rateLimitExceeded, apiKeyInvalid), fall back cleanly
          console.warn('NewsAPI error:', data.message);
          return {
            articles: this.filterLocalArticles(category, filter, searchQuery),
            isLive: false,
            error: data.message,
          };
        }
      } catch (err: any) {
        console.warn('NewsAPI fetch failed, falling back to curated feed:', err);
      }
    }

    // Default to rich curated offline/instant feed
    const filtered = this.filterLocalArticles(category, filter, searchQuery);
    return {
      articles: filtered,
      isLive: false,
    };
  }

  private static filterLocalArticles(
    category: NewsCategory | 'All',
    filter: FilterType,
    searchQuery: string
  ): NewsArticle[] {
    let result = [...INITIAL_ARTICLES];

    // Filter by category
    if (category !== 'All') {
      result = result.filter((art) => art.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.description.toLowerCase().includes(q) ||
          art.content.toLowerCase().includes(q) ||
          art.source.name.toLowerCase().includes(q) ||
          (art.author && art.author.toLowerCase().includes(q))
      );
    }

    // Filter by tab filter
    if (filter === 'trending') {
      result = result.filter((art) => art.isTrending || (art.viewsCount && art.viewsCount > 12000));
    } else if (filter === 'latest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (filter === 'popular') {
      result.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    }

    return result;
  }
}
