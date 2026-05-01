import type { Metadata } from "next";
import { getEntidades } from "@/lib/strapi";
import { EntidadesList } from "@/components/EntidadesList";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Entidades — Atlética Belas Artes",
  description: "Conheça as entidades e organizações da Atlética Belas Artes.",
};

export default async function EntidadesPage() {
  const entidades = await getEntidades();

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #2a0808 0%, #1a0505 40%, #0f0f0f 100%)",
        }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]">
            Entidades
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "var(--text2)" }}
          >
            Organizações que fazem parte da Belas Artes
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <EntidadesList entidades={entidades} />
    </>
  );
}
