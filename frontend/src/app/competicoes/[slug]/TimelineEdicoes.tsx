"use client";

interface Edicao {
  _id: string;
  ano: number;
  titulo: string;
  resultado: string;
  descricao: string;
}

interface TimelineEdicoesProps {
  edicoes: Edicao[];
}

const resultadoConfig: Record<string, { label: string; color: string; bg: string }> = {
  ouro:        { label: "Ouro",            color: "#c9a84c", bg: "rgba(201,168,76,0.15)"  },
  prata:       { label: "Prata",           color: "#666666", bg: "rgba(0,0,0,0.08)"       },
  bronze:      { label: "Bronze",          color: "#cd7f32", bg: "rgba(205,127,50,0.15)"  },
  semifinal:   { label: "Semifinal",       color: "#5c6484", bg: "rgba(92,100,132,0.12)"  },
  quartas:     { label: "Quartas de Final",color: "#5c6484", bg: "rgba(92,100,132,0.12)"  },
  fase_grupos: { label: "Fase de Grupos",  color: "#999999", bg: "rgba(0,0,0,0.06)"       },
  participacao:{ label: "Participação",    color: "#999999", bg: "rgba(0,0,0,0.06)"       },
};

export function TimelineEdicoes({ edicoes }: TimelineEdicoesProps) {
  if (!edicoes || edicoes.length === 0) {
    return (
      <div
        className="text-center"
        style={{ marginTop: "clamp(48px, 6vw, 80px)", fontSize: "14px", color: "var(--text3)" }}
      >
        Nenhuma edição registrada ainda.
      </div>
    );
  }

  return (
    <div style={{ marginTop: "clamp(48px, 6vw, 80px)" }}>
      <h2
        className="font-heading mb-10 md:mb-14"
        style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--text)" }}
      >
        Nossas Edições
      </h2>

      <div className="relative">
        {/* Linha vertical — apenas desktop */}
        <div
          className="hidden md:block absolute"
          style={{
            left: "50%",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "var(--border)",
            transform: "translateX(-50%)",
          }}
        />

        {/* Linha vertical — mobile, à esquerda */}
        <div
          className="md:hidden absolute"
          style={{
            left: "8px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "var(--border)",
          }}
        />

        <div className="flex flex-col gap-10 md:gap-12">
          {edicoes.map((edicao, index) => {
            const config = resultadoConfig[edicao.resultado] ?? resultadoConfig.participacao;
            const ladoEsquerdo = index % 2 === 0; // desktop: alterna lados

            return (
              <div key={edicao._id} className="relative flex items-start">
                {/* Layout MOBILE: tudo à direita da linha */}
                <div className="md:hidden flex items-start w-full pl-7">
                  {/* Círculo mobile */}
                  <div
                    style={{
                      position: "absolute",
                      left: "0px",
                      top: "4px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: config.color,
                      border: "2px solid var(--bg)",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ maxWidth: "520px" }}>
                    <p
                      className="font-heading leading-none mb-2"
                      style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-main)" }}
                    >
                      {edicao.titulo}
                    </p>
                    <span
                      className="inline-block mb-3 font-semibold"
                      style={{
                        fontSize: "11px",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        background: config.bg,
                        color: config.color,
                        letterSpacing: "0.4px",
                      }}
                    >
                      {config.label}
                    </span>
                    <p style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--text2)" }}>
                      {edicao.descricao}
                    </p>
                  </div>
                </div>

                {/* Layout DESKTOP: alternado */}
                <div className="hidden md:flex w-full items-start">
                  {ladoEsquerdo ? (
                    <>
                      {/* Texto à esquerda */}
                      <div className="flex-1 flex justify-end pr-10 text-right">
                        <div style={{ maxWidth: "320px" }}>
                          <p
                            className="font-heading leading-none mb-2"
                            style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-main)" }}
                          >
                            {edicao.titulo}
                          </p>
                          <span
                            className="inline-block mb-3 font-semibold"
                            style={{
                              fontSize: "11px",
                              padding: "3px 10px",
                              borderRadius: "20px",
                              background: config.bg,
                              color: config.color,
                              letterSpacing: "0.4px",
                            }}
                          >
                            {config.label}
                          </span>
                          <p style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--text2)" }}>
                            {edicao.descricao}
                          </p>
                        </div>
                      </div>
                      {/* Círculo central */}
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: config.color,
                          border: "3px solid var(--bg)",
                          flexShrink: 0,
                          marginTop: "4px",
                          zIndex: 1,
                          position: "relative",
                        }}
                      />
                      <div className="flex-1 pl-10" />
                    </>
                  ) : (
                    <>
                      <div className="flex-1 pr-10" />
                      {/* Círculo central */}
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: config.color,
                          border: "3px solid var(--bg)",
                          flexShrink: 0,
                          marginTop: "4px",
                          zIndex: 1,
                          position: "relative",
                        }}
                      />
                      {/* Texto à direita */}
                      <div className="flex-1 pl-10">
                        <div style={{ maxWidth: "320px" }}>
                          <p
                            className="font-heading leading-none mb-2"
                            style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--text-main)" }}
                          >
                            {edicao.titulo}
                          </p>
                          <span
                            className="inline-block mb-3 font-semibold"
                            style={{
                              fontSize: "11px",
                              padding: "3px 10px",
                              borderRadius: "20px",
                              background: config.bg,
                              color: config.color,
                              letterSpacing: "0.4px",
                            }}
                          >
                            {config.label}
                          </span>
                          <p style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--text2)" }}>
                            {edicao.descricao}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
