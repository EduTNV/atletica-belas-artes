import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Times — Atlética Belas Artes",
  description: "Conheça os times e modalidades da Atlética Belas Artes.",
};

export default function TimesPage() {
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
            Nossos Times
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "var(--text2)" }}
          >
            Escolha seu curso e conheça as modalidades
          </p>
        </div>
      </section>

      {/* Grid de cursos — placeholder para Tarefa 3 */}
      <div className="content-wrapper py-10 md:py-16">
        <p
          className="text-center text-[14px]"
          style={{ color: "var(--text3)" }}
        >
          Grid de cursos e modalidades será implementado na Tarefa 3
        </p>
      </div>
    </>
  );
}
