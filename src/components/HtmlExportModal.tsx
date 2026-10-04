import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, Globe, FileCheck } from 'lucide-react';
import { generateStandaloneHTML } from '../utils/htmlExporter';
import { AITerm } from '../data/aiTerms';

interface HtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  terms: AITerm[];
}

export const HtmlExportModal: React.FC<HtmlExportModalProps> = ({
  isOpen,
  onClose,
  terms,
}) => {
  const [copied, setCopied] = useState(false);
  const htmlContent = generateStandaloneHTML(terms);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bang-15-thuat-ngu-ai-phat-am.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Xuất mã nguồn HTML độc lập (Standalone HTML)
              </h2>
              <p className="text-xs text-slate-500">
                File HTML trọn gói gồm Bảng 3 cột + CSS + JavaScript phát âm giọng Anh - Anh tone trầm (Chạy ngay không cần cài đặt)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-5 py-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Tương thích mọi trình duyệt (Chrome, Safari, Edge, Firefox, Cốc Cốc)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs transition-all shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã sao chép vào Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Sao chép toàn bộ HTML</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs bg-sky-600 hover:bg-sky-700 text-white transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Tải file .html về máy</span>
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="flex-1 overflow-auto p-5 bg-slate-950 font-mono text-xs text-slate-300">
          <pre className="whitespace-pre overflow-x-auto leading-relaxed">
            {htmlContent}
          </pre>
        </div>

        {/* Footer Instructions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              <strong>Cách dùng:</strong> Lưu thành file <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded">index.html</code> và mở trực tiếp bằng bất kỳ trình duyệt nào để trải nghiệm âm thanh!
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 font-medium text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
