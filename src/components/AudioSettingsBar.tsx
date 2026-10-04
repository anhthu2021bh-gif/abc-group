import React from 'react';
import { Volume2, Play, Square, Sliders, CheckCircle2, RefreshCw } from 'lucide-react';
import { speakBritishText, stopSpeech } from '../utils/speech';

interface AudioSettingsBarProps {
  voices: SpeechSynthesisVoice[];
  selectedVoiceURI: string;
  onVoiceChange: (uri: string) => void;
  pitch: number;
  onPitchChange: (pitch: number) => void;
  rate: number;
  onRateChange: (rate: number) => void;
  isPlayingAll: boolean;
  onTogglePlayAll: () => void;
  currentPlayingIndex: number | null;
  totalTerms: number;
}

export const AudioSettingsBar: React.FC<AudioSettingsBarProps> = ({
  voices,
  selectedVoiceURI,
  onVoiceChange,
  pitch,
  onPitchChange,
  rate,
  onRateChange,
  isPlayingAll,
  onTogglePlayAll,
  currentPlayingIndex,
  totalTerms,
}) => {
  const [isTesting, setIsTesting] = React.useState(false);

  // Filter UK voices
  const ukVoices = voices.filter(v => {
    const lang = v.lang.toLowerCase().replace('_', '-');
    const name = v.name.toLowerCase();
    return lang.startsWith('en-gb') || name.includes('united kingdom') || name.includes('british') || name.includes('uk');
  });

  const handleTestVoice = () => {
    setIsTesting(true);
    speakBritishText("Artificial intelligence and machine learning in British English.", {
      pitch,
      rate,
      voiceURI: selectedVoiceURI,
      onEnd: () => setIsTesting(false),
      onError: () => setIsTesting(false),
    });
  };

  const handleResetToStandardDeepTone = () => {
    onPitchChange(0.8);
    onRateChange(0.88);
  };

  const isDeepToneDefault = Math.abs(pitch - 0.8) < 0.02 && Math.abs(rate - 0.88) < 0.02;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 md:p-5 mb-6 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Voice & Accent Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm md:text-base">
                Cấu hình giọng đọc Anh - Anh (UK English)
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" /> Tone trầm chuẩn
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tần số trầm chuẩn (Pitch: {pitch.toFixed(2)}) · Tốc độ: {rate.toFixed(2)}x · Ngôn ngữ: en-GB
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Test Audio Button */}
          <button
            onClick={handleTestVoice}
            disabled={isTesting}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shadow-sm ${
              isTesting
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
            }`}
            title="Nhấn để nghe thử âm thanh giọng đọc Anh - Anh tone trầm"
          >
            <span className="text-base leading-none">🔊</span>
            <span>{isTesting ? 'Đang phát thử...' : 'Thử âm thanh'}</span>
          </button>

          {/* Auto Read All Button */}
          <button
            onClick={onTogglePlayAll}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all shadow-sm ${
              isPlayingAll
                ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                : 'bg-slate-900 hover:bg-slate-800 text-white border-transparent'
            }`}
          >
            {isPlayingAll ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>
                  Dừng phát ({currentPlayingIndex !== null ? currentPlayingIndex + 1 : 0}/{totalTerms})
                </span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Đọc tuần tự cả 15 từ</span>
              </>
            )}
          </button>

          {/* Voice Selector dropdown if multiple UK voices exist */}
          {ukVoices.length > 1 && (
            <select
              value={selectedVoiceURI}
              onChange={(e) => onVoiceChange(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              title="Chọn giọng đọc Anh - Anh"
            >
              {ukVoices.map(v => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} {v.name.toLowerCase().includes('male') ? '👨 (Nam trầm)' : ''}
                </option>
              ))}
            </select>
          )}

          {/* Reset to standard preset */}
          {!isDeepToneDefault && (
            <button
              onClick={handleResetToStandardDeepTone}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Khôi phục chuẩn tone trầm mặc định"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Chuẩn mặc định</span>
            </button>
          )}
        </div>
      </div>

      {/* Sliders Accordion/Details */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {/* Pitch slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-600 font-medium">Tone giọng (Pitch - Độ trầm/bổng):</span>
            <span className="font-semibold text-sky-700">
              {pitch <= 0.85 ? `${pitch.toFixed(2)} (Trầm chuẩn)` : `${pitch.toFixed(2)} (Bình thường)`}
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.2"
            step="0.05"
            value={pitch}
            onChange={(e) => onPitchChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>Rất trầm (0.5)</span>
            <span className="text-sky-600 font-bold">★ Tone trầm đề xuất (0.8)</span>
            <span>Mặc định (1.0)</span>
          </div>
        </div>

        {/* Rate slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-600 font-medium">Tốc độ phát âm (Speed):</span>
            <span className="font-semibold text-slate-800">{rate.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.3"
            step="0.05"
            value={rate}
            onChange={(e) => onRateChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>Chậm (0.6x)</span>
            <span className="text-slate-600 font-medium">Chuẩn (0.88x)</span>
            <span>Nhanh (1.3x)</span>
          </div>
        </div>

        {/* Note / Sound check badge */}
        <div className="sm:col-span-2 lg:col-span-1 bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">💡</span>
            <span className="text-[11px] text-slate-600 leading-tight">
              Bật âm lượng thiết bị để nghe rõ ngữ điệu chuẩn xứ sở sương mù.
            </span>
          </div>
          <button
            onClick={() => {
              onPitchChange(0.8);
              onRateChange(0.88);
            }}
            className="text-[11px] font-semibold text-sky-700 hover:text-sky-800 shrink-0 ml-2 underline"
          >
            Đặt lại 0.8
          </button>
        </div>
      </div>
    </div>
  );
};
