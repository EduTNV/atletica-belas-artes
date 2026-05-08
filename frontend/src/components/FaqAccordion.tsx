"use client";

import { useState } from "react";
import type { Faq } from "@/lib/strapi";

/** Componente de acordeão interativo para exibir perguntas frequentes (FAQ) */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const sortedFaqs = [...faqs].sort((a, b) => (a.ordem || 0) - (b.ordem || 0));

  return (
    <div className="flex flex-col divide-y" style={{ borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8", borderColor: "#e8e8e8" }}>
      {sortedFaqs.map((faq, index) => (
        <FaqItem
          key={index}
          faq={faq}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}

/** Item individual do acordeão contendo a pergunta e a resposta expansível */
function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="cursor-pointer transition-colors hover:bg-black/[0.02]"
      onClick={onToggle}
    >
      <div className="flex justify-between items-center py-5 px-1">
        <p className="font-semibold text-[15px] md:text-[16px]" style={{ color: "#1a1a1a" }}>
          {faq.pergunta}
        </p>
        <span
          style={{
            color: "#5c6484",
            fontSize: "24px",
            fontWeight: 300,
            transition: "transform 0.3s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? "−" : "+"}
        </span>
      </div>
      <div
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          className="text-[14px] md:text-[15px] leading-relaxed pb-6 px-1"
          style={{ color: "#6e6a64" }}
        >
          {faq.resposta}
        </p>
      </div>
    </div>
  );
}
