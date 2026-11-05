export type NewsCategory = 
  | 'India'
  | 'World'
  | 'Technology'
  | 'Sports'
  | 'Business'
  | 'Entertainment'
  | 'Education';

export interface NewsSource {
  id: string | null;
  name: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: NewsSource;
  author: string | null;
  category: NewsCategory;
  readTime: string;
  isBreaking?: boolean;
  isTrending?: boolean;
  viewsCount?: number;
}

export type TabType = 'home' | 'categories' | 'search' | 'bookmarks' | 'settings';

export type FilterType = 'all' | 'trending' | 'latest' | 'popular';

export interface AppSettings {
  darkMode: boolean;
  apiKey: string;
  fontSize: 'small' | 'medium' | 'large';
  autoRefresh: boolean;
  notificationsEnabled: boolean;
  viewMode: 'phone' | 'fluid'; // Android phone frame vs Fullscreen responsive
}
