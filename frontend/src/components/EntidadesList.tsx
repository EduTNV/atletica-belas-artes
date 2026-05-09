"use client";

import { useState } from "react";
import { EntidadeDetail } from "@/components/EntidadeDetail";
import { urlFor } from "@/lib/sanity.image";

interface EntidadesListProps {
  entidades: any[];
}

export function EntidadesList({ entidades }: EntidadesListProps) {
  const [selected, setSelected] = useState<any | null>(null);

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
      <div className="content-wrapper py-8 md:py-12" style={{ paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-20">
          {entidades.map((ent: any) => {
            const logoUrl = ent.logo?.asset 
              ? urlFor(ent.logo).width(600).url() 
              : null;

            return (
              <div
                key={ent._id || ent.documentId}
                className="flex flex-col"
                id={`ent-${ent._id || ent.documentId}`}
              >
                <h3
                  className="tracking-tight mb-3"
                  style={{ 
                    fontSize: "clamp(18px, 2vw, 22px)", 
                    fontWeight: 700,
                    color: "var(--text-main)"
                  }}
                >
                  {ent.nome}
                </h3>

                <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start mb-6">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={ent.nome}
                      className="w-full md:w-[280px] lg:w-[320px] aspect-[16/10] rounded-2xl object-cover shrink-0"
                      style={{ border: "1px solid var(--border)" }}
                    />
                  ) : (
                    <div
                      className="w-full md:w-[280px] lg:w-[320px] aspect-[16/10] rounded-2xl flex items-center justify-center font-heading text-[44px] shrink-0"
                      style={{
                        background: "var(--surface2)",
                        border: "1px solid var(--border)",
                        color: "var(--text3)",
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
                    style={{
                      background: "#5c6484",
                      color: "#f4f4f4",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 18px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Ver membros →
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
