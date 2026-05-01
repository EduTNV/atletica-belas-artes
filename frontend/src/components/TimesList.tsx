"use client";

import { useState } from "react";
import type { Curso, Modalidade } from "@/lib/strapi";
import { ModalidadeDetail } from "@/components/ModalidadeDetail";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface TimesListProps {
  cursos: Curso[];
}

/**
 * Client Component — Gerencia o grid de cursos e a lista de modalidades.
 * As modalidades vêm embutidas dentro de cada Curso via populate.
 */
export function TimesList({ cursos }: TimesListProps) {
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const [selectedMod, setSelectedMod] = useState<Modalidade | null>(null);

  // Modalidades vêm embutidas no curso selecionado
  const modalidadesFiltradas = selectedCurso?.modalidades || [];

  return (
    <>
      {/* ====== GRID DE CURSOS ====== */}
      {!selectedCurso && (
        <div className="content-wrapper py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
            {cursos.map((curso) => {
              const count = curso.modalidades?.length || 0;

              return (
                <button
                  key={curso.documentId}
                  onClick={() => setSelectedCurso(curso)}
                  className="group relative flex flex-col items-center justify-center rounded-xl border overflow-hidden transition-all hover:scale-[1.03] hover:shadow-lg py-8 md:py-10"
                  style={{
                    background: `linear-gradient(145deg, ${curso.cor || "#1a1a1a"}22, ${curso.cor || "#1a1a1a"}08)`,
                    borderColor: `${curso.cor || "var(--border)"}44`,
                  }}
                  id={`curso-${curso.slug || curso.id}`}
                >
                  {/* Brilho sutil no hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at center, ${curso.cor || "#8b1a1a"}20 0%, transparent 70%)`,
                    }}
                  />

                  {/* Foto do curso ou fallback com inicial */}
                  {curso.foto_capa?.url ? (
                    <img
                      src={`${STRAPI_URL}${curso.foto_capa.url}`}
                      alt={curso.nome}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover mb-3 relative z-10 transition-transform group-hover:scale-110"
                      style={{ border: `1.5px solid ${curso.cor || '#8b1a1a'}44` }}
                    />
                  ) : (
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-3 relative z-10 font-heading text-[24px] md:text-[28px] transition-transform group-hover:scale-110"
                      style={{
                        background: `${curso.cor || '#8b1a1a'}20`,
                        border: `1.5px solid ${curso.cor || '#8b1a1a'}44`,
                        color: curso.cor || 'var(--crimson-light)',
                      }}
                    >
                      {curso.nome.charAt(0)}
                    </div>
                  )}
                  <span
                    className="text-[14px] md:text-[16px] font-semibold relative z-10"
                    style={{ color: "var(--text)" }}
                  >
                    {curso.nome}
                  </span>
                  <span
                    className="text-[12px] mt-1 relative z-10"
                    style={{ color: "var(--text3)" }}
                  >
                    {count} {count === 1 ? "modalidade" : "modalidades"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ====== LISTA DE MODALIDADES (Nível 2) ====== */}
      {selectedCurso && (
        <div className="content-wrapper py-6 md:py-10">
          {/* Header com botão voltar */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCurso(null)}
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-[13px] font-medium transition-all hover:opacity-70"
              style={{ color: "var(--text2)", background: "var(--surface)" }}
              id="times-back-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Voltar
            </button>
            <div
              className="text-[12px] font-semibold px-3 py-1 rounded-full"
              style={{
                background: `${selectedCurso.cor || "#8b1a1a"}22`,
                color: selectedCurso.cor || "var(--crimson-light)",
                border: `1px solid ${selectedCurso.cor || "#8b1a1a"}44`,
              }}
            >
              {selectedCurso.nome}
            </div>
          </div>

          <h2
            className="font-heading tracking-wide mb-6"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--text)" }}
          >
            Modalidades
          </h2>

          {modalidadesFiltradas.length === 0 ? (
            <p className="text-[15px] text-center py-12" style={{ color: "var(--text3)" }}>
              Nenhuma modalidade cadastrada para este curso.
            </p>
          ) : (
            <div className="flex flex-col gap-3 md:gap-4 max-w-3xl">
              {modalidadesFiltradas.map((mod) => (
                <ModalidadeCard
                  key={mod.documentId}
                  modalidade={mod}
                  cursoColor={selectedCurso.cor}
                  onClick={() => setSelectedMod(mod)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ====== DETALHE DA MODALIDADE (Nível 3 Slide-in) ====== */}
      {selectedMod && selectedCurso && (
        <ModalidadeDetail
          modalidade={selectedMod}
          cursoNome={selectedCurso.nome}
          cursoColor={selectedCurso.cor}
          onClose={() => setSelectedMod(null)}
        />
      )}
    </>
  );
}

/* ====== CARD DE MODALIDADE ====== */

function ModalidadeCard({
  modalidade,
  cursoColor,
  onClick,
}: {
  modalidade: Modalidade;
  cursoColor: string | null;
  onClick: () => void;
}) {
  const color = cursoColor || "#8b1a1a";

  // Badge dinâmico: detecta gênero pelo nome
  const badges: { label: string; style: string }[] = [];
  const nomeLower = modalidade.nome.toLowerCase();

  if (nomeLower.includes("masculin")) {
    badges.push({
      label: "Masculino",
      style: "bg-[rgba(66,133,244,0.12)] text-[#90b4f8] border-[rgba(66,133,244,0.3)]",
    });
  }
  if (nomeLower.includes("feminin")) {
    badges.push({
      label: "Feminino",
      style: "bg-[rgba(244,66,128,0.12)] text-[#f490b4] border-[rgba(244,66,128,0.3)]",
    });
  }
  if (modalidade.capitao_nome) {
    badges.push({
      label: `Cap: ${modalidade.capitao_nome}`,
      style: "bg-[rgba(201,168,76,0.1)] text-[#e8c97a] border-[rgba(201,168,76,0.25)]",
    });
  }

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 w-full text-left rounded-xl border p-4 md:p-5 transition-all hover:shadow-lg"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
      id={`mod-${modalidade.documentId}`}
    >
      {/* Foto do time ou fallback com inicial */}
      {(() => {
        const fotoUrl = modalidade.foto_time?.formats?.thumbnail?.url || modalidade.foto_time?.url;
        if (fotoUrl) {
          return (
            <img
              src={`${STRAPI_URL}${fotoUrl}`}
              alt={modalidade.nome}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shrink-0 transition-transform group-hover:scale-110"
              style={{ border: `1px solid ${color}30` }}
            />
          );
        }
        return (
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shrink-0 font-heading text-[18px] md:text-[20px] transition-transform group-hover:scale-110"
            style={{
              background: `${color}18`,
              border: `1px solid ${color}30`,
              color: color,
            }}
          >
            {modalidade.nome.charAt(0)}
          </div>
        );
      })()}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3
          className="text-[15px] md:text-[16px] font-semibold mb-1 truncate"
          style={{ color: "var(--text)" }}
        >
          {modalidade.nome}
        </h3>

        {/* Badges dinâmicos */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {badges.map((badge, i) => (
              <span
                key={i}
                className={`text-[10px] md:text-[11px] font-semibold px-2.5 py-[3px] rounded-md border ${badge.style}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Chevron */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--text3)"
        strokeWidth="2"
        className="shrink-0 transition-transform group-hover:translate-x-1"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}
