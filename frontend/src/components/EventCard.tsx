import Link from "next/link";
import type { Evento } from "@/lib/strapi";

/* ============================
   CONSTANTES E HELPERS
   ============================ */

/** Mapeia status_lote do Strapi para visual do badge */
const statusMap: Record<string, { label: string; color: "gold" | "green" | "neutral" }> = {
  vendas_abertas: { label: "À VENDA", color: "green" },
  lote_2: { label: "LOTE 2", color: "gold" },
  lote_3: { label: "LOTE 3", color: "gold" },
  esgotado: { label: "ESGOTADO", color: "neutral" },
};

const statusStyles = {
  gold: "bg-[rgba(201,168,76,0.12)] text-[#e8c97a] border-[rgba(201,168,76,0.3)]",
  green: "bg-[rgba(76,175,80,0.12)] text-[#81c784] border-[rgba(76,175,80,0.3)]",
  neutral: "bg-zinc-800/80 text-zinc-400 border-zinc-700",
};

/** Formata data ISO para exibição amigável em português */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });
}

/** Imagens placeholder para eventos sem arte no Strapi */
const placeholderImages = [
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540039155732-68ee23e15b51?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
];

/* ============================
   COMPONENTE
   ============================ */

interface EventCardProps {
  evento: Evento;
  className?: string;
  /** Se true, o card não linka para lugar nenhum (usado na galeria) */
  disableLink?: boolean;
}

/**
 * Card de evento reutilizável — alimentado por dados reais do Strapi.
 * Usado na Home Page (seção "Próximos Eventos") e na página /eventos.
 */
export function EventCard({ evento, className = "", disableLink = false }: EventCardProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // Imagem: usa arte do Strapi ou placeholder
  const img = evento.arte?.url
    ? `${STRAPI_URL}${evento.arte.url}`
    : placeholderImages[evento.id % placeholderImages.length];

  // Status do lote
  const status = evento.status_lote
    ? statusMap[evento.status_lote] || { label: "EM BREVE", color: "neutral" as const }
    : { label: "EM BREVE", color: "neutral" as const };

  const sharedClass = `flex flex-col rounded-[var(--radius)] overflow-hidden border group transition-all hover:border-[var(--crimson)] shadow-md hover:shadow-xl ${className}`;
  const sharedStyle = { background: "var(--surface)", borderColor: "var(--border)" };

  const cardContent = (
    <>
      {/* Imagem com overlay */}
      <div
        className="h-[220px] relative flex items-end overflow-hidden"
        style={{
          backgroundImage: `url('${img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "clamp(20px, 4vw, 32px)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <h3
          className="font-heading text-[28px] relative z-10 tracking-wide drop-shadow-md transition-colors group-hover:text-[var(--gold)]"
          style={{ color: "var(--text)", width: "100%", paddingLeft: "4px" }}
        >
          {evento.nome}
        </h3>
      </div>

      {/* Footer do card */}
      <div
        className="flex justify-between items-center"
        style={{ background: "var(--surface)", padding: "clamp(20px, 4vw, 32px)" }}
      >
        <div className="flex flex-col gap-1 pr-4 flex-1 min-w-0">
          <span
            className="text-[14px] font-semibold truncate"
            style={{ color: "var(--text)" }}
          >
            {formatDate(evento.data)}
          </span>
          <span className="text-[12px] truncate" style={{ color: "var(--text3)" }}>
            {evento.local}
          </span>
        </div>
        <span
          className={`shrink-0 text-[10px] font-bold px-4 py-1.5 rounded-md border tracking-wider ${statusStyles[status.color]}`}
        >
          {status.label}
        </span>
      </div>
    </>
  );

  if (disableLink) {
    return (
      <div className={sharedClass} style={sharedStyle}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link href="/eventos" className={sharedClass} style={sharedStyle}>
      {cardContent}
    </Link>
  );
}
