import type { JogoModalidadeDTO } from "@/types/sanity";
import { EmptyState } from "./EmptyState";

export function TabJogos({ jogos }: { jogos: JogoModalidadeDTO[] }) {
  if (jogos.length === 0) {
    return <EmptyState text="Nenhum jogo registrado." />;
  }

  const proximos = jogos.filter(j => j.estado === "proximo" || j.estado === "em_andamento")
    .sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime());
  const finalizados = jogos.filter(j => j.estado === "finalizado")
    .sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime());

  const statusLabels: Record<string, { label: string; color: string }> = {
    proximo: { label: "PRÓXIMO", color: "var(--crimson)" },
    em_andamento: { label: "AO VIVO", color: "#4caf50" },
  };

  return (
    <div className="flex flex-col gap-2">
      {proximos.length > 0 && (
        <>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: "var(--text3)" }}>
            Próximos
          </p>
          {proximos.map((j) => {
            const dataObj = new Date(j.data_hora);
            const dataStr = dataObj.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
            const horaStr = dataObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
            const st = statusLabels[j.estado];

            return (
              <div
                key={j._id}
                className="flex items-center gap-3 py-3 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-[3px] h-10 rounded-full shrink-0"
                  style={{ background: st.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate" style={{ color: "#000000" }}>
                    {j.time_casa} vs {j.time_visitante}
                  </p>
                  <p className="text-[11px] truncate" style={{ color: "var(--text3)" }}>
                    {[j.competicao, j.fase, j.local].filter(Boolean).join(" · ") || dataStr}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[12px] font-semibold" style={{ color: "var(--text2)" }}>
                    {dataStr} · {horaStr}
                  </p>
                  <p className="text-[9px] font-bold tracking-wider" style={{ color: st.color }}>
                    {st.label}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}

      {finalizados.length > 0 && (
        <>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: "var(--text3)", marginTop: proximos.length > 0 ? "16px" : "0" }}>
            Resultados
          </p>
          {finalizados.map((j) => {
            const nos = j.placar_casa ?? 0;
            const adv = j.placar_visitante ?? 0;
            
            let outcome = "draw";
            let outcomeLabel = "EMPATE";

            const isCasa = j.belas_artes_posicao === "casa" || !j.belas_artes_posicao;
            const isVisitante = j.belas_artes_posicao === "visitante";
            const isNenhum = j.belas_artes_posicao === "nenhum";

            if (!isNenhum) {
              if (nos > adv) {
                outcome = isCasa ? "win" : "loss";
                outcomeLabel = isCasa ? "VITÓRIA" : "DERROTA";
              } else if (nos < adv) {
                outcome = isVisitante ? "win" : "loss";
                outcomeLabel = isVisitante ? "VITÓRIA" : "DERROTA";
              }
            } else {
              if (nos > adv) {
                 outcomeLabel = "VITÓRIA CASA";
              } else if (nos < adv) {
                 outcomeLabel = "VITÓRIA VIS.";
              }
            }

            const colors: Record<string, { indicator: string; text: string }> = {
              win: { indicator: "#4caf50", text: "#4caf50" },
              loss: { indicator: "#f44336", text: "#f44336" },
              draw: { indicator: "#9e9e9e", text: "var(--text3)" },
            };

            return (
              <div
                key={j._id}
                className="flex items-center gap-3 py-3 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-[3px] h-10 rounded-full shrink-0"
                  style={{ background: colors[outcome].indicator }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate" style={{ color: "#000000" }}>
                    {j.time_casa} vs {j.time_visitante}
                  </p>
                  <p className="text-[11px] truncate" style={{ color: "var(--text3)" }}>
                    {j.competicao || "Amistoso"}
                    {j.data_hora && ` · ${new Date(j.data_hora).toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[15px] font-bold" style={{ color: colors[outcome].text }}>
                    {nos}–{adv}
                  </p>
                  <p className="text-[9px] font-bold tracking-wider" style={{ color: colors[outcome].text }}>
                    {outcomeLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
