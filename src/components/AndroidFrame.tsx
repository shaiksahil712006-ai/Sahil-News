import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Smartphone, Monitor } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  viewMode: 'phone' | 'fluid';
  onToggleViewMode: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  viewMode,
  onToggleViewMode,
}) => {
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (viewMode === 'fluid') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center">
        {/* Top Control Bar for View Mode Switching */}
        <div className="w-full bg-slate-900 text-slate-300 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-800 shrink-0 z-40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-white">Sahil News</span>
            <span className="text-slate-400">· Android Flutter Edition</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleViewMode}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-medium transition-colors"
              title="Switch to Mobile Smartphone Device Frame"
            >
              <Smartphone className="w-3.5 h-3.5 text-red-400" />
              <span>Switch to Android Frame</span>
            </button>
          </div>
        </div>

        <div className="w-full max-w-5xl flex-1 flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4 selection:bg-crimson-600">
      {/* Frame Switcher Banner */}
      <div className="mb-3 flex items-center gap-3 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
        <span className="flex items-center gap-1.5 font-medium">
          <Smartphone className="w-3.5 h-3.5 text-red-500" />
          Android 14 Simulator (Pixel 8)
        </span>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <button
          onClick={onToggleViewMode}
          className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline font-semibold cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Responsive View</span>
        </button>
      </div>

      {/* Android Device Outer Bezel */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[95vh] bg-slate-900 dark:bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800/80 shadow-slate-950/40 flex flex-col overflow-hidden border-[4px] border-slate-700/60 dark:border-slate-800">
        {/* Device Screen Inner Wrapper */}
        <div className="relative w-full h-full bg-white dark:bg-slate-950 rounded-[38px] overflow-hidden flex flex-col shadow-inner">
          {/* Android Status Bar */}
          <div className="h-10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md text-slate-900 dark:text-slate-100 flex items-center justify-between px-6 text-xs font-semibold z-30 select-none shrink-0 border-b border-slate-100 dark:border-slate-900">
            {/* Clock */}
            <span className="tabular-nums tracking-tight font-medium text-[13px]">{currentTime}</span>

            {/* Camera Punch Hole */}
            <div className="w-4 h-4 rounded-full bg-slate-950 dark:bg-black border border-slate-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800/80" />
            </div>

            {/* Android Status Icons */}
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="text-[10px] font-bold">5G</span>
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono">98%</span>
                <BatteryMedium className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Device Content Screen */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
            {children}
          </div>

          {/* Android Gesture Bar */}
          <div className="h-4 bg-white/95 dark:bg-slate-950/95 flex items-center justify-center shrink-0 z-30">
            <div className="w-32 h-1 bg-slate-400 dark:bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
