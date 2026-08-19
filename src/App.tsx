import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SettingsPanel } from './components/Settings';
import { HardwareStatus, RecorderSettings } from './types';
import {
  invokeStartRecording,
  invokeStopRecording,
  invokeGetHardwareStatus,
  invokeGetSettings,
  invokeSaveSettings,
} from './services/tauriBridge';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dash' | 'settings'>('dash');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [status, setStatus] = useState<HardwareStatus | null>(null);
  const [settings, setSettings] = useState<RecorderSettings>({
    output_dir: 'C:\\Videos\\ZytoxRecordings',
    resolution: '1280x720',
    fps: 30,
    bitrate_kbps: 3500,
    desktop_audio_device: 'Speakers (Intel HD Audio Loopback)',
    mic_audio_device: 'Realtek High Definition Audio Mic',
    separate_audio_tracks: true,
    use_qsv_hardware: true,
  });

  useEffect(() => {
    invokeGetSettings().then(setSettings);
    invokeGetHardwareStatus().then(setStatus);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
        invokeGetHardwareStatus().then(setStatus);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleToggleRecord = async () => {
    if (isRecording) {
      await invokeStopRecording();
      setIsRecording(false);
    } else {
      await invokeStartRecording();
      setIsRecording(true);
    }
  };

  const handleSaveSettings = async () => {
    await invokeSaveSettings(settings);
    setActiveTab('dash');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans select-none">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isRecording={isRecording}
      />
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dash' ? (
          <Dashboard
            isRecording={isRecording}
            recordingTime={recordingTime}
            onToggleRecord={handleToggleRecord}
            status={status}
          />
        ) : (
          <SettingsPanel
            settings={settings}
            setSettings={setSettings}
            onSave={handleSaveSettings}
            onBack={() => setActiveTab('dash')}
          />
        )}
      </main>
    </div>
  );
};

export default App;
