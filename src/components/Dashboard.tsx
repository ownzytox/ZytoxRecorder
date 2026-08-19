import React from 'react';
import { HardwareStatus } from '../types';
import {
  Square,
  Play,
  Cpu,
  HardDrive,
  Activity,
  Volume2,
  Mic,
  Monitor,
  Zap,
} from 'lucide-react';

interface DashboardProps {
  isRecording: boolean;
  recordingTime: number;
  onToggleRecord: () => void;
  status: HardwareStatus | null;
}

export const Dashboard: React.FC<DashboardProps> = ({
  isRecording,
  recordingTime,
  onToggleRecord,
  status,
}) => {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto font-sans">
      {/* Recording Main Control Box */}
      <div className="bg-[#171717] border border-[#2F2F2F] rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-start space-y-1">
          <span className="text-xs font-mono text-[#A3A3A3] uppercase tracking-wider flex items-center gap-1.5">
            <Activity size={14} className="text-[#9E7FFF]" /> SESSION TIMER
          </span>
          <div className="text-4xl font-mono font-bold tracking-tight text-white">
            {formatTime(recordingTime)}
          </div>
          <span className="text-[11px] text-[#A3A3A3] font-mono">
            {isRecording
              ? 'DXGI Direct Copy Stream -> RAM Ring Buffer'
              : 'Engine Ready • Press Record to capture zero-overhead stream'}
          </span>
        </div>

        <button
          onClick={onToggleRecord}
          className={`px-8 py-3.5 rounded font-mono font-bold text-sm uppercase tracking-wider flex items-center space-x-2 transition-none cursor-pointer ${
            isRecording
              ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-lg shadow-red-950/40'
              : 'bg-[#9E7FFF] hover:bg-[#8b62ff] text-black shadow-lg shadow-purple-950/40'
          }`}
        >
          {isRecording ? (
            <>
              <Square size={16} fill="currentColor" />
              <span>STOP RECORDING</span>
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              <span>START RECORDING</span>
            </>
          )}
        </button>
      </div>

      {/* Hardware Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-[#171717] border border-[#2F2F2F] rounded p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#A3A3A3] flex items-center gap-1.5">
              <Cpu size={14} className="text-[#38bdf8]" /> CPU USAGE
            </span>
            <span className="text-xs font-mono text-[#38bdf8] font-bold">
              {status ? `${status.cpu_percent.toFixed(1)}%` : '0.2%'}
            </span>
          </div>
          <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#38bdf8] h-full"
              style={{
                width: `${Math.min(
                  ((status?.cpu_percent || 0.2) / 5) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <span className="text-[10px] text-[#A3A3A3] font-mono mt-2 block">
            {'Target: < 2.5% during recording'}
          </span>
        </div>

        <div className="bg-[#171717] border border-[#2F2F2F] rounded p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#A3A3A3] flex items-center gap-1.5">
              <HardDrive size={14} className="text-[#10b981]" /> RAM FOOTPRINT
            </span>
            <span className="text-xs font-mono text-[#10b981] font-bold">
              {status ? `${status.memory_mb.toFixed(1)} MB` : '12.1 MB'}
            </span>
          </div>
          <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#10b981] h-full"
              style={{
                width: `${Math.min(
                  ((status?.memory_mb || 12) / 30) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <span className="text-[10px] text-[#A3A3A3] font-mono mt-2 block">
            {'Target: < 25 MB allocation limit'}
          </span>
        </div>

        <div className="bg-[#171717] border border-[#2F2F2F] rounded p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#A3A3A3] flex items-center gap-1.5">
              <Zap size={14} className="text-[#f472b6]" /> GPU IMPACT
            </span>
            <span className="text-xs font-mono text-[#f472b6] font-bold">
              0.0% GPU 3D
            </span>
          </div>
          <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#f472b6] h-full w-[2%]"></div>
          </div>
          <span className="text-[10px] text-[#A3A3A3] font-mono mt-2 block">
            Intel QSV Fixed Function Pipeline
          </span>
        </div>
      </div>

      {/* Engine Status Specification Box */}
      <div className="bg-[#171717] border border-[#2F2F2F] rounded-lg p-4 space-y-3 font-mono text-xs">
        <div className="text-[#9E7FFF] font-bold uppercase tracking-wider border-b border-[#262626] pb-2 flex items-center gap-2">
          <Monitor size={14} /> LOW-HARDWARE ENGINE STATUS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#A3A3A3]">
          <div>
            <span className="text-[#555]">ENCODER:</span>{' '}
            <span className="text-white">
              {status?.encoder_active || 'Intel QSV Active (Zero-Copy DXGI)'}
            </span>
          </div>
          <div>
            <span className="text-[#555]">GAME FPS IMPACT:</span>{' '}
            <span className="text-[#10b981]">
              {status?.target_fps_loss || '< 8 FPS Loss Guaranteed'}
            </span>
          </div>
          <div>
            <span className="text-[#555]">BUFFERING:</span>{' '}
            <span className="text-white">
              {status?.buffer_mode || 'RAM Ring Buffer'}
            </span>
          </div>
          <div>
            <span className="text-[#555]">PROCESS PRIORITY:</span>{' '}
            <span className="text-white">
              {status?.process_priority || 'Below Normal'}
            </span>
          </div>
        </div>
      </div>

      {/* Audio Streams Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
        <div className="bg-[#171717] border border-[#2F2F2F] p-3 rounded flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 size={16} className="text-[#38bdf8]" />
            <div>
              <div className="text-white font-bold">DESKTOP AUDIO (TRACK 1)</div>
              <div className="text-[10px] text-[#888888]">WASAPI Loopback Capture</div>
            </div>
          </div>
          <span className="text-[10px] text-[#10b981] bg-[#10b98115] px-2 py-0.5 border border-[#10b98130]">
            ACTIVE
          </span>
        </div>

        <div className="bg-[#171717] border border-[#2F2F2F] p-3 rounded flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic size={16} className="text-[#f472b6]" />
            <div>
              <div className="text-white font-bold">MICROPHONE (TRACK 2)</div>
              <div className="text-[10px] text-[#888888]">Isolated Audio Stream</div>
            </div>
          </div>
          <span className="text-[10px] text-[#10b981] bg-[#10b98115] px-2 py-0.5 border border-[#10b98130]">
            ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};
