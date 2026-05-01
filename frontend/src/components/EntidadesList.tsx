"use client";

import { useState } from "react";
import type { Entidade } from "@/lib/strapi";
import { EntidadeDetail } from "@/components/EntidadeDetail";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface EntidadesListProps {
  entidades: Entidade[];
}

/**
 * Client Component — Grid de Entidades com slide-in de detalhe.
 */
export function EntidadesList({ entidades }: EntidadesListProps) {
  const [selected, setSelected] = useState<Entidade | null>(null);

  if (entidades.length === 0) {
    return (
      <div className="content-wrapper py-24 text-center">
        <p className="text-[15px]" style={{ color: "var(--text3)" }}>
          Nenhuma entidade cadastrada ainda.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="content-wrapper py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {entidades.map((ent) => {
            const color = ent.cor || "#8b1a1a";
            const logoUrl = ent.logo?.url
              ? `${STRAPI_URL}${ent.logo.url}`
              : null;
            const membroCount = ent.membros?.length || 0;

            return (
              <button
                key={ent.documentId}
                onClick={() => setSelected(ent)}
                className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl border overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg text-center"
                style={{
                  background: `linear-gradient(145deg, ${color}15, ${color}05)`,
                  borderColor: `${color}33`,
                }}
                id={`ent-${ent.documentId}`}
              >
                {/* Glow no hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at center, ${color}18 0%, transparent 70%)`,
                  }}
                />

                {/* Logo */}
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={ent.nome}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover relative z-10 transition-transform group-hover:scale-110"
                    style={{ border: `1.5px solid ${color}44` }}
                  />
                ) : (
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-heading text-[24px] md:text-[28px] relative z-10 transition-transform group-hover:scale-110"
                    style={{
                      background: `${color}20`,
                      border: `1.5px solid ${color}44`,
                      color: color,
                    }}
                  >
                    {ent.nome.charAt(0)}
                  </div>
                )}

                {/* Nome */}
                <span
                  className="text-[15px] md:text-[17px] font-semibold relative z-10"
                  style={{ color: "var(--text)" }}
                >
                  {ent.nome}
                </span>

                {/* Contagem de membros */}
                <span className="text-[12px] relative z-10" style={{ color: "var(--text3)" }}>
                  {membroCount} {membroCount === 1 ? "membro" : "membros"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slide-in de detalhe */}
      {selected && (
        <EntidadeDetail
          entidade={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
