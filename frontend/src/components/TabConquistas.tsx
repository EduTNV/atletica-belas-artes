import type { ConquistaDTO } from "@/types/sanity";
import { EmptyState } from "./EmptyState";

const medalhaConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  ouro: { label: "OURO", color: "#c9a84c", bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.3)" },
  prata: { label: "PRATA", color: "#666666", bg: "rgba(0,0,0,0.05)", border: "rgba(0,0,0,0.1)" },
  bronze: { label: "BRONZE", color: "#cd7f32", bg: "rgba(205,127,50,0.1)", border: "rgba(205,127,50,0.3)" },
  premio: { label: "PRÊMIO", color: "#e02c2c", bg: "rgba(224,44,44,0.1)", border: "rgba(224,44,44,0.3)" },
};

export function TabConquistas({ conquistas }: { conquistas: ConquistaDTO[] }) {
  if (conquistas.length === 0) {
    return <EmptyState text="Nenhuma conquista registrada ainda." />;
  }

  return (
    <div className="flex flex-col gap-2">
      {conquistas.map((c) => {
        const config = c.medalha ? medalhaConfig[c.medalha] : medalhaConfig.premio;
        return (
          <div
            key={c._id}
            className="flex items-center gap-3 py-3 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium truncate" style={{ color: "#000000" }}>
                {c.titulo}
              </p>
              {c.ano && (
                <p className="text-[11px]" style={{ color: "var(--text3)" }}>
                  {c.ano}
                </p>
              )}
            </div>
            <span
              className="text-[10px] font-bold px-2 py-1 rounded-lg shrink-0"
              style={{ color: config.color, background: config.bg, border: `0.5px solid ${config.border}` }}
            >
              {config.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
