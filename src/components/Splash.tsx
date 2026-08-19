import React from 'react';
import { ZytoxLogo } from './Logo';

interface SplashProps {
  onDismiss: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onDismiss }) => {
  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-50 bg-[#0D0D0D] flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer"
    >
      <div className="mb-6 flex flex-col items-center">
        <ZytoxLogo size={80} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight text-white uppercase">
          Zytox Recorder
        </h1>
        <p className="text-xs text-[#888888] tracking-widest mt-1 font-mono uppercase">
          Low-Hardware Engineered • Zero GPU Overhead
        </p>
      </div>

      <div className="w-64 bg-[#171717] border border-[#222222] p-3 text-left font-mono text-[11px] text-[#A3A3A3] space-y-1.5">
        <div className="flex justify-between">
          <span>TARGET GPU:</span>
          <span className="text-[#9E7FFF]">INTEL HD GRAPHICS</span>
        </div>
        <div className="flex justify-between">
          <span>ENCODER:</span>
          <span className="text-[#10B981]">INTEL QSV (ZERO-COPY)</span>
        </div>
        <div className="flex justify-between">
          <span>RAM TARGET:</span>
          <span className="text-white">{"< 25 MB"}</span>
        </div>
        <div className="flex justify-between">
          <span>IDLE CPU:</span>
          <span className="text-white">{"< 0.5%"}</span>
        </div>
      </div>

      <button
        onClick={onDismiss}
        className="mt-8 px-6 py-2 bg-[#262626] border border-[#333333] hover:border-[#9E7FFF] text-white text-xs font-mono uppercase tracking-wider transition-none"
      >
        Launch Dashboard
      </button>

      <span className="mt-4 text-[10px] text-[#555555] font-mono">
        Click anywhere to continue
      </span>
    </div>
  );
};
