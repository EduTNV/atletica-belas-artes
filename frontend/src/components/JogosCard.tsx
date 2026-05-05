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

  return (
    <section className="content-wrapper py-16 md:py-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">

        {/* Próximo Jogo */}
        {proximoJogo && (
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase mb-3"
               style={{ color: "#5c6484" }}>
              Próximo Jogo
            </p>
            <JogoRow jogo={proximoJogo} tipo="proximo" />
          </div>
        )}

        {/* Último Resultado */}
        {ultimoJogo && (
          <div>
            <p className="text-[11px] font-bold tracking-[2px] uppercase mb-3"
               style={{ color: "#6e6a64" }}>
              Último Resultado
            </p>
            <JogoRow jogo={ultimoJogo} tipo="ultimo" />
          </div>
        )}
      </div>
    </section>
  );
}

function JogoRow({ jogo, tipo }: { jogo: Jogo; tipo: "proximo" | "ultimo" }) {
  const dataObj = new Date(jogo.data_hora);
  const dataFormatada = dataObj.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const horaFormatada = dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const temPlacar = jogo.placar_casa !== null && jogo.placar_visitante !== null;

  return (
    <div
      className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-xl border"
      style={{
        background: "#f4f4f4",
        borderColor: tipo === "proximo" ? "#5c6484" : "#e0e0e0",
        borderLeft: tipo === "proximo" ? "4px solid #e02c2c" : "4px solid #d0d0d0",
      }}
    >
      {/* Data e hora */}
      <div className="text-center shrink-0 hidden sm:block" style={{ minWidth: "80px" }}>
        <p className="text-[11px] font-bold uppercase" style={{ color: "#6e6a64" }}>
          {dataFormatada}
        </p>
        <p className="font-heading text-[22px]" style={{ color: "#1a1a1a" }}>
          {horaFormatada}
        </p>
      </div>

      <div className="w-px h-12 hidden sm:block" style={{ background: "#d0d0d0" }} />

      {/* Times e placar */}
      <div className="flex-1 flex items-center justify-center gap-4">
        <p className="font-semibold text-[15px] md:text-[17px] text-right flex-1"
           style={{ color: "#1a1a1a" }}>
          {jogo.time_casa}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          {temPlacar ? (
            <>
              <span className="font-heading text-[28px]" style={{ color: "#e02c2c" }}>
                {jogo.placar_casa}
              </span>
              <span className="font-heading text-[20px]" style={{ color: "#aaa" }}>–</span>
              <span className="font-heading text-[28px]" style={{ color: "#e02c2c" }}>
                {jogo.placar_visitante}
              </span>
            </>
          ) : (
            <span className="font-heading text-[18px]" style={{ color: "#aaa" }}>vs</span>
          )}
        </div>

        <p className="font-semibold text-[15px] md:text-[17px] text-left flex-1"
           style={{ color: "#1a1a1a" }}>
          {jogo.time_visitante}
        </p>
      </div>

      <div className="w-px h-12 hidden sm:block" style={{ background: "#d0d0d0" }} />

      {/* Competição e local */}
      <div className="text-center shrink-0 hidden sm:block" style={{ minWidth: "120px" }}>
        <p className="text-[12px] font-medium" style={{ color: "#5c6484" }}>
          {jogo.modalidade_nome}
        </p>
        {jogo.competicao && (
          <p className="text-[11px]" style={{ color: "#6e6a64" }}>
            {jogo.competicao}
          </p>
        )}
        {jogo.local && (
          <p className="text-[11px]" style={{ color: "#aaa" }}>
            {jogo.local}
          </p>
        )}
      </div>
    </div>
  );
}
