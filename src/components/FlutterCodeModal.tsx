import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Smartphone, Download, Layers } from 'lucide-react';

interface FlutterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterCodeModal: React.FC<FlutterCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'main' | 'api' | 'model' | 'home' | 'detail' | 'pubspec'>('main');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const flutterCodeSnippets = {
    main: `// lib/main.dart
// Sahil News - Android News App
// Developed for Android Studio using Flutter & Dart
// Team Size: 3 Students (Lead: Shaik Sahil)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'screens/home_screen.dart';
import 'services/news_service.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => NewsProvider()..fetchHeadlines()),
      ],
      child: const SahilNewsApp(),
    ),
  );
}

class SahilNewsApp extends StatelessWidget {
  const SahilNewsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sahil News',
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.system,
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: const Color(0xFFDC2626), // Crimson Red
        brightness: Brightness.light,
        fontFamily: 'PlusJakartaSans',
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: const Color(0xFFDC2626),
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF090D16),
        fontFamily: 'PlusJakartaSans',
      ),
      home: const SplashScreenWrapper(),
    );
  }
}

class SplashScreenWrapper extends StatefulWidget {
  const SplashScreenWrapper({super.key});

  @override
  State<SplashScreenWrapper> createState() => _SplashScreenWrapperState();
}

class _SplashScreenWrapperState extends State<SplashScreenWrapper> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const HomeScreen()),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090D16),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFFDC2626),
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  BoxShadow(
                    color: Colors.red.withOpacity(0.4),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  )
                ],
              ),
              child: const Icon(Icons.newspaper, color: Colors.white, size: 48),
            ),
            const SizedBox(height: 24),
            const Text(
              'Sahil News',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                letterSpacing: -0.5,
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Truth · Speed · Integrity',
              style: TextStyle(fontSize: 13, color: Colors.grey),
            ),
            const SizedBox(height: 32),
            const SizedBox(
              width: 32,
              height: 32,
              child: CircularProgressIndicator(
                strokeWidth: 2.5,
                color: Color(0xFFDC2626),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,

    api: `// lib/services/news_service.dart
// Sahil News - NewsAPI Integration Service
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../models/article.dart';

class NewsProvider with ChangeNotifier {
  static const String _baseUrl = 'https://newsapi.org/v2';
  String apiKey = 'YOUR_NEWS_API_KEY'; // Insert key from newsapi.org
  
  List<Article> articles = [];
  List<Article> bookmarks = [];
  bool isLoading = false;
  String? errorMessage;
  String currentCategory = 'India';

  Future<void> fetchHeadlines({String? category, String? query}) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    try {
      Uri uri;
      if (query != null && query.isNotEmpty) {
        uri = Uri.parse('$_baseUrl/everything?q=$query&sortBy=publishedAt&apiKey=$apiKey');
      } else {
        final cat = category ?? currentCategory;
        if (cat == 'India') {
          uri = Uri.parse('$_baseUrl/top-headlines?country=in&apiKey=$apiKey');
        } else {
          uri = Uri.parse('$_baseUrl/top-headlines?category=\${cat.toLowerCase()}&apiKey=$apiKey');
        }
      }

      final response = await http.get(uri);
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final List rawArticles = data['articles'] ?? [];
        articles = rawArticles
            .where((item) => item['title'] != null && item['title'] != '[Removed]')
            .map((item) => Article.fromJson(item, category ?? currentCategory))
            .toList();
      } else {
        errorMessage = 'Failed to fetch news from NewsAPI. Status: \${response.statusCode}';
      }
    } catch (e) {
      errorMessage = 'Network connection error: \$e';
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  void toggleBookmark(Article article) {
    if (bookmarks.any((item) => item.id == article.id)) {
      bookmarks.removeWhere((item) => item.id == article.id);
    } else {
      bookmarks.add(article);
    }
    notifyListeners();
  }

  bool isBookmarked(String id) {
    return bookmarks.any((item) => item.id == id);
  }
}`,

    model: `// lib/models/article.dart
// Article data model
class Article {
  final String id;
  final String title;
  final String description;
  final String content;
  final String url;
  final String urlToImage;
  final String publishedAt;
  final String sourceName;
  final String author;
  final String category;

  Article({
    required this.id,
    required this.title,
    required this.description,
    required this.content,
    required this.url,
    required this.urlToImage,
    required this.publishedAt,
    required this.sourceName,
    required this.author,
    required this.category,
  });

