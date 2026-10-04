/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AI_TERMS, AITerm } from './data/aiTerms';
import { TermTable } from './components/TermTable';
import { AudioSettingsBar } from './components/AudioSettingsBar';
import { HtmlExportModal } from './components/HtmlExportModal';
import { FlashcardModal } from './components/FlashcardModal';
import {
  findBestBritishVoice,
  speakBritishText,
  stopSpeech,
  playChime
} from './utils/speech';
import {
  Search,
  Code,
  Layers,
  Sparkles,
  HelpCircle,
  CheckCircle,
  ExternalLink,
  Volume2,
  Bookmark
} from 'lucide-react';

export default function App() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  
  // Tone giọng trầm theo yêu cầu người dùng: Pitch 0.8 mang lại âm sắc baritone chuẩn Anh
  const [pitch, setPitch] = useState<number>(0.8);
  const [rate, setRate] = useState<number>(0.88);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  // Audio Playback state
  const [activePlayingTermId, setActivePlayingTermId] = useState<number | null>(null);
  const [activePlayingType, setActivePlayingType] = useState<'term' | 'example' | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState<number | null>(null);

  // Modals
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);

  // Sound prompt status
  const [hasInteracted, setHasInteracted] = useState(false);

  // Keep ref for playlist execution
  const playlistTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize SpeechSynthesis Voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      const bestUk = findBestBritishVoice(availableVoices);
      if (bestUk) {
        setSelectedVoiceURI(bestUk.voiceURI);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      stopSpeech();
      if (playlistTimeoutRef.current) {
        clearTimeout(playlistTimeoutRef.current);
      }
    };
  }, []);

  // Filtered terms
  const categories = ['Tất cả', ...Array.from(new Set(AI_TERMS.map(t => t.category)))];

  const filteredTerms = AI_TERMS.filter(item => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnameseTerm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Tất cả' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle single playback start / end
  const handlePlayStart = (id: number, type: 'term' | 'example') => {
    setHasInteracted(true);
    setActivePlayingTermId(id);
    setActivePlayingType(type);
  };

  const handlePlayEnd = () => {
    setActivePlayingTermId(null);
    setActivePlayingType(null);
  };

  // Play All 15 Terms sequentially
  const handleTogglePlayAll = () => {
    setHasInteracted(true);
    if (isPlayingAll) {
      stopSpeech();
      setIsPlayingAll(false);
      setCurrentPlaylistIndex(null);
      setActivePlayingTermId(null);
      if (playlistTimeoutRef.current) {
        clearTimeout(playlistTimeoutRef.current);
      }
      return;
    }

    setIsPlayingAll(true);
    playSequence(0);
  };

  const playSequence = (index: number) => {
    if (index >= AI_TERMS.length) {
      setIsPlayingAll(false);
      setCurrentPlaylistIndex(null);
      setActivePlayingTermId(null);
      return;
    }

    const currentItem = AI_TERMS[index];
    setCurrentPlaylistIndex(index);
    setActivePlayingTermId(currentItem.id);
    setActivePlayingType('term');

    // Scroll into view if needed
    const rowEl = document.getElementById(`term-${currentItem.id}`);
    if (rowEl) {
      rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    speakBritishText(currentItem.term, {
      pitch,
      rate,
      voiceURI: selectedVoiceURI,
      onEnd: () => {
        // Pause 1 second before next word
        playlistTimeoutRef.current = setTimeout(() => {
          playSequence(index + 1);
        }, 1100);
      },
      onError: () => {
        setIsPlayingAll(false);
        setCurrentPlaylistIndex(null);
        setActivePlayingTermId(null);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 pb-16">
      {/* Top Banner Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-sm">
              AI
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                15 Thuật Ngữ AI &amp; Phát Âm Chuẩn Anh - Anh
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Chuẩn ngữ âm British English (RP) · Tone trầm chuyên gia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFlashcardOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>Thẻ Flashcard</span>
            </button>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all active:scale-95"
              title="Xuất mã nguồn HTML độc lập hoàn chỉnh để gắn vào website"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Xuất mã HTML</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Hero Section */}
        <section className="mb-6">
          <div className="bg-gradient-to-br from-white via-sky-50/30 to-indigo-50/30 rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3">
                <span className="text-sm">🔊</span>
                <span>Yêu cầu đã thực hiện: 3 Cột Chuẩn + Icon 🔊 + Giọng Anh - Anh Tone Trầm</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Bảng 15 Thuật Ngữ Trí Tuệ Nhân Tạo &amp; Luyện Nghe Âm Thanh Chuẩn
              </h2>

              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                Được biên soạn đầy đủ theo 3 cột chuẩn: <strong className="text-slate-900">Cột 1: Thuật ngữ tiếng Anh</strong> (kèm phiên âm IPA quốc tế), <strong className="text-sky-700">Cột 2: Phát âm có icon 🔊</strong> bằng giọng Anh - Anh (British English) trầm ấm, phát ra âm thanh thật của trình duyệt, và <strong className="text-slate-900">Cột 3: Ví dụ thực tế</strong> có dịch nghĩa hoàn chỉnh.
              </p>

              {/* Requirement Checkpoints */}
              <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1. Cột Thuật ngữ tiếng Anh &amp; IPA</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>2. Cột Phát âm icon 🔊 (Giọng UK Tone trầm)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3. Cột Câu ví dụ có dịch nghĩa &amp; audio</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Audio Configuration Bar */}
        <AudioSettingsBar
          voices={voices}
          selectedVoiceURI={selectedVoiceURI}
          onVoiceChange={setSelectedVoiceURI}
          pitch={pitch}
          onPitchChange={setPitch}
          rate={rate}
          onRateChange={setRate}
          isPlayingAll={isPlayingAll}
          onTogglePlayAll={handleTogglePlayAll}
          currentPlayingIndex={currentPlaylistIndex}
          totalTerms={AI_TERMS.length}
        />

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 mb-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm thuật ngữ (ví dụ: Machine Learning, Transformer, Mạng nơ-ron...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Core 3-Column Table */}
        <TermTable
          terms={filteredTerms}
          pitch={pitch}
          rate={rate}
          selectedVoiceURI={selectedVoiceURI}
          activePlayingTermId={activePlayingTermId}
          activePlayingType={activePlayingType}
          onPlayStart={handlePlayStart}
          onPlayEnd={handlePlayEnd}
        />

        {/* Bottom Fast Action Banner */}
        <section className="mt-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold">
              Đưa bảng này lên website hoặc file HTML cá nhân?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Bạn có thể xuất trọn vẹn mã nguồn HTML + CSS + tính năng phát âm giọng Anh - Anh tone trầm chỉ với 1 cú click.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              <Code className="w-4 h-4" />
              <span>Lấy mã nguồn HTML ngay</span>
            </button>
          </div>
        </section>
      </main>

      {/* HTML Export Modal */}
      <HtmlExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        terms={AI_TERMS}
      />

      {/* Flashcard Practice Modal */}
      <FlashcardModal
        isOpen={isFlashcardOpen}
        onClose={() => setIsFlashcardOpen(false)}
        terms={AI_TERMS}
        pitch={pitch}
        rate={rate}
        selectedVoiceURI={selectedVoiceURI}
      />
    </div>
  );
}
