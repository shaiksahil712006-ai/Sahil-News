import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  ExternalLink,
  Clock,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Check,
  Calendar,
  User,
  Newspaper,
  BookOpen,
} from 'lucide-react';
import { NewsArticle } from '../types/news';

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: NewsArticle) => void;
  fontSize: 'small' | 'medium' | 'large';
  relatedArticles: NewsArticle[];
  onSelectRelated: (article: NewsArticle) => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  fontSize,
  relatedArticles,
  onSelectRelated,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesisAvailable(true);
    }
    // Stop any ongoing speech when modal closes or article changes
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article]);

  if (!article) return null;

  const handleToggleSpeech = () => {
    if (!speechSynthesisAvailable) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. Published by ${article.source.name}. ${article.description}. ${article.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url || window.location.href,
        });
        return;
      } catch (err) {
        // user cancelled or share failed, fallback to menu
      }
    }
    setShowShareMenu(!showShareMenu);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(article.url || window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(article.publishedAt));

  const contentFontSizeClass =
    fontSize === 'small'
      ? 'text-sm leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg leading-loose'
      : 'text-base leading-relaxed';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-center overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 min-h-screen sm:min-h-0 sm:my-6 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Sticky Detail Top Bar */}
        <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Back to news list"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-1.5">
            {/* Audio Read-Out Button */}
            {speechSynthesisAvailable && (
              <button
                onClick={handleToggleSpeech}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={isPlayingAudio ? 'Stop Reading' : 'Listen to Article (Audio Read Out)'}
                aria-label="Listen to Article"
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
              aria-label="Toggle Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer relative"
              title="Share Article"
              aria-label="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Share Dropdown Drawer */}
        {showShareMenu && (
          <div className="bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Share Dispatch:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-800 dark:text-white font-medium hover:bg-slate-100 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : null}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + (article.url || window.location.href))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(article.url || window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 dark:bg-black hover:bg-slate-800 text-white rounded-lg font-medium"
              >
                X / Twitter
              </a>
            </div>
          </div>
        )}

        {/* Article Cover Image */}
        <div className="relative w-full aspect-16/9 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          {!imgError && article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-800 flex flex-col items-center justify-center text-slate-400 p-6">
              <Newspaper className="w-12 h-12 text-slate-600 mb-2" />
              <span className="text-sm font-bold uppercase tracking-wider text-slate-300">
                {article.category} Report
              </span>
              <span className="text-xs text-slate-500">{article.source.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

          {/* Category Tag on Image */}
          <div className="absolute bottom-3 left-4">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
              {article.category}
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col gap-5">
          {/* Headline */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-serif-news">
            {article.title}
          </h1>

          {/* Clean unboxed Metadata Row */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-red-600 dark:text-red-400">
              {article.source.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>By {article.author || 'Sahil News Bureau'}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          {/* Audio Player Banner */}
          {speechSynthesisAvailable && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleToggleSpeech}
                  className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-xs cursor-pointer"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {isPlayingAudio ? 'Now Reading Article Out Loud' : 'Listen to this Article'}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Speech synthesis audio player
                  </div>
                </div>
              </div>

              {isPlayingAudio && (
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-red-500 animate-pulse rounded-full" />
                  <span className="w-1 h-5 bg-red-600 animate-pulse delay-75 rounded-full" />
                  <span className="w-1 h-2 bg-red-400 animate-pulse delay-150 rounded-full" />
                </div>
              )}
            </div>
          )}

          {/* Lead Description (Pull Quote Style) */}
          <div className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 leading-relaxed italic border-l-2 border-red-600 pl-4 py-1">
            {article.description}
          </div>

          {/* Full Narrative Content */}
          <div className={`space-y-4 text-slate-800 dark:text-slate-200 font-serif-news ${contentFontSizeClass}`}>
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/60 mt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-red-500" />
              <span>Key Editorial Highlights</span>
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Verified coverage filed from regional bureaus and international wires.</li>
              <li>Fact-checked under Sahil News integrity standards for accuracy and objectivity.</li>
              <li>Bookmark saved locally to read on offline Android devices anytime.</li>
            </ul>
          </div>

          {/* Original Source Link Button */}
          {article.url && article.url !== '#' && (
            <div className="pt-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Read Original Full Story on {article.source.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Related Dispatches in {article.category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedArticles.slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer border border-slate-200/80 dark:border-slate-700/60 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">
                      {rel.source.name}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mt-0.5">
                      {rel.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
