"use client";

import type { Evento } from "@/lib/strapi";
import { formatDate } from "@/components/EventCard";

interface EventDetailProps {
  evento: Evento;
  onClose: () => void;
}

/**
 * Painel de detalhe do evento — desliza da direita (mobile) ou abre como drawer (desktop).
 * Inclui Sticky CTA que redireciona para o link de ingresso definido pelo diretor no Strapi.
 */
export function EventDetail({ evento, onClose }: EventDetailProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // Imagem: arte do Strapi ou placeholder
  const placeholderImages = [
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540039155732-68ee23e15b51?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
  ];

  const img = evento.arte?.url
    ? `${STRAPI_URL}${evento.arte.url}`
    : placeholderImages[evento.id % placeholderImages.length];

  // Formata data completa (dia, mês, ano + hora)
  const dataObj = new Date(evento.data);
  const dataFormatada = dataObj.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const horaFormatada = dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Status visual do lote
  const statusLabels: Record<string, string> = {
    vendas_abertas: "Vendas Abertas",
    lote_2: "Lote 2",
    lote_3: "Lote 3",
    esgotado: "Esgotado",
  };

  const statusLabel = evento.status_lote
    ? statusLabels[evento.status_lote] || "Em breve"
    : "Em breve";

  const isEsgotado = evento.status_lote === "esgotado";

  return (
    <>
      {/* Overlay escuro (desktop drawer) */}
      <div className="drawer-overlay open" onClick={onClose} />

      {/* Painel slide-in */}
      <div className="slide-panel open" style={{ zIndex: 200 }}>
        {/* Header com botão voltar */}
        <div className="panel-header">
          <button className="back-btn" onClick={onClose} id="event-detail-back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Voltar
          </button>
        </div>

        {/* Conteúdo scrollável */}
        <div className="flex-1 overflow-y-auto">
          {/* Imagem hero do evento */}
          <div
            className="relative w-full"
            style={{ height: "clamp(200px, 35vh, 320px)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />

            {/* Badge de status sobre a imagem */}
            <div className="absolute top-4 right-4">
              <span
                className="text-[11px] font-bold px-4 py-2 rounded-lg backdrop-blur-sm"
                style={{
                  background: isEsgotado
                    ? "rgba(100,100,100,0.8)"
                    : "rgba(139, 26, 26, 0.85)",
                  color: "var(--text)",
                }}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          {/* Informações do evento */}
          <div className="px-6 md:px-8 py-6" style={{ marginTop: "-24px", position: "relative", zIndex: 2 }}>
            <h2
              className="font-heading tracking-wide mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "var(--text)" }}
            >
              {evento.nome}
            </h2>

            {/* Data e hora */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(139, 26, 26, 0.2)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--crimson-light)" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-medium capitalize" style={{ color: "var(--text)" }}>
                  {dataFormatada}
                </p>
                <p className="text-[13px]" style={{ color: "var(--text3)" }}>
                  {horaFormatada}
                </p>
              </div>
            </div>

            {/* Local */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(201, 168, 76, 0.15)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-medium" style={{ color: "var(--text)" }}>
                  {evento.local}
                </p>
                {evento.endereco && (
                  <p className="text-[13px]" style={{ color: "var(--text3)" }}>
                    {evento.endereco}
                  </p>
                )}
              </div>
            </div>

            {/* Separador */}
            <div className="divider !mx-0 !my-6" />

            {/* Informações adicionais se houver aftermovie */}
            {evento.aftermovie_url && (
              <a
                href={evento.aftermovie_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 px-4 rounded-xl mb-4 transition-all hover:opacity-80"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
              >
                <span className="text-[20px]">🎬</span>
                <div>
                  <p className="text-[14px] font-medium" style={{ color: "var(--text)" }}>
                    Aftermovie
                  </p>
                  <p className="text-[12px]" style={{ color: "var(--text3)" }}>
                    Assista ao vídeo do evento
                  </p>
                </div>
                <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Sticky CTA — Comprar Ingresso */}
        {evento.link_ingresso && !isEsgotado && (
          <div className="sticky-cta">
            <a
              href={evento.link_ingresso}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 rounded-xl text-center text-[15px] font-bold tracking-wide transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, var(--crimson), var(--crimson-light))",
                color: "var(--text)",
              }}
              id="event-detail-cta"
            >
              Comprar Ingresso
            </a>
          </div>
        )}

        {/* CTA esgotado */}
        {isEsgotado && (
          <div className="sticky-cta">
            <div
              className="flex-1 py-4 rounded-xl text-center text-[15px] font-bold tracking-wide opacity-50 cursor-not-allowed"
              style={{
                background: "var(--surface2)",
                color: "var(--text3)",
                border: "1px solid var(--border)",
              }}
            >
              Esgotado
            </div>
          </div>
        )}
      </div>
    </>
  );
}
