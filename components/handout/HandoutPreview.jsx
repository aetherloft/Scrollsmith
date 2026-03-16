import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { ImagePlus, X } from "lucide-react";

export default function HandoutPreview({ markdown, previewRef, theme, columns = 1, headerImage, onHeaderImageChange }) {
  const imageInputRef = useRef();
  const themes = {
    parchment: {
      bg: "bg-[#f4e4c1]",
      text: "text-[#3d2b1f]",
      border: "border-[#8b6914]",
      heading: "text-[#5c3a00] font-serif",
      hr: "border-[#8b6914]",
      blockquote: "border-[#8b6914] bg-[#e8d5a0]/50 text-[#5c3a00] italic",
      fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
      texture: "parchment",
    },
    dark: {
      bg: "bg-[#1a1a2e]",
      text: "text-[#d4c5a9]",
      border: "border-[#c9a84c]",
      heading: "text-[#c9a84c] font-serif",
      hr: "border-[#c9a84c]",
      blockquote: "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c] italic",
      fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
      texture: "dark",
    },
    aged: {
      bg: "bg-[#d9c9a3]",
      text: "text-[#2c1a0e]",
      border: "border-[#6b4c11]",
      heading: "text-[#4a2800] font-serif",
      hr: "border-[#6b4c11]",
      blockquote: "border-[#6b4c11] bg-[#c4a96b]/30 text-[#4a2800] italic",
      fontFamily: "'Book Antiqua', Palatino, Georgia, serif",
      texture: "aged",
    },
    blood: {
      bg: "bg-[#1c0a0a]",
      text: "text-[#e8c9b0]",
      border: "border-[#8b1a1a]",
      heading: "text-[#cc3333] font-serif",
      hr: "border-[#8b1a1a]",
      blockquote: "border-[#8b1a1a] bg-[#8b1a1a]/20 text-[#e8c9b0] italic",
      fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
      texture: "dark",
    },
    forest: {
      bg: "bg-[#eef4e8]",
      text: "text-[#1a2e14]",
      border: "border-[#3a6b2a]",
      heading: "text-[#2d5a1e] font-serif",
      hr: "border-[#3a6b2a]",
      blockquote: "border-[#3a6b2a] bg-[#3a6b2a]/15 text-[#2d5a1e] italic",
      fontFamily: "'Book Antiqua', Palatino, Georgia, serif",
      texture: "parchment",
    },
    arcane: {
      bg: "bg-[#0d1f33]",
      text: "text-[#c8d8e8]",
      border: "border-[#4a8fc8]",
      heading: "text-[#7ab8e8] font-serif",
      hr: "border-[#4a8fc8]",
      blockquote: "border-[#4a8fc8] bg-[#4a8fc8]/10 text-[#a0c8e8] italic",
      fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
      texture: "dark",
    },
    bone: {
      bg: "bg-[#0a0a0f]",
      text: "text-[#c8f0e8]",
      border: "border-[#00ffe1]",
      heading: "text-[#00ffe1] font-mono",
      hr: "border-[#00ffe1]",
      blockquote: "border-[#ff00aa] bg-[#ff00aa]/10 text-[#ff00aa] italic",
      fontFamily: "'Courier New', Courier, monospace",
      texture: "dark",
    },
  };

  const t = themes[theme] || themes.parchment;

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-sm font-medium text-amber-200 tracking-widest uppercase">Handout Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => imageInputRef.current.click()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-900/40 border border-amber-700/40 text-amber-300 text-xs font-medium hover:bg-amber-800/50 transition-all duration-200"
          >
            <ImagePlus className="w-3 h-3" />
            {headerImage ? "Change Image" : "Add Header Image (16:9 works best)"}
          </button>
          {headerImage && (
            <button
              onClick={() => onHeaderImageChange(null)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-red-900/30 border border-red-700/30 text-red-400 text-xs font-medium hover:bg-red-800/40 transition-all duration-200"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => onHeaderImageChange(ev.target.result);
              reader.readAsDataURL(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-amber-900/30">
        <div
          ref={previewRef}
          id="handout-preview"
          className={`relative min-h-full p-14 md:p-20 ${t.bg} ${t.text}`}
          style={{ fontFamily: t.fontFamily, fontSize: "0.82rem" }}
        >
          {/* Texture overlay */}
          {t.texture === "parchment" && (
            <div className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              }}
            />
          )}

          {/* Corner ornaments */}
          <div className={`absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 ${t.border} opacity-60`} />
          <div className={`absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 ${t.border} opacity-60`} />
          <div className={`absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 ${t.border} opacity-60`} />
          <div className={`absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 ${t.border} opacity-60`} />

          {/* Header Image */}
          {headerImage && (
            <div className="relative z-10 mb-6" style={{ columnSpan: "all" }}>
              <img
                src={headerImage}
                alt="Handout header"
                className="w-full max-h-64 object-cover rounded-lg"
                style={{ borderBottom: `2px solid` }}
              />
            </div>
          )}

          {/* Content */}
          <div
            className="relative z-10 max-w-none"
            style={columns === 2 ? { columnCount: 2, columnGap: "2rem", columnRule: "1px solid rgba(0,0,0,0.15)" } : {}}
          >
            {markdown ? (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1
                      className={`text-2xl font-bold mb-4 mt-2 pb-3 border-b-2 ${t.border} ${t.heading} text-center tracking-wide`}
                      style={{ columnSpan: "all" }}
                    >
                      <span className="mx-3">✦</span>{children}<span className="mx-3">✦</span>
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className={`text-base font-bold mb-3 mt-6 ${t.heading} tracking-wide`}>
                      <span className="mr-2 opacity-60">◈</span>{children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className={`text-sm font-semibold mb-2 mt-4 ${t.heading} italic`}>{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className={`text-xs font-semibold mb-1 mt-3 ${t.heading} italic opacity-80 tracking-wide`}>{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3 leading-relaxed text-[0.8rem] text-justify">{children}</p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className={`border-l-4 ${t.blockquote} pl-4 pr-4 py-2 my-4 rounded-r-lg text-sm`}>
                      {children}
                    </blockquote>
                  ),
                  hr: () => (
                    <div className={`my-6 flex items-center gap-3`}>
                      <div className={`flex-1 border-t ${t.hr} opacity-50`} />
                      <span className="text-lg opacity-50">⚜</span>
                      <div className={`flex-1 border-t ${t.hr} opacity-50`} />
                    </div>
                  ),
                  ul: ({ children }) => <ul className="mb-3 ml-5 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-3 ml-5 space-y-1 list-decimal">{children}</ol>,
                  li: ({ children }) => (
                    <li className="text-[0.8rem] leading-relaxed">
                      <span className="mr-1 opacity-50">◦</span>{children}
                    </li>
                  ),
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  em: ({ children }) => <em className="italic opacity-90">{children}</em>,
                  code: ({ children }) => (
                    <code className="font-mono text-sm bg-black/10 px-1 rounded">{children}</code>
                  ),
                  table: ({ children }) => (
                    <table className={`w-full my-4 border-collapse border ${t.border} text-sm`}>{children}</table>
                  ),
                  th: ({ children }) => (
                    <th className={`border ${t.border} px-3 py-2 font-bold text-left bg-black/10`}>{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className={`border ${t.border} px-3 py-2`}>{children}</td>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 opacity-30">
                <div className="text-5xl mb-4">📜</div>
                <p className="text-center font-serif italic">Your handout will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
