import React from 'react';
import { RecorderSettings } from '../types';
import { Save, ArrowLeft, Folder, Cpu, Mic, Monitor } from 'lucide-react';

interface SettingsProps {
  settings: RecorderSettings;
  setSettings: React.Dispatch<React.SetStateAction<RecorderSettings>>;
  onSave: () => void;
  onBack: () => void;
}

export const SettingsPanel: React.FC<SettingsProps> = ({
  settings,
  setSettings,
  onSave,
  onBack,
}) => {
  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#2F2F2F] pb-3">
        <button
          onClick={onBack}
          className="text-[#A3A3A3] hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={14} /> BACK TO DASHBOARD
        </button>
        <button
          onClick={onSave}
          className="bg-[#9E7FFF] hover:bg-[#8b62ff] text-black font-bold px-4 py-2 rounded flex items-center gap-1.5 transition-colors"
        >
          <Save size={14} /> SAVE CONFIGURATION
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Directory & Output */}
        <div className="bg-[#171717] border border-[#2F2F2F] rounded-lg p-4 space-y-3">
          <div className="text-[#38bdf8] font-bold flex items-center gap-2 uppercase">
            <Folder size={14} /> Output Storage
          </div>
          <div className="space-y-1">
            <label className="text-[#888] text-[10px] block">TARGET RECORDING DIRECTORY</label>
            <input
              type="text"
              value={settings.output_dir}
              onChange={(e) =>
                setSettings({ ...settings, output_dir: e.target.value })
              }
              className="w-full bg-[#262626] border border-[#2F2F2F] text-white px-3 py-2 rounded font-mono text-xs focus:outline-none focus:border-[#38bdf8]"
            />
          </div>
        </div>

        {/* Video & Encoding */}
        <div className="bg-[#171717] border border-[#2F2F2F] rounded-lg p-4 space-y-3">
          <div className="text-[#9E7FFF] font-bold flex items-center gap-2 uppercase">
            <Monitor size={14} /> Video Stream Config
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#888] text-[10px] block">RESOLUTION</label>
              <select
                value={settings.resolution}
                onChange={(e) =>
                  setSettings({ ...settings, resolution: e.target.value })
                }
                className="w-full bg-[#262626] border border-[#2F2F2F] text-white px-2 py-2 rounded font-mono text-xs"
              >
                <option value="1280x720">1280x720 (720p Recommended)</option>
                <option value="1920x1080">1920x1080 (1080p High Load)</option>
              </select>
            </div>
            <div>
              <label className="text-[#888] text-[10px] block">TARGET FPS</label>
              <select
                value={settings.fps}
                onChange={(e) =>
                  setSettings({ ...settings, fps: Number(e.target.value) })
                }
                className="w-full bg-[#262626] border border-[#2F2F2F] text-white px-2 py-2 rounded font-mono text-xs"
              >
                <option value={30}>30 FPS (Low CPU/GPU)</option>
                <option value={60}>60 FPS (Higher Overhead)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#888] text-[10px] block">BITRATE (KBPS)</label>
            <input
              type="number"
              value={settings.bitrate_kbps}
              onChange={(e) =>
                setSettings({ ...settings, bitrate_kbps: Number(e.target.value) })
              }
              className="w-full bg-[#262626] border border-[#2F2F2F] text-white px-3 py-2 rounded font-mono text-xs"
            />
          </div>
        </div>

        {/* Hardware Acceleration */}
        <div className="bg-[#171717] border border-[#2F2F2F] rounded-lg p-4 space-y-3">
          <div className="text-[#10b981] font-bold flex items-center gap-2 uppercase">
            <Cpu size={14} /> Hardware Acceleration
          </div>
          <div className="flex items-center justify-between bg-[#262626] p-3 rounded">
            <div>
              <div className="text-white font-bold">Intel QuickSync (QSV)</div>
              <div className="text-[#888] text-[10px]">Zero GPU 3D engine impact</div>
            </div>
            <input
              type="checkbox"
              checked={settings.use_qsv_hardware}
              onChange={(e) =>
                setSettings({ ...settings, use_qsv_hardware: e.target.checked })
              }
              className="w-4 h-4 accent-[#10b981]"
            />
          </div>
        </div>

        {/* Audio Configuration */}
        <div className="bg-[#171717] border border-[#2F2F2F] rounded-lg p-4 space-y-3">
          <div className="text-[#f472b6] font-bold flex items-center gap-2 uppercase">
            <Mic size={14} /> Audio Isolation
          </div>
          <div className="flex items-center justify-between bg-[#262626] p-3 rounded">
            <div>
              <div className="text-white font-bold">Separate Audio Tracks</div>
              <div className="text-[#888] text-[10px]">Track 1: Desktop, Track 2: Mic</div>
            </div>
            <input
              type="checkbox"
              checked={settings.separate_audio_tracks}
              onChange={(e) =>
                setSettings({ ...settings, separate_audio_tracks: e.target.checked })
              }
              className="w-4 h-4 accent-[#f472b6]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
