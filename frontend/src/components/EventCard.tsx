import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";
import type { Evento } from "@/lib/strapi";

const statusMap: Record<string, { label: string; color: "gold" | "green" | "neutral" }> = {
  vendas_abertas: { label: "À VENDA", color: "green" },
  lote_2: { label: "LOTE 2", color: "gold" },
  lote_3: { label: "LOTE 3", color: "gold" },
  esgotado: { label: "ESGOTADO", color: "neutral" },
};

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });
}

const placeholderImages = [
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540039155732-68ee23e15b51?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
];

interface EventCardProps {
  evento: Evento;
  className?: string;
  disableLink?: boolean;
}

export function EventCard({ evento, className = "", disableLink = false }: EventCardProps) {
  const img = getStrapiMedia(evento.arte?.url) || placeholderImages[evento.id % placeholderImages.length];

  const status = evento.status_lote
    ? statusMap[evento.status_lote] || { label: "EM BREVE", color: "neutral" as const }
    : { label: "EM BREVE", color: "neutral" as const };

  const sharedClass = `flex flex-col rounded-[var(--radius)] overflow-hidden border group transition-all hover:border-[var(--crimson)] shadow-md hover:shadow-xl ${className}`;
  const sharedStyle = { background: "var(--surface)", borderColor: "var(--border)" };

  const cardContent = (
    <>
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
          style={{ color: "#ffffff", width: "100%", paddingLeft: "4px" }}
        >
          {evento.nome}
        </h3>
      </div>

      <div
        className="flex justify-between items-center"
        style={{ background: "var(--surface)", padding: "clamp(20px, 4vw, 32px)" }}
      >
        <div className="flex flex-col gap-1 pr-4 flex-1 min-w-0">
          <span
            className="text-[14px] font-semibold truncate"
            style={{ color: "var(--crimson)" }}
          >
            {formatDate(evento.data)}
          </span>
          <span className="text-[12px] truncate" style={{ color: "var(--text-main)" }}>
            {evento.local}
          </span>
        </div>
        <span
          style={{
            background: "#5c6484",
            color: "#f4f4f4",
            fontSize: "10px",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "6px",
            letterSpacing: "0.5px",
          }}
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
