"use client";

import type { Jogo } from "@/lib/strapi";

interface JogosCardProps {
  jogos: Jogo[];
}

export function JogosCard({ jogos }: JogosCardProps) {
  const agora = new Date();

  const proximoJogo = jogos
    .filter((j) => new Date(j.data_hora) > agora)
    .sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime())[0] || null;

  const ultimoJogo = jogos
    .filter((j) => new Date(j.data_hora) <= agora)
    .sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime())[0] || null;

  if (!proximoJogo && !ultimoJogo) return null;

  // Garantindo a mesma distância lateral para tudo dentro do card
  const lateralPadding = "clamp(16px, 3vw, 24px)";

  return (
    <section className="content-wrapper flex justify-center" style={{ paddingTop: "clamp(24px, 4vw, 40px)" }}>
      <div 
        className="w-full max-w-3xl flex flex-col rounded-md overflow-hidden"
        style={{ 
          background: "#404559", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
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

function JogoRow({ jogo, tipo, lateralPadding }: { jogo: Jogo; tipo: "proximo" | "ultimo", lateralPadding: string }) {
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
  const textoRodape = jogo.fase ? `${siglaComp} • ${jogo.fase}` : siglaComp;

  return (
    <div 
      className="flex flex-col relative"
      style={{ 
        borderLeft: tipo === "proximo" ? "2px solid var(--crimson)" : "2px solid transparent"
      }}
    >
      {/* Linha Superior: Hora e Confronto */}
      <div 
        className="flex flex-col md:flex-row items-center gap-3 md:gap-5 relative"
        style={{ padding: `16px ${lateralPadding}` }}
      >
        
        {/* Hora (Esquerda no Mobile, Absoluto no Desktop para não interferir no Grid) */}
        <div 
          className="w-full md:w-auto md:absolute text-center md:text-left shrink-0 z-10"
          style={{ left: lateralPadding }}
        >
          <span className="text-[28px] md:text-[32px] font-light leading-none block" style={{ color: "#ffffff", letterSpacing: "-0.5px" }}>
            {horaFormatada}
          </span>
          <span className="text-[10px] md:text-[11px] font-medium tracking-widest mt-1 block uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
            {dataFormatada}
          </span>
        </div>

        {/* Confronto (Grid Perfeito garantindo centralização do placar) */}
        <div className="flex-1 w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-6">
          
          {/* Time A (Esquerda) */}
          <div className="text-right font-medium text-[14px] md:text-[16px] md:pl-[80px] tracking-wide uppercase" style={{ color: "#ffffff", wordBreak: "break-word" }}>
            {jogo.time_casa}
          </div>

          {/* Placar (Centro Exato) */}
          <div className="flex items-center justify-center gap-4 shrink-0 min-w-[60px]">
            {temPlacar ? (
              <>
                <span className="font-heading text-[28px] md:text-[32px] leading-none" style={{ color: "var(--crimson)" }}>
                  {jogo.placar_casa}
                </span>
                <span className="font-heading text-[28px] md:text-[32px] leading-none" style={{ color: "var(--crimson)" }}>
                  {jogo.placar_visitante}
                </span>
              </>
            ) : (
              <span className="font-heading text-[20px] md:text-[24px] leading-none" style={{ color: "rgba(255,255,255,0.2)" }}>
                -
              </span>
            )}
          </div>

          {/* Time B (Direita) */}
          <div className="text-left font-medium text-[14px] md:text-[16px] md:pr-[80px] tracking-wide uppercase" style={{ color: "#ffffff", wordBreak: "break-word" }}>
            {jogo.time_visitante}
          </div>
          
        </div>
      </div>

      {/* Linha Inferior: Informações adicionais (Usando O MESMO GRID para centralização perfeita) */}
      <div 
        className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4 pb-4"
        style={{ 
          padding: `0 ${lateralPadding}`
        }}
      >
        {/* Espaçador Esquerda para alinhar */}
        <div className="md:pl-[80px]"></div>

        {/* Competição / Fase (Centro Exato) */}
        <div className="text-center">
          <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.4)" }}>
            {textoRodape}
          </span>
        </div>

        {/* Local (Direita) */}
        <div className="text-right md:pr-[80px]">
          {jogo.local && (
            <span className="text-[9px] md:text-[10px] font-medium tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
              {jogo.local}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
