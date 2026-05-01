"use client";

import type { Entidade, MembroEntidade } from "@/lib/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface EntidadeDetailProps {
  entidade: Entidade;
  onClose: () => void;
}

/**
 * Slide-in para detalhe de uma Entidade — mostra descrição + lista de membros.
 */
export function EntidadeDetail({ entidade, onClose }: EntidadeDetailProps) {
  const color = entidade.cor || "#8b1a1a";

  const logoUrl = entidade.logo?.url
    ? `${STRAPI_URL}${entidade.logo.url}`
    : null;

  // Ordenar membros pela ordem (já vem da API, mas garantimos)
  const membros = [...(entidade.membros || [])].sort(
    (a, b) => (a.ordem ?? 99) - (b.ordem ?? 99)
  );

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay open" onClick={onClose} />

      {/* Painel slide-in */}
      <div className="slide-panel open" style={{ zIndex: 210 }}>
        {/* Header */}
        <div className="panel-header">
          <button className="back-btn" onClick={onClose} id="ent-detail-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Entidades
          </button>
        </div>

        {/* Conteúdo scrollável */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero */}
          <div className="relative" style={{ minHeight: "180px" }}>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${color}50 0%, ${color}15 50%, #0f0f0f 100%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />

            <div className="relative flex flex-col items-center justify-center py-10 px-6">
              {/* Logo da entidade */}
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={entidade.nome}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover mb-4"
                  style={{ border: `2px solid ${color}55` }}
                />
              ) : (
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center font-heading text-[28px] mb-4"
                  style={{
                    background: `${color}25`,
                    border: `2px solid ${color}55`,
                    color: color,
                  }}
                >
                  {entidade.nome.charAt(0)}
                </div>
              )}

              <h2
                className="font-heading text-center tracking-wide"
                style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "var(--text)" }}
              >
                {entidade.nome}
              </h2>
            </div>
          </div>

          {/* Descrição */}
          {entidade.descricao && (
            <div className="px-6 pb-6">
              <p
                className="text-[14px] md:text-[15px] leading-relaxed text-center"
                style={{ color: "var(--text2)" }}
              >
                {entidade.descricao}
              </p>
            </div>
          )}

          {/* Divisor */}
          <div className="border-t mx-6" style={{ borderColor: "var(--border)" }} />

          {/* Lista de Membros */}
          <div className="p-6">
            {membros.length === 0 ? (
              <p className="text-[14px] text-center py-8" style={{ color: "var(--text3)" }}>
                Membros serão adicionados em breve.
              </p>
            ) : (
              <>
                <p
                  className="text-[11px] font-bold tracking-wider uppercase mb-4"
                  style={{ color: "var(--text3)" }}
                >
                  Diretoria · {membros.length} {membros.length === 1 ? "membro" : "membros"}
                </p>

                <div className="flex flex-col gap-3">
                  {membros.map((membro) => (
                    <MembroCard key={membro.documentId} membro={membro} color={color} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ====== CARD DE MEMBRO ====== */

function MembroCard({ membro, color }: { membro: MembroEntidade; color: string }) {
  const fotoUrl = membro.foto?.url
    ? `${STRAPI_URL}${membro.foto.url}`
    : null;

  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl border"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Avatar */}
      {fotoUrl ? (
        <img
          src={fotoUrl}
          alt={membro.nome}
          className="w-12 h-12 rounded-full object-cover shrink-0"
          style={{ border: `1.5px solid ${color}44` }}
        />
      ) : (
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-heading text-[16px] shrink-0"
          style={{
            background: `${color}20`,
            border: `1.5px solid ${color}44`,
            color: color,
          }}
        >
          {getInitials(membro.nome)}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold truncate" style={{ color: "var(--text)" }}>
          {membro.nome}
        </p>
        {membro.cargo && (
          <p className="text-[12px] truncate" style={{ color: "var(--text3)" }}>
            {membro.cargo}
          </p>
        )}
      </div>

      {/* WhatsApp */}
      {membro.whatsapp && (
        <a
          href={`https://wa.me/55${membro.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all hover:scale-110"
          style={{ background: "rgba(37, 211, 102, 0.12)" }}
          title={`Falar com ${membro.nome}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      )}
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
