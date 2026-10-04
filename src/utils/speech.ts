export interface SpeechOptions {
  pitch?: number;       // Default ~0.8 for deep tone
  rate?: number;        // Default ~0.88 for clear British enunciation
  volume?: number;      // 0 to 1
  voiceURI?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Fallback audio tone using Web Audio API to confirm sound device is active
export function playChime(frequency = 220, duration = 0.2) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("AudioContext error:", e);
  }
}

/**
 * Find the most suitable British English voice
 * Prioritizes deep/male UK voices (e.g. Daniel, George, Oliver, Arthur, Google UK Male)
 */
export function findBestBritishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // Filter all British English voices
  const ukVoices = voices.filter(v => {
    const lang = v.lang.toLowerCase().replace('_', '-');
    const name = v.name.toLowerCase();
    return (
      lang.startsWith('en-gb') ||
      name.includes('united kingdom') ||
      name.includes('british') ||
      name.includes('uk english')
    );
  });

  if (ukVoices.length === 0) {
    // Fallback: any English voice
    const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    return enVoices[0] || voices[0] || null;
  }

  // Prioritize deep / male / natural British voices
  const deepMaleKeywords = ['male', 'daniel', 'george', 'oliver', 'arthur', 'malcolm', 'brian', 'natural', 'neural'];
  for (const kw of deepMaleKeywords) {
    const matched = ukVoices.find(v => v.name.toLowerCase().includes(kw));
    if (matched) return matched;
  }

  // Next: Google or Microsoft UK voices
  const googleOrMs = ukVoices.find(v => v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Apple'));
  if (googleOrMs) return googleOrMs;

  return ukVoices[0];
}

/**
 * Returns list of British voices available in browser
 */
export function getBritishVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return voices.filter(v => {
    const lang = v.lang.toLowerCase().replace('_', '-');
    const name = v.name.toLowerCase();
    return (
      lang.startsWith('en-gb') ||
      name.includes('united kingdom') ||
      name.includes('british') ||
      name.includes('uk english')
    );
  });
}

/**
 * Speaks English text using British voice with deep pitch (tone trầm)
 */
export function speakBritishText(text: string, options: SpeechOptions = {}): boolean {
  if (!('speechSynthesis' in window)) {
    alert("Trình duyệt của bạn không hỗ trợ tính năng Web Speech API. Vui lòng sử dụng Chrome, Edge hoặc Safari.");
    return false;
  }

  const {
    pitch = 0.8,        // Tone giọng trầm (0.8 mang lại âm sắc baritone ấm, trầm chuẩn Anh)
    rate = 0.88,        // Tốc độ phát âm chuẩn mực, rõ ràng
    volume = 1.0,
    voiceURI,
    onStart,
    onEnd,
    onError
  } = options;

  // Cancel any ongoing speech to avoid queue stacking
  window.speechSynthesis.cancel();

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-GB';
  utterance.pitch = Math.max(0.1, Math.min(2.0, pitch));
  utterance.rate = Math.max(0.1, Math.min(2.0, rate));
  utterance.volume = Math.max(0, Math.min(1.0, volume));

  const voices = window.speechSynthesis.getVoices();
  let selectedVoice: SpeechSynthesisVoice | null = null;

  if (voiceURI) {
    selectedVoice = voices.find(v => v.voiceURI === voiceURI) || null;
  }

  if (!selectedVoice) {
    selectedVoice = findBestBritishVoice(voices);
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (event) => {
    console.error("SpeechSynthesis error:", event);
    if (onError) onError(event);
  };

  // Browser fix: In some browsers, speechSynthesis pauses if page wasn't clicked
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

/**
 * Stop speech immediately
 */
export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
