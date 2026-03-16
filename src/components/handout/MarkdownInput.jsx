import React, { useRef } from "react";
import { Upload, FileText } from "lucide-react";

export default function MarkdownInput({ value, onChange }) {
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-amber-200 tracking-widest uppercase">Markdown Source</span>
        </div>
        <button
          onClick={() => fileInputRef.current.click()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-900/40 border border-amber-700/40 text-amber-300 text-xs font-medium hover:bg-amber-800/50 transition-all duration-200"
        >
          <Upload className="w-3 h-3" />
          Upload .md
        </button>
        <input ref={fileInputRef} type="file" accept=".md,.txt" className="hidden" onChange={handleFileUpload} />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`# The Lost Temple\n\nThis ancient scroll speaks of a forgotten place...\n\n## Description\n\nDeep within the Thornwood forest...\n\n> *A note scrawled in the margin: beware the guardian.*`}
        className="flex-1 w-full bg-[#0d0d1a]/80 border border-amber-900/30 rounded-xl p-4 text-amber-100/80 text-sm font-mono leading-relaxed resize-none outline-none focus:border-amber-700/60 focus:ring-1 focus:ring-amber-700/30 placeholder-amber-900/50 transition-all duration-200 min-h-[400px]"
      />
    </div>
  );
}