  factory Article.fromJson(Map<String, dynamic> json, String category) {
    return Article(
      id: json['url'] ?? UniqueKey().toString(),
      title: json['title'] ?? 'No Headline Available',
      description: json['description'] ?? '',
      content: json['content'] ?? json['description'] ?? '',
      url: json['url'] ?? '',
      urlToImage: json['urlToImage'] ?? 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
      publishedAt: json['publishedAt'] ?? DateTime.now().toIso8601String(),
      sourceName: json['source']?['name'] ?? 'Sahil News Wire',
      author: json['author'] ?? 'News Bureau',
      category: category,
    );
  }
}`,

    home: `// lib/screens/home_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/news_service.dart';
import 'details_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  final categories = [
    'India', 'World', 'Technology', 'Sports', 'Business', 'Entertainment', 'Education'
  ];

  @override
  Widget build(BuildContext context) {
    final newsProvider = Provider.of<NewsProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Sahil News', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // Open search delegate
            },
          ),
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => newsProvider.fetchHeadlines(),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () => newsProvider.fetchHeadlines(),
        child: Column(
          children: [
            // Category Chips Bar
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              child: Row(
                children: categories.map((cat) {
                  final isSelected = newsProvider.currentCategory == cat;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: FilterChip(
                      label: Text(cat),
                      selected: isSelected,
                      onSelected: (selected) {
                        newsProvider.currentCategory = cat;
                        newsProvider.fetchHeadlines(category: cat);
                      },
                    ),
                  );
                }).toList(),
              ),
            ),
            // News List Feed
            Expanded(
              child: newsProvider.isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : ListView.builder(
                      itemCount: newsProvider.articles.length,
                      itemBuilder: (context, index) {
                        final article = newsProvider.articles[index];
                        return ListTile(
                          leading: ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Image.network(
                              article.urlToImage,
                              width: 80,
                              height: 80,
                              fit: BoxFit.cover,
                              errorBuilder: (_, __, ___) => const Icon(Icons.broken_image),
                            ),
                          ),
                          title: Text(article.title, maxLines: 2, overflow: TextOverflow.ellipsis),
                          subtitle: Text('\${article.sourceName} · \${article.category}'),
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => DetailsScreen(article: article),
                              ),
                            );
                          },
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.category), label: 'Categories'),
          BottomNavigationBarItem(icon: Icon(Icons.bookmark), label: 'Bookmarks'),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Settings'),
        ],
      ),
    );
  }
}`,

    detail: `// lib/screens/details_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/article.dart';
import '../services/news_service.dart';

class DetailsScreen extends StatelessWidget {
  final Article article;
  const DetailsScreen({super.key, required this.article});

  @override
  Widget build(BuildContext context) {
    final newsProvider = Provider.of<NewsProvider>(context);
    final isSaved = newsProvider.isBookmarked(article.id);

    return Scaffold(
      appBar: AppBar(
        title: Text(article.sourceName),
        actions: [
          IconButton(
            icon: Icon(isSaved ? Icons.bookmark : Icons.bookmark_border),
            onPressed: () => newsProvider.toggleBookmark(article),
          ),
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {
              // Share functionality
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: Image.network(
                article.urlToImage,
                width: double.infinity,
                height: 220,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => const Icon(Icons.broken_image, size: 60),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              article.title,
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'By \${article.author} · \${article.publishedAt}',
              style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
            ),
            const Divider(height: 32),
            Text(
              article.description,
              style: const TextStyle(fontSize: 16, fontStyle: FontStyle.italic),
            ),
            const SizedBox(height: 16),
            Text(
              article.content,
              style: const TextStyle(fontSize: 15, height: 1.6),
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: () async {
                final uri = Uri.parse(article.url);
                if (await canLaunchUrl(uri)) {
                  await launchUrl(uri);
                }
              },
              icon: const Icon(Icons.open_in_new),
              label: const Text('Read Full Article on Web'),
            ),
          ],
        ),
      ),
    );
  }
}`,

    pubspec: `# pubspec.yaml
name: sahil_news
description: "Sahil News - Modern Android News App for Academic Project"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0
  provider: ^6.1.2
  shared_preferences: ^2.2.2
  url_launcher: ^6.2.5
  intl: ^0.19.0
  cached_network_image: ^3.3.1
  flutter_spinkit: ^5.2.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(flutterCodeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Flutter & Dart Android Codebase</span>
                <span className="bg-red-500/20 text-red-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-red-500/30">
                  Android Studio Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Sahil News · 3 Students Project · Production-ready Flutter structure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied File!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* File Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-950 border-b border-slate-800 overflow-x-auto no-scrollbar">
          {[
            { id: 'main', label: 'lib/main.dart' },
            { id: 'api', label: 'lib/services/news_service.dart' },
            { id: 'model', label: 'lib/models/article.dart' },
            { id: 'home', label: 'lib/screens/home_screen.dart' },
            { id: 'detail', label: 'lib/screens/details_screen.dart' },
            { id: 'pubspec', label: 'pubspec.yaml' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-red-400 font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Content Viewport */}
        <div className="p-4 flex-1 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed selection:bg-red-600 selection:text-white">
          <pre className="overflow-x-auto whitespace-pre font-mono">
            <code>{flutterCodeSnippets[activeTab]}</code>
          </pre>
        </div>

        {/* Modal Footer Notes */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Target IDE: Android Studio / VS Code · Flutter SDK &ge; 3.0</span>
          <span>Designed for Shaik Sahil & Academic Student Team</span>
        </div>
      </div>
    </div>
  );
};
