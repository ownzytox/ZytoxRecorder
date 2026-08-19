export interface HardwareStatus {
  encoder_active: string;
  memory_mb: number;
  cpu_percent: number;
  target_fps_loss: string;
  buffer_mode: string;
  process_priority: string;
}

export interface RecorderSettings {
  output_dir: string;
  resolution: string;
  fps: number;
  bitrate_kbps: number;
  desktop_audio_device: string;
  mic_audio_device: string;
  separate_audio_tracks: boolean;
  use_qsv_hardware: boolean;
}
