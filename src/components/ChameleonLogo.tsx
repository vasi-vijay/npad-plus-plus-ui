import React from 'react';

interface ChameleonLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const ChameleonLogo: React.FC<ChameleonLogoProps> = ({
  className = '',
  size = 36,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center rounded-xl overflow-hidden shadow-sm border border-emerald-900/20 group shrink-0"
      >
        <img
          src="/assets/aistudio/CodePadPlusPlus-AppIcon-1024_cbf87c9e.png"
          alt="NPad++ Logo"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Graceful SVG fallback if image cannot load
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
      </div>

      {showText && (
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            NPad<span className="text-emerald-500 font-extrabold">++</span>
          </span>
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60">
            macOS
          </span>
        </div>
      )}
    </div>
  );
};
