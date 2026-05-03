"use client";

import { useState } from "react";
import type { Entidade } from "@/lib/strapi";
import { EntidadeDetail } from "@/components/EntidadeDetail";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface EntidadesListProps {
  entidades: Entidade[];
}

export function EntidadesList({ entidades }: EntidadesListProps) {
  const [selected, setSelected] = useState<Entidade | null>(null);

  if (entidades.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[15px]" style={{ color: "var(--text3)" }}>
          Nenhuma entidade cadastrada ainda.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="content-wrapper py-8 md:py-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-20">
          {entidades.map((ent) => {
            const color = ent.cor || "#8b1a1a";
            const logoUrl = ent.logo?.url ? `${STRAPI_URL}${ent.logo.url}` : null;

            return (
              <div
                key={ent.documentId}
                className="flex flex-col"
                id={`ent-${ent.documentId}`}
              >
                <h3
                  className="text-[20px] md:text-[24px] font-bold tracking-tight mb-3"
                  style={{ color: "var(--text)" }}
                >
                  {ent.nome}
                </h3>

                <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start mb-6">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={ent.nome}
                      className="w-full md:w-[280px] lg:w-[320px] aspect-[16/10] rounded-2xl object-cover shrink-0"
                      style={{ border: `1px solid ${color}33` }}
                    />
                  ) : (
                    <div
                      className="w-full md:w-[280px] lg:w-[320px] aspect-[16/10] rounded-2xl flex items-center justify-center font-heading text-[44px] shrink-0"
                      style={{
                        background: `${color}15`,
                        border: `1px solid ${color}33`,
                        color: color,
                      }}
                    >
                      {ent.nome.charAt(0)}
                    </div>
                  )}

                  <p
                    className="text-[15px] md:text-[16px] leading-[1.7]"
                    style={{ color: "var(--text-main)" }}
                  >
                    {ent.descricao || "Sem descrição disponível."}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => setSelected(ent)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "rgba(224, 44, 44, 0.08)",
                      color: "var(--crimson)",
                      border: "1px solid rgba(224, 44, 44, 0.2)",
                    }}
                  >
                    Veja os membros
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selected && (
        <EntidadeDetail
          entidade={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
