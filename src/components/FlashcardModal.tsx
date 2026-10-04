import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, RotateCw } from 'lucide-react';
import { AITerm } from '../data/aiTerms';
import { speakBritishText } from '../utils/speech';

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  terms: AITerm[];
  pitch: number;
  rate: number;
  selectedVoiceURI: string;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({
  isOpen,
  onClose,
  terms,
  pitch,
  rate,
  selectedVoiceURI,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || terms.length === 0) return null;

  const currentTerm = terms[currentIndex];

  const handlePlayAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    setIsPlaying(true);
    speakBritishText(text, {
      pitch,
      rate,
      voiceURI: selectedVoiceURI,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % terms.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + terms.length) % terms.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Luyện tập phát âm Flashcard</h3>
            <p className="text-xs text-slate-500">
              Thẻ {currentIndex + 1} / {terms.length} · Chạm vào thẻ để lật xem nghĩa
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col items-center">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full min-h-[260px] rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 transform flex flex-col items-center justify-center text-center shadow-sm border ${
              isFlipped
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-200'
                : 'bg-gradient-to-br from-sky-50 to-slate-50 border-sky-200'
            }`}
          >
            {!isFlipped ? (
              // Mặt trước: Từ tiếng Anh + Phiên âm + Nút loa
              <div className="space-y-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2.5 py-1 rounded-full">
                  {currentTerm.category}
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {currentTerm.term}
                </h2>

                <p className="font-mono text-base font-semibold text-sky-700">
                  {currentTerm.ipa}
                </p>

                <div className="pt-2">
                  <button
                    onClick={(e) => handlePlayAudio(e, currentTerm.term)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    <span className="text-lg">🔊</span>
                    <span>{isPlaying ? 'Đang phát...' : 'Phát âm giọng UK'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 pt-2">
                  <RotateCw className="w-3 h-3" /> Nhấn để lật xem giải nghĩa & ví dụ
                </p>
              </div>
            ) : (
              // Mặt sau: Tiếng Việt + Ví dụ câu
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                  Định nghĩa &amp; Ví dụ
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {currentTerm.vietnameseTerm}
                </h3>

                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {currentTerm.definition}
                </p>

                <div className="bg-white/90 p-3 rounded-xl border border-emerald-100 text-left mt-2">
                  <p className="text-xs font-medium text-slate-800">
                    “{currentTerm.example}”
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {currentTerm.exampleVi}
                  </p>
                  <button
                    onClick={(e) => handlePlayAudio(e, currentTerm.example)}
                    className="mt-2 text-xs text-emerald-800 hover:text-emerald-950 font-semibold inline-flex items-center gap-1"
                  >
                    <span>🔊 Nghe câu ví dụ</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full mt-6">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Từ trước
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              <RotateCw className="w-3.5 h-3.5" /> Lật thẻ
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
            >
              Từ tiếp theo <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
