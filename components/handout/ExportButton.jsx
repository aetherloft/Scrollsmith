import React from "react";
import { Download } from "lucide-react";

export default function ExportButton({ previewRef }) {
  const handleExport = () => {
    const el = previewRef.current;
    if (!el) return;

    // Clone the preview element into a print-only container
    const printContainer = document.createElement("div");
    printContainer.id = "__rpg_print__";
    printContainer.appendChild(el.cloneNode(true));
    document.body.appendChild(printContainer);

    // Inject print styles
    const style = document.createElement("style");
    style.id = "__rpg_print_style__";
    style.innerHTML = `
      @media print {
        body > *:not(#__rpg_print__) { display: none !important; }
        #__rpg_print__ {
          display: block !important;
          margin: 0;
          padding: 0;
        }
        #__rpg_print__ > div {
          width: 100% !important;
          min-height: unset !important;
          position: static !important;
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
        }
        #__rpg_print__ * {
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
        }
        #__rpg_print__ h1,
        #__rpg_print__ h2,
        #__rpg_print__ h3,
        #__rpg_print__ h4,
        #__rpg_print__ blockquote,
        #__rpg_print__ table,
        #__rpg_print__ ul,
        #__rpg_print__ ol {
          break-inside: avoid;
        }
        #__rpg_print__ h1,
        #__rpg_print__ h2,
        #__rpg_print__ h3,
        #__rpg_print__ h4 {
          break-after: avoid;
        }
        @page { margin: 0; }
      }
      #__rpg_print__ { display: none; }
    `;
    document.head.appendChild(style);

    window.print();

    // Cleanup after print dialog closes
    const cleanup = () => {
      document.getElementById("__rpg_print__")?.remove();
      document.getElementById("__rpg_print_style__")?.remove();
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-500 text-white font-semibold text-sm tracking-wide hover:from-amber-600 hover:to-amber-400 transition-all duration-200 shadow-lg shadow-amber-900/40"
    >
      <Download className="w-4 h-4" />
      Export as PDF
    </button>
  );
}
