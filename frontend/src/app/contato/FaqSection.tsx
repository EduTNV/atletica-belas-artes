"use client";

import { useState } from "react";

export function FaqSection({ faqs }: { faqs: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section style={{ marginTop: "80px" }}>
      <div className="flex flex-col" style={{ gap: "10px" }}>
        {faqs.map((faq, i) => (
          <FaqItem
            key={i}
            faq={faq}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: any;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer"
      style={{
        background: isOpen ? "#e8e8e8" : "#ececec",
        borderRadius: "12px",
        padding: "20px 24px",
        boxShadow: isOpen ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
        transition: "background 0.2s, box-shadow 0.2s",
      }}
    >
      <div className="flex justify-between items-center gap-4 text-left">
        <p
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#1a1a1a",
            lineHeight: 1.4,
          }}
        >
          {faq.pergunta}
        </p>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 300,
            color: "#5c6484",
            flexShrink: 0,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </div>

      <div
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
        className="text-left"
      >
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#6e6a64",
            paddingTop: "14px",
          }}
        >
          {faq.resposta}
        </p>
      </div>
    </div>
  );
}
