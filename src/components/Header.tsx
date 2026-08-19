import React from 'react';
import { Sliders, Activity, Shield } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dash' | 'settings';
  setActiveTab: (tab: 'dash' | 'settings') => void;
  isRecording: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isRecording,
}) => {
  return (
    <header className="bg-[#171717] border-b border-[#2F2F2F] px-4 py-3 flex items-center justify-between select-none">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded bg-[#9E7FFF] flex items-center justify-center font-mono font-black text-black text-lg">
          Z
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-mono font-bold text-sm tracking-wider text-white">
              ZYTOX RECORDER
            </h1>
            <span className="text-[10px] font-mono bg-[#262626] text-[#9E7FFF] px-1.5 py-0.5 rounded border border-[#2F2F2F]">
              v1.0 LOW-HW
            </span>
          </div>
          <p className="text-[10px] font-mono text-[#A3A3A3] flex items-center gap-1">
            <Shield size={10} className="text-[#10b981]" /> Zero-Overhead Intel QSV Engine
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-1 font-mono text-xs">
        <button
          onClick={() => setActiveTab('dash')}
          className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition-colors ${
            activeTab === 'dash'
              ? 'bg-[#262626] text-white border border-[#2F2F2F]'
              : 'text-[#A3A3A3] hover:text-white hover:bg-[#262626]/50'
          }`}
        >
          <Activity size={14} className={isRecording ? 'text-[#ef4444] animate-pulse' : 'text-[#38bdf8]'} />
          <span>DASHBOARD</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#262626] text-white border border-[#2F2F2F]'
              : 'text-[#A3A3A3] hover:text-white hover:bg-[#262626]/50'
          }`}
        >
          <Sliders size={14} className="text-[#9E7FFF]" />
          <span>SETTINGS</span>
        </button>
      </div>
    </header>
  );
};
