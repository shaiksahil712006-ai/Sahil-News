import React, { useEffect, useState } from 'react';
import { Newspaper, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onDismiss, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-950 text-white p-6 selection:bg-crimson-600">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.25),rgba(255,255,255,0))] pointer-events-none" />

      {/* Top subtle bar */}
      <div className="w-full flex justify-between items-center text-xs text-slate-400 font-medium tracking-wide pt-4 z-10">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Verified Journalism
        </span>
        <span className="bg-slate-900 border border-slate-800 rounded-md px-2.5 py-1 text-[11px] font-mono text-slate-300">
          Android · Flutter Edition
        </span>
      </div>

      {/* Center Brand Lockup */}
      <div className="flex flex-col items-center text-center z-10 max-w-sm my-auto">
        {/* Animated Logo Shield */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-red-600 via-rose-600 to-indigo-600 p-[2px] shadow-2xl shadow-red-500/20">
            <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-indigo-500/10" />
              <Newspaper className="w-11 h-11 text-red-500 relative z-10 drop-shadow-md" />
              <div className="absolute bottom-1 text-[9px] font-bold tracking-widest text-red-400 font-mono">
                SAHIL
              </div>
            </div>
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute -inset-2 rounded-[28px] border border-red-500/30 animate-pulse pointer-events-none" />
        </div>

        {/* Title & Tagline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Sahil <span className="text-red-500">News</span>
        </h1>
        <p className="text-sm text-slate-400 font-medium tracking-wide mb-3">
          Truth · Speed · Integrity
        </p>

        {/* Categories preview pill row */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-400 max-w-xs mb-8">
          <span>India</span>
          <span className="text-slate-600">·</span>
          <span>World</span>
          <span className="text-slate-600">·</span>
          <span>Tech</span>
          <span className="text-slate-600">·</span>
          <span>Sports</span>
          <span className="text-slate-600">·</span>
          <span>Business</span>
          <span className="text-slate-600">·</span>
          <span>Education</span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-200 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 font-mono">
          Loading live headlines... {progress}%
        </p>
      </div>

      {/* Bottom Footer & Student Credits */}
      <div className="w-full flex flex-col items-center text-center z-10 pb-4 gap-3">
        <button
          onClick={onDismiss}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-white transition-colors active:scale-95 cursor-pointer shadow-lg"
        >
          <span>Enter App</span>
          <ArrowRight className="w-3.5 h-3.5 text-red-400" />
        </button>

        <div className="text-[11px] text-slate-500">
          Developed by <span className="text-slate-300 font-semibold">Shaik Sahil & Student Team</span> (3 Students)
        </div>
      </div>
    </div>
  );
};
