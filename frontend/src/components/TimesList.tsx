"use client";

import { useState, useEffect } from "react";
import { ModalidadeDetail } from "@/components/ModalidadeDetail";
import { urlFor } from "@/lib/sanity.image";
import type { ModalidadeListDTO } from "@/types/sanity";

interface TimesListProps {
  modalidades: ModalidadeListDTO[];
}

/** Componente principal para listar e filtrar as modalidades */
export function TimesList({ modalidades }: TimesListProps) {
  const [selectedMod, setSelectedMod] = useState<ModalidadeListDTO | null>(null);
  
  const [busca, setBusca] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("Todos");

  const ITENS_POR_PAGINA = 10;
  const [paginaAtual, setPaginaAtual] = useState(1);

  const modalidadesFiltradas = modalidades.filter((m) => {
    const matchBusca = busca.trim() === ""
      ? true
      : m.nome.toLowerCase().includes(busca.toLowerCase().trim());

    const nomeLower = m.nome.toLowerCase();
    const genero =
      nomeLower.includes("feminino")
        ? "Feminino"
        : nomeLower.includes("masculino")
        ? "Masculino"
        : "Misto";
    const matchGenero =
      filtroGenero === "Todos" || genero === filtroGenero;

    return matchBusca && matchGenero;
  });

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroGenero]);

  const totalPaginas = Math.ceil(modalidadesFiltradas.length / ITENS_POR_PAGINA);

  const modalidadesPaginadas = modalidadesFiltradas.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  return (
    <div className="content-wrapper py-6 md:py-10">
      <div className="flex flex-col gap-6" style={{ marginBottom: "32px" }}>
        <div 
          className="flex items-center rounded-xl border transition-all focus-within:border-[var(--crimson)] focus-within:shadow-sm"
          style={{ background: "#ffffff", borderColor: "var(--border)", padding: "14px 20px", gap: "12px" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6a64" strokeWidth="2.5" className="shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar modalidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "14px",
              color: "#1a1a1a",
              width: "100%",
              fontFamily: "var(--font-body)",
            }}
          />
          {busca && (
            <button
              onClick={() => setBusca("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6e6a64",
                fontSize: "16px",
                lineHeight: 1,
                padding: 0,
                flexShrink: 0,
              }}
            >
              ×
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterButton 
            label="Masculino" 
            active={filtroGenero === "Masculino"} 
            onClick={() => setFiltroGenero(prev => prev === "Masculino" ? "Todos" : "Masculino")} 
          />
          <FilterButton 
            label="Feminino" 
            active={filtroGenero === "Feminino"} 
            onClick={() => setFiltroGenero(prev => prev === "Feminino" ? "Todos" : "Feminino")} 
          />
          <FilterButton 
            label="Misto" 
            active={filtroGenero === "Misto"} 
            onClick={() => setFiltroGenero(prev => prev === "Misto" ? "Todos" : "Misto")} 
          />
        </div>
      </div>

      {modalidadesFiltradas.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[15px]" style={{ color: "var(--text3)" }}>
            Nenhuma modalidade encontrada para &quot;{busca}&quot;.
          </p>
        </div>
      )}

      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        style={{ minHeight: modalidadesFiltradas.length > 0 ? "500px" : "auto" }}
      >
        {modalidadesPaginadas.map((mod) => (
          <ModalidadeCard 
            key={mod._id} 
            modalidade={mod} 
            onClick={() => setSelectedMod(mod)} 
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
          <button
            onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
            disabled={paginaAtual === 1}
            style={{
              background: paginaAtual === 1 ? "#ececec" : "#5c6484",
              color: paginaAtual === 1 ? "#aaa" : "#f4f4f4",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            ← Anterior
          </button>

          <span className="text-[13px] font-medium" style={{ color: "var(--text3)" }}>
            {paginaAtual} de {totalPaginas}
          </span>

          <button
            onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaAtual === totalPaginas}
            style={{
              background: paginaAtual === totalPaginas ? "#ececec" : "#5c6484",
              color: paginaAtual === totalPaginas ? "#aaa" : "#f4f4f4",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: paginaAtual === totalPaginas ? "not-allowed" : "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Próxima →
          </button>
        </div>
      )}

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

/** Botão de filtro para seleção de gênero */
function FilterButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: "10px",
        fontSize: "13px",
        fontWeight: 600,
        transition: "all 0.2s",
        background: active ? "var(--crimson)" : "#ffffff",
        color: active ? "#ffffff" : "var(--text3)",
        border: `1px solid ${active ? "var(--crimson)" : "var(--border)"}`,
      }}
    >
      {label}
    </button>
  );
}

/** Renderiza o card individual de uma modalidade */
function ModalidadeCard({
  modalidade,
  onClick,
}: {
  modalidade: ModalidadeListDTO;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 w-full text-left rounded-xl border p-4 md:p-5 transition-all hover:shadow-lg bg-white"
      style={{ borderColor: "var(--border)" }}
    >
      {(() => {
        const fotoUrl = modalidade.foto_card?.asset 
          ? urlFor(modalidade.foto_card).width(200).height(200).url() 
          : null;
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
