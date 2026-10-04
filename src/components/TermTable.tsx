import React, { useState } from 'react';
import { AITerm } from '../data/aiTerms';
import { Volume2, VolumeX, Copy, Check, Info, Sparkles, BookOpen } from 'lucide-react';
import { speakBritishText } from '../utils/speech';

interface TermTableProps {
  terms: AITerm[];
  pitch: number;
  rate: number;
  selectedVoiceURI: string;
  activePlayingTermId: number | null;
  activePlayingType: 'term' | 'example' | null;
  onPlayStart: (id: number, type: 'term' | 'example') => void;
  onPlayEnd: () => void;
}

export const TermTable: React.FC<TermTableProps> = ({
  terms,
  pitch,
  rate,
  selectedVoiceURI,
  activePlayingTermId,
  activePlayingType,
  onPlayStart,
  onPlayEnd,
}) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handlePlayTerm = (term: AITerm, customRate?: number) => {
    onPlayStart(term.id, 'term');
    speakBritishText(term.term, {
      pitch,
      rate: customRate || rate,
      voiceURI: selectedVoiceURI,
      onEnd: () => onPlayEnd(),
      onError: () => onPlayEnd(),
    });
  };

  const handlePlayExample = (term: AITerm) => {
    onPlayStart(term.id, 'example');
    speakBritishText(term.example, {
      pitch,
      rate,
      voiceURI: selectedVoiceURI,
      onEnd: () => onPlayEnd(),
      onError: () => onPlayEnd(),
    });
  };

  const handleCopyText = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
              {/* Cột 1 */}
              <th className="py-4 px-5 sm:px-6 w-[32%] min-w-[240px]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-[11px]">1</span>
                  <span>Từ (Thuật ngữ tiếng Anh)</span>
                </div>
              </th>

              {/* Cột 2 */}
              <th className="py-4 px-5 sm:px-6 w-[28%] min-w-[210px] bg-sky-50/40">
                <div className="flex items-center gap-2 text-sky-900">
                  <span className="w-5 h-5 rounded-md bg-sky-600 text-white flex items-center justify-center font-bold text-[11px]">2</span>
                  <span>Phát âm (Giọng Anh - Anh 🔊)</span>
                </div>
              </th>

              {/* Cột 3 */}
              <th className="py-4 px-5 sm:px-6 w-[40%] min-w-[300px]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px]">3</span>
                  <span>Ví dụ cho câu (Câu hoàn chỉnh)</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {terms.map((item, index) => {
              const isPlayingThisTerm = activePlayingTermId === item.id && activePlayingType === 'term';
              const isPlayingThisExample = activePlayingTermId === item.id && activePlayingType === 'example';

              return (
                <tr
                  key={item.id}
                  className={`group transition-colors ${
                    isPlayingThisTerm || isPlayingThisExample
                      ? 'bg-sky-50/60'
                      : index % 2 === 0
                      ? 'bg-white hover:bg-slate-50/80'
                      : 'bg-slate-50/30 hover:bg-slate-50/80'
                  }`}
                >
                  {/* CỘT 1: TỪ (THUẬT NGỮ BẰNG TIẾNG ANH) */}
                  <td className="py-4 px-5 sm:px-6 align-top">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-slate-500 pt-0.5 select-none w-5">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <div className="space-y-1.5 flex-1">
                        {/* Thuật ngữ tiếng Anh */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-900 tracking-tight">
                            {item.term}
                          </h3>
                        </div>

                        {/* Phiên âm IPA Anh - Anh */}
                        <div className="font-mono text-xs font-semibold text-sky-700 bg-sky-50/80 inline-block px-2 py-0.5 rounded border border-sky-100">
                          {item.ipa}
                        </div>

                        {/* Nghĩa tiếng Việt */}
                        <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <span>{item.vietnameseTerm}</span>
                        </div>

                        {/* Giải thích ngắn & phân loại */}
                        <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                          {item.definition}
                        </p>

                        <div className="flex items-center gap-2 text-[11px] text-slate-600 pt-1">
                          <span>{item.category}</span>
                          <span aria-hidden="true" className="text-slate-500">·</span>
                          <span>Cấp độ: {item.level}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* CỘT 2: PHÁT ÂM (NÚT LOA ICON 🔊 + GIỌNG ANH - ANH TONE TRẦM) */}
                  <td className="py-4 px-5 sm:px-6 align-top bg-sky-50/20">
                    <div className="flex flex-col gap-2.5">
                      {/* Nút phát âm chính với icon 🔊 */}
                      <button
                        onClick={() => handlePlayTerm(item)}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 active:scale-95 ${
                          isPlayingThisTerm
                            ? 'bg-sky-700 text-white ring-2 ring-sky-400 ring-offset-1'
                            : 'bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white hover:shadow-md'
                        }`}
                        title="Phát âm từ vựng bằng giọng Anh - Anh (British English) tone trầm"
                      >
                        {/* Icon 🔊 theo yêu cầu tuyệt đối của người dùng */}
                        <span className="text-lg leading-none select-none">🔊</span>
                        <span>{isPlayingThisTerm ? 'Đang đọc...' : 'Phát âm'}</span>

                        {/* Sóng âm thanh động khi phát */}
                        {isPlayingThisTerm && (
                          <div className="flex items-end gap-0.5 h-4 ml-1">
                            <span className="wave-bar w-1 bg-white rounded-full"></span>
                            <span className="wave-bar w-1 bg-white rounded-full"></span>
                            <span className="wave-bar w-1 bg-white rounded-full"></span>
                            <span className="wave-bar w-1 bg-white rounded-full"></span>
                          </div>
                        )}
                      </button>

                      {/* Phụ trợ: Đọc chậm (0.75x) & Ghi chú giọng */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => handlePlayTerm(item, 0.72)}
                          className="text-[11px] font-medium text-sky-800 hover:text-sky-950 bg-white hover:bg-sky-50 px-2 py-1 rounded-md border border-sky-200 transition-colors"
                          title="Nghe phát âm tốc độ chậm hơn để bắt chuẩn từng âm tiết"
                        >
                          🐢 Đọc chậm
                        </button>

                        <span className="text-[11px] text-slate-500 font-medium">
                          Anh - Anh · Tone trầm
                        </span>
                      </div>

                      {/* Gợi ý phát âm */}
                      <div className="text-[11px] text-slate-600 leading-tight">
                        Chuẩn RP (Received Pronunciation)
                      </div>
                    </div>
                  </td>

                  {/* CỘT 3: VÍ DỤ CHO CÂU CHO TỪ ĐÓ */}
                  <td className="py-4 px-5 sm:px-6 align-top">
                    <div className="space-y-2">
                      {/* Câu ví dụ tiếng Anh */}
                      <div className="text-sm font-medium text-slate-900 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-200/70 group-hover:border-slate-300">
                        <span className="text-sky-700 font-serif text-lg leading-none mr-1 select-none">“</span>
                        <span>{highlightSentence(item.example, item.term)}</span>
                        <span className="text-sky-700 font-serif text-lg leading-none ml-1 select-none">”</span>
                      </div>

                      {/* Dịch nghĩa tiếng Việt câu ví dụ */}
                      <div className="text-xs text-slate-600 pl-1 leading-relaxed">
                        <span className="font-semibold text-slate-700">Dịch nghĩa:</span> {item.exampleVi}
                      </div>

                      {/* Các nút tương tác cho ví dụ */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handlePlayExample(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                            isPlayingThisExample
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                          title="Nghe giọng Anh - Anh đọc nguyên câu ví dụ này"
                        >
                          <span className="text-sm">🔊</span>
                          <span>{isPlayingThisExample ? 'Đang đọc câu...' : 'Nghe cả câu ví dụ'}</span>
                        </button>

                        <button
                          onClick={() => handleCopyText(`${item.term}: ${item.example}`, item.id)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                          title="Sao chép thuật ngữ và câu ví dụ"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-medium">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer bar of table */}
      <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-700" />
          <span>Tổng số: <strong className="text-slate-900">{terms.length}</strong> thuật ngữ AI tiêu chuẩn quốc tế</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-600">
          <span>* Phát âm sử dụng công nghệ Web Speech API giọng British English (en-GB) tone trầm.</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to highlight the term in the sentence
function highlightSentence(sentence: string, term: string) {
  // Simple case-insensitive matching
  const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
  const parts = sentence.split(regex);

  return parts.map((part, i) => {
    if (part.toLowerCase() === term.toLowerCase()) {
      return (
        <span
          key={i}
          className="font-bold text-sky-800 bg-sky-100/90 px-1 py-0.5 rounded underline decoration-sky-400 decoration-2 underline-offset-2"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
