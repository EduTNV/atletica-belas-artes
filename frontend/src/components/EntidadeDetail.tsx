"use client";

import { urlFor } from "@/lib/sanity.image";
import type { EntidadeDTO, MembroEntidadeDTO } from "@/types/sanity";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface EntidadeDetailProps {
  entidade: EntidadeDTO;
  onClose: () => void;
}

export function EntidadeDetail({ entidade, onClose }: EntidadeDetailProps) {
  const panelRef = useFocusTrap(true);
  const logoUrl = entidade.logo?.asset 
    ? urlFor(entidade.logo).width(1200).url() 
    : null;

  const membros = [...(entidade.membros || [])].sort(
    (a, b) => (a.ordem ?? 99) - (b.ordem ?? 99)
  );

  return (
    <>
      <div className="drawer-overlay open" onClick={onClose} style={{ zIndex: 9998 }} />

      <div ref={panelRef} className="slide-panel open" style={{ zIndex: 9999, top: 0, bottom: 0 }}>
        <div className="panel-header">
          <button className="back-btn" onClick={onClose} id="ent-detail-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Entidades
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Hero com Background Image (Foto do Card) */}
          <div
            style={{
              height: "clamp(200px, 35vh, 320px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background: foto da entidade (logo) como banner */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: logoUrl 
                  ? `url('${logoUrl}') center/cover no-repeat` 
                  : "linear-gradient(160deg, #e02c2c 0%, #f4f4f4 100%)",
              }}
            />

            {/* Overlay escuro para legibilidade */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 70%)",
              }}
            />

            {/* Nome da entidade sobre o banner */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px clamp(24px, 5vw, 32px)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(24px, 4vw, 36px)",
                  color: "#f4f4f4",
                  letterSpacing: "0.5px",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  margin: 0
                }}
              >
                {entidade.nome}
              </h2>
            </div>
          </div>

          <div 
            className="detail-body py-6"
            style={{ 
              paddingLeft: "clamp(24px, 5vw, 32px)", 
              paddingRight: "clamp(24px, 5vw, 32px)" 
            }}
          >
            {/* TAREFA 3.5: Descrição alinhada à esquerda */}
            {entidade.descricao && (
              <div className="pb-6">
                <p
                  className="text-[14px] md:text-[15px] leading-relaxed"
                  style={{ color: "var(--text-main)", textAlign: "left" }}
                >
                  {entidade.descricao}
                </p>
              </div>
            )}

            {membros.length > 0 && (
              <>
                <div className="border-t mb-6" style={{ borderColor: "var(--border)" }} />
                
                <p
                  className="text-[11px] font-bold tracking-wider uppercase mb-4"
                  style={{ color: "var(--text3)" }}
                >
                  Diretoria · {membros.length} {membros.length === 1 ? "membro" : "membros"}
                </p>

                {/* TAREFA 3.3: Grid 2x2 nos membros */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {membros.map((membro) => (
                    <MembroCard key={membro._id} membro={membro} />
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

function MembroCard({ membro }: { membro: MembroEntidadeDTO }) {
  const fotoUrl = membro.foto?.asset 
    ? urlFor(membro.foto).width(100).height(100).url() 
    : null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        background: "#ececec",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {fotoUrl ? (
        <img
          src={fotoUrl}
          alt={membro.nome}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#5c6484",
            color: "#f4f4f4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {getInitials(membro.nome)}
        </div>
      )}

      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ 
          fontSize: "13px", 
          fontWeight: 600, 
          color: "#1a1a1a", 
          whiteSpace: "nowrap", 
          overflow: "hidden", 
          textOverflow: "ellipsis" 
        }}>
          {membro.nome}
        </p>
        {membro.cargo && (
          <p style={{ 
            fontSize: "11px", 
            color: "#6e6a64", 
            whiteSpace: "nowrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis" 
          }}>
            {membro.cargo}
          </p>
        )}
      </div>
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
