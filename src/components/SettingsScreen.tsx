import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Key,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Code2,
  Users,
  Smartphone,
  Eye,
  Type,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { AppSettings } from '../types/news';
import { NewsService } from '../services/newsService';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onReplaySplash: () => void;
  onOpenFlutterModal: () => void;
  onRefreshArticles: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onReplaySplash,
  onOpenFlutterModal,
  onRefreshArticles,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(settings.apiKey || '');
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [testResult, setTestResult] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleSaveApiKey = () => {
    onUpdateSettings({ apiKey: apiKeyInput.trim() });
    NewsService.saveApiKey(apiKeyInput.trim());
    setTestResult({
      success: true,
      message: 'API key saved to storage!',
    });
    setTimeout(() => {
      onRefreshArticles();
    }, 500);
  };

  const handleTestApiKey = async () => {
    if (!apiKeyInput.trim()) {
      setTestResult({
        success: false,
        message: 'Please provide a valid NewsAPI.org key to test.',
      });
      return;
    }

    setIsTestingKey(true);
    setTestResult(null);

    const result = await NewsService.testApiKey(apiKeyInput.trim());
    setIsTestingKey(false);
    setTestResult(result);
    if (result.success) {
      onUpdateSettings({ apiKey: apiKeyInput.trim() });
      NewsService.saveApiKey(apiKeyInput.trim());
    }
  };

  return (
    <div className="flex-1 pb-16 px-3 sm:px-4 pt-3 flex flex-col gap-4 max-w-4xl mx-auto w-full transition-colors">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-0.5">
          Settings & Preferences
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Configure appearance, live News API credentials, and project information
        </p>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Appearance & Theme
        </h3>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-amber-400">
              {settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                {settings.darkMode ? 'Dark Theme Active' : 'Light Theme Active'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Optimized for comfortable reading in all lighting
              </div>
            </div>
          </div>

          <button
            onClick={() => onUpdateSettings({ darkMode: !settings.darkMode })}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              settings.darkMode ? 'bg-red-600' : 'bg-slate-300'
            }`}
            aria-label="Toggle dark mode"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                settings.darkMode ? 'translate-x-6.5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Font Size Selector */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Type className="w-3.5 h-3.5 text-red-500" />
              <span>Reader Text Size</span>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase">{settings.fontSize}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => onUpdateSettings({ fontSize: size })}
                className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  settings.fontSize === size
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News API Configuration Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-red-500" />
            <span>News API (https://newsapi.org)</span>
          </h3>

          <a
            href="https://newsapi.org/register"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-red-600 dark:text-red-400 hover:underline font-semibold"
          >
            <span>Get Free Key</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Sahil News can query real-time international and national headlines directly from{' '}
          <strong className="text-slate-900 dark:text-white">NewsAPI.org</strong>. If left blank, the app uses our live curated bureau feed.
        </p>

        <div className="space-y-2 mt-1">
          <div className="relative">
            <input
              type="text"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Paste NewsAPI Key (e.g. 748a03c...)"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/40"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleSaveApiKey}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Save Key
            </button>

            <button
              onClick={handleTestApiKey}
              disabled={isTestingKey}
              className="px-3.5 py-2 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isTestingKey ? (
                <>
                  <RotateCcw className="w-3 h-3 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Test Connection</span>
                </>
              )}
            </button>
          </div>

          {/* Test Status feedback */}
          {testResult && (
            <div
              className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                  : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
              )}
              <span className="font-medium">{testResult.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Flutter & Android Project Info */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-red-500" />
          <span>Project Specifications & Credits</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">App Name</span>
            <span className="font-bold text-slate-900 dark:text-white">Sahil News</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Platform</span>
            <span className="font-bold text-slate-900 dark:text-white">Android (Flutter / Dart)</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Target IDE</span>
            <span className="font-bold text-slate-900 dark:text-white">Android Studio</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Team Size</span>
            <span className="font-bold text-slate-900 dark:text-white">3 Students</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            onClick={onOpenFlutterModal}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span>View Flutter / Dart Source Code</span>
          </button>

          <button
            onClick={onReplaySplash}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-red-500" />
            <span>Replay Splash</span>
          </button>
        </div>
      </div>
    </div>
  );
};
