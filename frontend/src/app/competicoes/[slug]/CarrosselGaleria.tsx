"use client";

import { useState } from "react";
import { urlFor } from "@/lib/sanity.image";

interface FotoGaleria {
  asset: { _ref: string };
  caption?: string;
}

interface CarrosselGaleriaProps {
  fotos: FotoGaleria[];
}

export function CarrosselGaleria({ fotos }: CarrosselGaleriaProps) {
  const [indiceAtual, setIndiceAtual] = useState(0);

  if (!fotos || fotos.length === 0) return null;

  const total = fotos.length;

  function avancar() {
    setIndiceAtual((prev) => (prev + 1) % total);
  }

  function recuar() {
    setIndiceAtual((prev) => (prev - 1 + total) % total);
  }

  /** Retorna os índices das 3 fotos visíveis no desktop (esq, centro, dir) */
  function indicesVisiveis() {
    const esq = (indiceAtual - 1 + total) % total;
    const dir = (indiceAtual + 1) % total;
    return [esq, indiceAtual, dir];
  }

  const [esq, centro, dir] = indicesVisiveis();

  return (
    <div style={{ marginTop: "clamp(48px, 6vw, 80px)" }}>
      <h2
        className="font-heading mb-8"
        style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--text)" }}
      >
        Galeria
      </h2>

      {/* Desktop: 3 fotos lado a lado */}
      <div className="hidden md:block relative">
        <div className="flex items-center justify-center gap-4">
          {[esq, centro, dir].map((idx, pos) => {
            const foto = fotos[idx];
            const isAtivo = pos === 1;
            const fotoUrl = foto?.asset
              ? urlFor(foto).width(680).height(440).fit("crop").url()
              : null;

            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  style={{
                    width: "340px",
                    height: "220px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: isAtivo
                      ? "2px solid var(--crimson)"
                      : "2px solid transparent",
                    opacity: isAtivo ? 1 : 0.55,
                    transition: "opacity 0.4s ease, border-color 0.4s ease",
                    flexShrink: 0,
                  }}
                >
                  {fotoUrl ? (
                    <img
                      src={fotoUrl}
                      alt={foto.caption || `Foto ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "var(--surface2)",
                      }}
                    />
                  )}
                </div>
                {foto.caption && (
                  <p
                    className="mt-2 text-center"
                    style={{ fontSize: "12px", color: "var(--text3)", maxWidth: "340px" }}
                  >
                    {foto.caption}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Botões laterais */}
        <button
          onClick={recuar}
          aria-label="Foto anterior"
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "var(--crimson)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={avancar}
          aria-label="Próxima foto"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "var(--crimson)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile: 1 foto por vez */}
      <div className="md:hidden flex flex-col items-center gap-4">
        {(() => {
          const foto = fotos[indiceAtual];
          const fotoUrl = foto?.asset
            ? urlFor(foto).width(800).height(480).fit("crop").url()
            : null;
          return (
            <>
              <div style={{ width: "100%", height: "240px", borderRadius: "12px", overflow: "hidden" }}>
                {fotoUrl ? (
                  <img
                    src={fotoUrl}
                    alt={foto.caption || `Foto ${indiceAtual + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "var(--surface2)" }} />
                )}
              </div>
              {foto.caption && (
                <p className="text-center" style={{ fontSize: "12px", color: "var(--text3)" }}>
                  {foto.caption}
                </p>
              )}
            </>
          );
        })()}

        {/* Botões mobile */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={recuar}
            aria-label="Foto anterior"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--crimson)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
            }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={avancar}
            aria-label="Próxima foto"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--crimson)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
            }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p style={{ fontSize: "12px", color: "var(--text3)" }}>
          {indiceAtual + 1} / {total}
        </p>
      </div>
    </div>
  );
}
