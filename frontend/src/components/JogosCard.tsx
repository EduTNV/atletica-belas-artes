"use client";

import type { JogoDTO } from "@/types/sanity";

interface JogosCardProps {
  jogos: JogoDTO[];
}

/** Componente que exibe o card de jogos na Home: Ao Vivo, Próximo Jogo e Último Resultado */
export function JogosCard({ jogos }: JogosCardProps) {
  const emAndamento = jogos.find((j) => j.estado === "em_andamento") || null;

  const proximoJogo = jogos
    .filter((j) => j.estado === "proximo")
    .sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime())[0] || null;

  const ultimoResultado = jogos
    .filter((j) => j.estado === "finalizado")
    .sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime())[0] || null;

  if (!proximoJogo && !emAndamento && !ultimoResultado) return null;

  const lateralPadding = "clamp(16px, 3vw, 24px)";

  return (
    <section className="content-wrapper" style={{ paddingTop: "clamp(24px, 4vw, 40px)" }}>
      <div
        className="w-full max-w-3xl flex flex-col rounded-md overflow-hidden mx-auto"
        style={{
          background: "#404559",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* AO VIVO */}
        {emAndamento && (
          <div className="flex flex-col">
            <div style={{ paddingTop: "10px", paddingBottom: "0", paddingLeft: lateralPadding, paddingRight: lateralPadding }}>
              <span
                className="inline-flex items-center gap-2 text-[11px] md:text-[12px] font-bold uppercase tracking-wider"
                style={{ background: "#4caf50", color: "#ffffff", padding: "6px 12px", borderRadius: "6px" }}
              >
                <span
                  className="inline-block rounded-full animate-pulse"
                  style={{
                    width: "7px",
                    height: "7px",
                    background: "#ffffff",
                  }}
                />
                Ao Vivo
              </span>
            </div>
            <JogoRow jogo={emAndamento} tipo="ao_vivo" lateralPadding={lateralPadding} />
          </div>
        )}

        {/* PRÓXIMO JOGO */}
        {proximoJogo && (
          <div className="flex flex-col" style={emAndamento ? { borderTop: "1px solid rgba(255,255,255,0.05)" } : undefined}>
            <div style={{ paddingTop: "10px", paddingBottom: "0", paddingLeft: lateralPadding, paddingRight: lateralPadding }}>
              <span
                className="inline-block text-[11px] md:text-[12px] font-bold uppercase tracking-wider"
                style={
                  emAndamento
                    ? { color: "rgba(255,255,255,0.5)" }
                    : { background: "var(--crimson)", color: "#ffffff", padding: "6px 12px", borderRadius: "6px" }
                }
              >
                Próximo Jogo
              </span>
            </div>
            <JogoRow jogo={proximoJogo} tipo={emAndamento ? "secundario" : "proximo"} lateralPadding={lateralPadding} />
          </div>
        )}

        {/* ÚLTIMO RESULTADO */}
        {ultimoResultado && (
          <div className="flex flex-col" style={(emAndamento || proximoJogo) ? { borderTop: "1px solid rgba(255,255,255,0.05)" } : undefined}>
            <div style={{ paddingTop: "10px", paddingBottom: "0", paddingLeft: lateralPadding, paddingRight: lateralPadding }}>
              <span
                className="inline-block text-[11px] md:text-[12px] font-bold uppercase tracking-wider"
                style={
                  (emAndamento || proximoJogo)
                    ? { color: "rgba(255,255,255,0.5)" }
                    : { background: "#7c84a4", color: "#ffffff", padding: "6px 12px", borderRadius: "6px" }
                }
              >
                Último Resultado
              </span>
            </div>
            <JogoRow jogo={ultimoResultado} tipo={(emAndamento || proximoJogo) ? "secundario" : "resultado"} lateralPadding={lateralPadding} />
          </div>
        )}
      </div>
    </section>
  );
}

/** Renderiza a linha de um jogo contendo hora, placar e detalhes da partida */
function JogoRow({ jogo, tipo, lateralPadding }: { jogo: JogoDTO; tipo: "proximo" | "ao_vivo" | "secundario" | "resultado"; lateralPadding: string }) {
  const dataObj = new Date(jogo.data_hora);
  const horaFormatada = dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dataFormatada = dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  const temPlacar = jogo.placar_casa !== null && jogo.placar_visitante !== null;

  const nomeModalidade = jogo.modalidade?.nome || "";
  const siglaComp = jogo.competicao || nomeModalidade;
  const textoRodape = [siglaComp, jogo.fase, jogo.local].filter(Boolean).join(" • ");

  const borderColors: Record<string, string> = {
    ao_vivo: "#4caf50",
    proximo: "var(--crimson)",
    resultado: "#7c84a4",
    secundario: "transparent",
  };

  return (
    <div
      className="flex relative"
      style={{
        borderLeft: `2px solid ${borderColors[tipo]}`,
        padding: `14px ${lateralPadding} 12px`,
        gap: "16px",
        alignItems: "center",
      }}
    >
      <div
        className="shrink-0 text-center flex flex-col justify-center"
        style={{ width: "52px" }}
      >
        <span
          className="font-light leading-none block"
          style={{ color: "#ffffff", fontSize: "clamp(17px, 4vw, 24px)", letterSpacing: "-0.5px" }}
        >
          {horaFormatada}
        </span>
        <span
          className="font-medium tracking-widest mt-1 block uppercase"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px" }}
        >
          {dataFormatada}
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-2 min-w-0">

        <div className="grid items-center gap-2" style={{ gridTemplateColumns: "1fr auto 1fr" }}>

          <div
            className="text-right font-medium tracking-wide uppercase truncate"
            style={{ color: "#ffffff", fontSize: "clamp(11px, 3vw, 15px)" }}
          >
            {jogo.time_casa}
          </div>

          <div className="flex items-center justify-center gap-1 shrink-0" style={{ minWidth: "44px" }}>
            {temPlacar ? (
              <>
                <span className="font-heading leading-none" style={{ color: "var(--crimson)", fontSize: "clamp(20px, 5vw, 28px)" }}>
                  {jogo.placar_casa}
                </span>
                <span className="font-heading leading-none" style={{ color: "rgba(255,255,255,0.25)", fontSize: "clamp(13px, 3vw, 17px)" }}>
                  –
                </span>
                <span className="font-heading leading-none" style={{ color: "var(--crimson)", fontSize: "clamp(20px, 5vw, 28px)" }}>
                  {jogo.placar_visitante}
                </span>
              </>
            ) : (
              <span className="font-heading leading-none" style={{ color: "rgba(255,255,255,0.2)", fontSize: "clamp(18px, 4vw, 24px)" }}>
                ×
              </span>
            )}
          </div>

          <div
            className="text-left font-medium tracking-wide uppercase truncate"
            style={{ color: "#ffffff", fontSize: "clamp(11px, 3vw, 15px)" }}
          >
            {jogo.time_visitante}
          </div>

        </div>

        {textoRodape && (
          <div
            className="text-center truncate"
            style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}
          >
            {textoRodape}
          </div>
        )}

      </div>
    </div>
  );
}
