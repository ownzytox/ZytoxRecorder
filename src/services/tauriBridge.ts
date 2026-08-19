import { HardwareStatus, RecorderSettings } from '../types';

const isTauri = (): boolean => {
  return typeof window !== 'undefined' && '__TAURI_IPC__' in window;
};

export async function invokeStartRecording(): Promise<string> {
  if (isTauri()) {
    const { invoke } = await import('@tauri-apps/api/tauri');
    return invoke<string>('start_recording');
  }
  return 'Browser Mock: Recording started';
}

export async function invokeStopRecording(): Promise<string> {
  if (isTauri()) {
    const { invoke } = await import('@tauri-apps/api/tauri');
    return invoke<string>('stop_recording');
  }
  return 'Browser Mock: Recording stopped';
}

export async function invokeGetHardwareStatus(): Promise<HardwareStatus> {
  if (isTauri()) {
    const { invoke } = await import('@tauri-apps/api/tauri');
    return invoke<HardwareStatus>('get_hardware_status');
  }
  return {
    encoder_active: 'Intel QSV Active (Zero-Copy DXGI)',
    memory_mb: 12.1,
    cpu_percent: 0.2,
    target_fps_loss: '< 8 FPS Loss Guaranteed',
    buffer_mode: 'RAM Ring Buffer',
    process_priority: 'Below Normal',
  };
}

export async function invokeGetSettings(): Promise<RecorderSettings> {
  if (isTauri()) {
    const { invoke } = await import('@tauri-apps/api/tauri');
    return invoke<RecorderSettings>('get_settings');
  }
  return {
    output_dir: 'C:\\Videos\\ZytoxRecordings',
    resolution: '1280x720',
    fps: 30,
    bitrate_kbps: 3500,
    desktop_audio_device: 'Speakers (Intel HD Audio Loopback)',
    mic_audio_device: 'Realtek High Definition Audio Mic',
    separate_audio_tracks: true,
    use_qsv_hardware: true,
  };
}

export async function invokeSaveSettings(settings: RecorderSettings): Promise<string> {
  if (isTauri()) {
    const { invoke } = await import('@tauri-apps/api/tauri');
    return invoke<string>('save_settings', { newSettings: settings });
  }
  return 'Browser Mock: Settings saved';
}
