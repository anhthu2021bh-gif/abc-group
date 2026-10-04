import { AI_TERMS, AITerm } from '../data/aiTerms';

/**
 * Generates standalone, self-contained HTML file containing the 3-column table
 * with embedded British English speech synthesis script and modern responsive styles.
 */
export function generateStandaloneHTML(terms: AITerm[] = AI_TERMS): string {
  const tableRows = terms.map(t => `
        <tr class="term-row" id="row-${t.id}">
          <td class="col-term">
            <div class="term-title">${t.term}</div>
            <div class="term-ipa">${t.ipa}</div>
            <div class="term-meaning">${t.vietnameseTerm}</div>
            <div class="term-badge">${t.category}</div>
          </td>
          <td class="col-audio">
            <button class="audio-btn" onclick="speakTerm('${t.term.replace(/'/g, "\\'")}', this)" title="Phát âm tiếng Anh - Anh (Tone trầm)">
              <span class="speaker-icon">🔊</span>
              <span class="btn-text">Phát âm</span>
              <span class="wave-indicator">
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
              </span>
            </button>
            <div class="audio-meta">Giọng Anh - Anh (UK) · Tone trầm</div>
          </td>
          <td class="col-example">
            <div class="example-en">"${highlightTermInSentence(t.example, t.term)}"</div>
            <div class="example-vi">${t.exampleVi}</div>
            <button class="example-btn" onclick="speakExample('${t.example.replace(/'/g, "\\'")}', this)" title="Nghe đọc cả câu ví dụ">
              <span>🔊 Nghe cả câu</span>
            </button>
          </td>
        </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bảng 15 Thuật Ngữ AI & Phát Âm Giọng Anh - Anh</title>
  <style>
    :root {
      --primary: #0284c7;
      --primary-dark: #0369a1;
      --primary-light: #e0f2fe;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --bg-page: #f8fafc;
      --bg-card: #ffffff;
      --accent: #2563eb;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      background-color: var(--bg-page);
      color: var(--text-main);
      padding: 32px 16px;
      line-height: 1.5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: var(--bg-card);
      border-radius: 16px;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--border);
      overflow: hidden;
    }
    .header {
      padding: 28px 32px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%);
    }
    .header h1 {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .header p {
      font-size: 14px;
      color: var(--text-muted);
    }
    .voice-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      padding: 6px 12px;
      background: #e0f2fe;
      color: #0369a1;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
    }
    .table-responsive {
      width: 100%;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    thead th {
      background: #f8fafc;
      padding: 16px 20px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #475569;
      border-bottom: 2px solid var(--border);
    }
    tbody tr {
      border-bottom: 1px solid var(--border);
      transition: background 0.15s ease;
    }
    tbody tr:hover {
      background: #f8fafc;
    }
    tbody td {
      padding: 18px 20px;
      vertical-align: top;
    }
    /* Cột 1: Thuật ngữ */
    .col-term {
      width: 28%;
    }
    .term-title {
      font-size: 17px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .term-ipa {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      color: #0284c7;
      margin-bottom: 6px;
    }
    .term-meaning {
      font-size: 14px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 6px;
    }
    .term-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      background: #f1f5f9;
      padding: 2px 8px;
      border-radius: 4px;
    }
    /* Cột 2: Phát âm 🔊 */
    .col-audio {
      width: 22%;
    }
    .audio-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: #0284c7;
      color: #ffffff;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25);
    }
    .audio-btn:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }
    .audio-btn:active {
      transform: translateY(0);
    }
    .speaker-icon {
      font-size: 18px;
    }
    .audio-meta {
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 6px;
    }
    .wave-indicator {
      display: none;
      align-items: flex-end;
      gap: 2px;
      height: 14px;
    }
    .audio-btn.playing .wave-indicator {
      display: inline-flex;
    }
    .wave-bar {
      width: 3px;
      height: 4px;
      background: #ffffff;
      border-radius: 2px;
      animation: wave 0.8s infinite ease-in-out;
    }
    .wave-bar:nth-child(2) { animation-delay: 0.15s; }
    .wave-bar:nth-child(3) { animation-delay: 0.3s; }
    @keyframes wave {
      0%, 100% { height: 4px; }
      50% { height: 14px; }
    }
    /* Cột 3: Ví dụ */
    .col-example {
      width: 50%;
    }
    .example-en {
      font-size: 14px;
      color: #1e293b;
      margin-bottom: 6px;
      line-height: 1.6;
    }
    .example-en mark {
      background: #fef08a;
      color: #713f12;
      padding: 0 3px;
      border-radius: 3px;
      font-weight: 600;
    }
    .example-vi {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    .example-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 12px;
      color: #475569;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .example-btn:hover {
      background: #f1f5f9;
      color: #0f172a;
      border-color: #cbd5e1;
    }
    @media (max-width: 768px) {
      body { padding: 12px 8px; }
      thead th, tbody td { padding: 12px 10px; }
      .term-title { font-size: 15px; }
      .col-term { width: 35%; }
      .col-audio { width: 25%; }
      .col-example { width: 40%; }
      .audio-btn { padding: 8px 12px; font-size: 13px; }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <h1><span>🤖</span> 15 Thuật Ngữ AI (Trí Tuệ Nhân Tạo) &amp; Phát Âm Chuẩn</h1>
      <p>Bảng tổng hợp từ vựng chuyên ngành Trí tuệ nhân tạo, phát âm chuẩn giọng Anh - Anh (British English) với âm sắc tone trầm chuẩn xác và ví dụ câu áp dụng thực tế.</p>
      <div class="voice-badge">
        <span>🔊</span> Cột phát âm: Giọng Anh - Anh (en-GB) · Tone trầm (Pitch 0.8) · Tốc độ chuẩn mực
      </div>
    </div>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>1. Từ (Thuật ngữ tiếng Anh)</th>
            <th>2. Phát âm (Giọng Anh - Anh 🔊)</th>
            <th>3. Ví dụ câu thực tế</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  </div>

  <script>
    // British English Speech Synthesis Engine with Deep Tone
    let selectedUkVoice = null;

    function initVoices() {
      if (!('speechSynthesis' in window)) return;
      const voices = window.speechSynthesis.getVoices();
      
      // Look for British English voices
      const ukVoices = voices.filter(v => {
        const lang = v.lang.toLowerCase().replace('_', '-');
        const name = v.name.toLowerCase();
        return lang.startsWith('en-gb') || name.includes('united kingdom') || name.includes('british') || name.includes('uk');
      });

      if (ukVoices.length > 0) {
        // Prefer male/deep voices
        const deepKeywords = ['male', 'daniel', 'george', 'oliver', 'arthur', 'malcolm', 'brian'];
        for (const kw of deepKeywords) {
          const match = ukVoices.find(v => v.name.toLowerCase().includes(kw));
          if (match) {
            selectedUkVoice = match;
            break;
          }
        }
        if (!selectedUkVoice) {
          selectedUkVoice = ukVoices[0];
        }
      }
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = initVoices;
      initVoices();
    }

    function speakText(text, btnElement, speed) {
      if (!('speechSynthesis' in window)) {
        alert('Trình duyệt của bạn không hỗ trợ tính năng Web Speech API. Vui lòng dùng Chrome, Edge, Safari hoặc Firefox.');
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      
      // TONE TRẦM: Pitch 0.8 mang lại âm vực baritone trầm chuẩn giọng British
      utterance.pitch = 0.8;
      utterance.rate = speed || 0.88;

      if (!selectedUkVoice) {
        initVoices();
      }
      if (selectedUkVoice) {
        utterance.voice = selectedUkVoice;
      }

      if (btnElement) {
        btnElement.classList.add('playing');
        utterance.onend = function() {
          btnElement.classList.remove('playing');
        };
        utterance.onerror = function() {
          btnElement.classList.remove('playing');
        };
      }

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.speak(utterance);
    }

    function speakTerm(term, btn) {
      speakText(term, btn, 0.85);
    }

    function speakExample(example, btn) {
      speakText(example, btn, 0.90);
    }
  </script>
</body>
</html>`;
}

function highlightTermInSentence(sentence: string, term: string): string {
  const regex = new RegExp(`(${term})`, 'gi');
  return sentence.replace(regex, '<mark>$1</mark>');
}
