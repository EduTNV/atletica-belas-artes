import type { Metadata } from "next";
import { getCursos, type Curso } from "@/lib/strapi";
import { TimesList } from "@/components/TimesList";

export const metadata: Metadata = {
  title: "Times — Atlética Belas Artes",
  description: "Conheça os times e modalidades da Atlética Belas Artes.",
};

/**
 * Página de Times — Server Component.
 * Busca Cursos (com modalidades populadas) do Strapi e passa ao componente cliente.
 */
export default async function TimesPage() {
  const cursos = await getCursos().catch(() => [] as Curso[]);

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

      {/* Conteúdo dinâmico — Client Component */}
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
