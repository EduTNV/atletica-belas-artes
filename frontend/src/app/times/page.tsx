import type { Metadata } from "next";
import { getCursos, type Curso } from "@/lib/strapi";
import { TimesList } from "@/components/TimesList";

export const metadata: Metadata = {
  title: "Times — Atlética Belas Artes",
  description: "Conheça os times e modalidades da Atlética Belas Artes.",
};

export default async function TimesPage() {
  const cursos = await getCursos().catch(() => [] as Curso[]);

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--blue-header)",
        }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]" style={{ color: "var(--crimson)" }}>
            Nossos Times
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Escolha seu curso e conheça as modalidades
          </p>
        </div>
      </section>

      {cursos.length === 0 ? (
        <div className="content-wrapper py-24 text-center">
          <p className="text-[15px]" style={{ color: "var(--text3)" }}>
            Nenhum time cadastrado no momento.
          </p>
        </div>
      ) : (
        <TimesList cursos={cursos} />
      )}
    </>
  );
}
