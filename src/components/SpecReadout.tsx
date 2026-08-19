import React from 'react';
import { Cpu, HardDrive } from 'lucide-react';
import { HardwareStatus } from '../types';

interface SpecReadoutProps {
  status: HardwareStatus | null;
}

export const SpecReadout: React.FC<SpecReadoutProps> = ({ status }) => {
  if (!status) return null;

  return (
    <div className="bg-[#121212] border border-[#222222] p-3 text-xs font-mono select-none space-y-2">
      <div className="flex items-center justify-between text-[#888888] border-b border-[#1F1F1F] pb-1.5">
        <span className="flex items-center space-x-1 text-[11px] uppercase tracking-wider text-[#A3A3A3]">
          <Cpu size={13} className="text-[#9E7FFF]" />
          <span>Low-End System Readout</span>
        </span>
        <span className="text-[10px] text-[#10B981] font-semibold">
          OPTIMIZED
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-[#171717] p-2 border border-[#222222]">
          <div className="text-[#777777] text-[10px]">ENCODER ENGINE</div>
          <div className="text-white font-medium truncate mt-0.5">
            {status.encoder_active}
          </div>
        </div>

        <div className="bg-[#171717] p-2 border border-[#222222]">
          <div className="text-[#777777] text-[10px]">PROCESS PRIORITY</div>
          <div className="text-[#38BDF8] font-medium truncate mt-0.5">
            {status.process_priority}
          </div>
        </div>

        <div className="bg-[#171717] p-2 border border-[#222222]">
          <div className="text-[#777777] text-[10px]">APP RAM FOOTPRINT</div>
          <div className="text-white font-medium mt-0.5">
            {status.memory_mb.toFixed(1)} MB / 25.0 MB Target
          </div>
        </div>

        <div className="bg-[#171717] p-2 border border-[#222222]">
          <div className="text-[#777777] text-[10px]">CPU OVERHEAD</div>
          <div className="text-white font-medium mt-0.5">
            {status.cpu_percent.toFixed(1)}% Usage
          </div>
        </div>
      </div>

      <div className="text-[10px] text-[#777777] bg-[#0A0A0A] p-2 border border-[#1A1A1A] flex items-center justify-between">
        <span className="flex items-center space-x-1">
          <HardDrive size={11} className="text-[#F59E0B]" />
          <span>I/O LAG PREVENT:</span>
        </span>
        <span className="text-[#E5E5E5]">{status.buffer_mode}</span>
      </div>
    </div>
  );
};
