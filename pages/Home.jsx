import React, { useState, useRef } from "react";
import MarkdownInput from "../components/handout/MarkdownInput";
import HandoutPreview from "../components/handout/HandoutPreview";
import ExportButton from "../components/handout/ExportButton";
import { Scroll, Palette, Columns, AlignLeft } from "lucide-react";

const SAMPLE = `# The Seal of Erevan

*An ancient document, its edges burned and brittle...*

## Origins

This seal was crafted in the third age of the Sunken Kingdoms, when the mages of Erevan sought to bind the spirit of the Hollow Throne. Few have seen it and lived to describe its true nature.

> *"Whosoever breaks this seal shall release what was never meant to walk among the living."*
> — *Archivist Maren, 3rd Age*

---

## Known Properties

- Radiates faint necromantic energy within 30 feet
- Immune to all forms of fire damage
- Cannot be moved by non-magical means

## Warning

The Order of the Pale Hand has been **actively searching** for this artifact. Any party found in possession of the seal will be considered *enemies of the Conclave* and dealt with accordingly.

### Rumors

There are whispers that the seal is merely a key — and somewhere beneath the ruins of Erevan, a door still waits.`;

const THEMES = [
  { id: "parchment", label: "Parchment", color: "#c9a84c" },
  { id: "dark", label: "Dark Tome", color: "#6b4c9e" },
  { id: "aged", label: "Aged Paper", color: "#6b4c11" },
  { id: "blood", label: "Blood Oath", color: "#8b1a1a" },
  { id: "forest", label: "Forest Druid", color: "#2d5a27" },
  { id: "arcane", label: "Arcane Scroll", color: "#1a3a5c" },
  { id: "bone", label: "Cyberpunk", color: "#00ffe1" },
];

export default function Home() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [theme, setTheme] = useState("parchment");
  const [columns, setColumns] = useState(1);
  const [headerImage, setHeaderImage] = useState(null);
  const previewRef = useRef();

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="border-b border-amber-900/30 bg-[#0d0d1a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-700 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-900/40">
              <Scroll className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-100 tracking-wide">ScribeForge</h1>
              <p className="text-xs text-amber-700 tracking-widest uppercase">RPG Handout Generator</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme picker */}
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-600" />
              <div className="flex gap-1">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    title={t.label}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      theme === t.id ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                    style={{ backgroundColor: t.color }}
                  />
                ))}
              </div>
            </div>
            {/* Column toggle */}
            <div className="flex items-center gap-1 bg-amber-900/30 rounded-lg p-1 border border-amber-900/30">
              <button
                onClick={() => setColumns(1)}
                title="Single column"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  columns === 1 ? "bg-amber-700 text-white" : "text-amber-400 hover:text-amber-200"
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                1 col
              </button>
              <button
                onClick={() => setColumns(2)}
                title="Two columns"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  columns === 2 ? "bg-amber-700 text-white" : "text-amber-400 hover:text-amber-200"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                2 col
              </button>
            </div>
            <ExportButton previewRef={previewRef} />
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Editor */}
          <div className="lg:sticky lg:top-24">
            <MarkdownInput value={markdown} onChange={setMarkdown} />
          </div>

          {/* Right: Preview */}
          <div>
            <HandoutPreview markdown={markdown} previewRef={previewRef} theme={theme} columns={columns} headerImage={headerImage} onHeaderImageChange={setHeaderImage} />
          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="text-center py-6 text-amber-900/60 text-xs tracking-widest uppercase">
        Write your lore · Choose a theme · Export the scroll
      </footer>
    </div>
  );
}
