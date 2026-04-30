import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos — Atlética Belas Artes",
  description: "Confira os próximos eventos e a galeria da Atlética Belas Artes.",
};

export default function EventosPage() {
  return (
    <>
      {/* Hero compacto */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #2a0808 0%, #1a0505 40%, #0f0f0f 100%)",
        }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]">
            Eventos
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "var(--text2)" }}
          >
            Festas, campeonatos e tudo que rola na BA
          </p>
        </div>
      </section>

      {/* Tabs Próximos / Galeria */}
      <div className="content-wrapper">
        <div
          className="flex border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            className="py-[14px] px-6 text-[13px] md:text-[14px] font-medium border-b-2 transition-colors"
            style={{ color: "var(--text)", borderColor: "var(--crimson)" }}
            id="ev-tab-proximos"
          >
            Próximos
          </button>
          <button
            className="py-[14px] px-6 text-[13px] md:text-[14px] font-medium border-b-2 border-transparent transition-colors"
            style={{ color: "var(--text3)" }}
            id="ev-tab-galeria"
          >
            Galeria
          </button>
        </div>
      </div>

      {/* Conteúdo — placeholder para Tarefa 2 */}
      <div className="content-wrapper py-10 md:py-16">
        <p
          className="text-center text-[14px]"
          style={{ color: "var(--text3)" }}
        >
          Cards de eventos serão implementados na Tarefa 2
        </p>
      </div>
    </>
  );
}
