"use client";

import { useState } from "react";

export function Paragraphs({ text, className = "" }: { text: string; className?: string }) {
  return text
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0)
    .map((paragraph, i) => (
      <p
        key={i}
        className={`text-[15px] md:text-[16px] leading-[1.8] ${className}`}
        style={{ color: "var(--text-main)", marginBottom: "1rem" }}
      >
        {paragraph.trim()}
      </p>
    ));
}

export function ExpandableText({ text }: { text?: string | null }) {
  const [open, setOpen] = useState(false);

  const displayText =
    text ||
    "Desde a nossa fundação, construímos uma história de vitórias, amizades e momentos inesquecíveis. Nossos times competem em diversas modalidades, levando o nome da BA com orgulho por toda São Paulo e em jogos universitários por todo o estado. Mais do que esporte, somos comunidade.";

  return (
    <>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "800px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="pt-1 pb-5">
          <Paragraphs text={displayText} />
        </div>
      </div>

      <button
        className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full text-[13px] font-medium transition-all border"
        style={{
          color: "var(--crimson)",
          borderColor: "var(--border)",
          background: "rgba(224, 44, 44, 0.05)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--crimson)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--border)";
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? "Ler menos" : "Conheça nossa história"}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </>
  );
}
