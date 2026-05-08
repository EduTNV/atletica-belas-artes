"use client";

import type { Jogo } from "@/lib/strapi";

interface JogosCardProps {
  jogos: Jogo[];
}

/** Componente que exibe os próximos jogos e os últimos resultados */
export function JogosCard({ jogos }: JogosCardProps) {
  const agora = new Date();

  const proximoJogo = jogos
    .filter((j) => new Date(j.data_hora) > agora)
    .sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime())[0] || null;

  const ultimoJogo = jogos
    .filter((j) => new Date(j.data_hora) <= agora)
    .sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime())[0] || null;

  if (!proximoJogo && !ultimoJogo) return null;

  const lateralPadding = "clamp(16px, 3vw, 24px)";

  return (
    <section className="content-wrapper flex justify-center" style={{ paddingTop: "clamp(24px, 4vw, 40px)" }}>
      <div
        className="w-full max-w-3xl flex flex-col rounded-md overflow-hidden"
        style={{
          background: "#404559",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {proximoJogo && (
          <div className="flex flex-col">
            <div style={{ paddingTop: "10px", paddingBottom: "0", paddingLeft: lateralPadding, paddingRight: lateralPadding }}>
              <span
                className="inline-block text-[11px] md:text-[12px] font-bold uppercase tracking-wider"
                style={{ background: "var(--crimson)", color: "#ffffff", padding: "6px 12px", borderRadius: "6px" }}
              >
                Próximo Jogo
              </span>
            </div>
            <JogoRow jogo={proximoJogo} tipo="proximo" lateralPadding={lateralPadding} />
          </div>
        )}

        {ultimoJogo && (
          <div className="flex flex-col mt-2">
            <div style={{ paddingTop: "10px", paddingBottom: "0", paddingLeft: lateralPadding, paddingRight: lateralPadding, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Último Resultado
              </span>
            </div>
            <JogoRow jogo={ultimoJogo} tipo="ultimo" lateralPadding={lateralPadding} />
          </div>
        )}
      </div>
    </section>
  );
}

/** Renderiza a linha de um jogo contendo hora, placar e detalhes da partida */
function JogoRow({ jogo, tipo, lateralPadding }: { jogo: Jogo; tipo: "proximo" | "ultimo"; lateralPadding: string }) {
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

  const siglaComp = jogo.competicao || jogo.modalidade_nome;
  const textoRodape = [siglaComp, jogo.fase, jogo.local].filter(Boolean).join(" • ");

  return (
    <div
      className="flex relative"
      style={{
        borderLeft: tipo === "proximo" ? "2px solid var(--crimson)" : "2px solid transparent",
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
