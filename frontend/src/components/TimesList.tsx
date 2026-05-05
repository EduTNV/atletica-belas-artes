"use client";

import { useState } from "react";
import { getStrapiMedia } from "@/lib/strapi";
import type { Modalidade } from "@/lib/strapi";
import { ModalidadeDetail } from "@/components/ModalidadeDetail";

interface TimesListProps {
  modalidades: Modalidade[];
}

export function TimesList({ modalidades }: TimesListProps) {
  const [selectedMod, setSelectedMod] = useState<Modalidade | null>(null);

  return (
    <div className="content-wrapper py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {modalidades.map((mod) => (
          <ModalidadeCard 
            key={mod.documentId} 
            modalidade={mod} 
            onClick={() => setSelectedMod(mod)} 
          />
        ))}
      </div>

      {selectedMod && (
        <ModalidadeDetail
          modalidade={selectedMod}
          cursoNome="BA Oficial"
          cursoColor="#5c6484"
          onClose={() => setSelectedMod(null)}
        />
      )}
    </div>
  );
}

function ModalidadeCard({
  modalidade,
  onClick,
}: {
  modalidade: Modalidade;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 w-full text-left rounded-xl border p-4 md:p-5 transition-all hover:shadow-lg bg-white"
      style={{ borderColor: "var(--border)" }}
    >
      {(() => {
        const fotoUrl = getStrapiMedia(modalidade.foto_card?.formats?.thumbnail?.url || modalidade.foto_card?.url);
        if (fotoUrl) {
          return (
            <img
              src={fotoUrl}
              alt={modalidade.nome}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shrink-0 transition-transform group-hover:scale-105 shadow-sm"
              style={{ border: `1px solid var(--border)` }}
            />
          );
        }
        return (
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shrink-0 font-heading text-[18px] transition-transform group-hover:scale-105 shadow-sm"
            style={{ background: "#f4f4f4", border: `1px solid var(--border)`, color: "#5c6484" }}
          >
            {modalidade.nome.charAt(0)}
          </div>
        );
      })()}

      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] md:text-[16px] font-bold truncate" style={{ color: "#000000" }}>
          {modalidade.nome}
        </h3>
        <span className="font-medium" style={{ fontSize: "11px", color: "var(--text3)" }}>
          Atlética Belas Artes
        </span>
      </div>

      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2.5" className="shrink-0 transition-transform group-hover:translate-x-1 opacity-50">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}
