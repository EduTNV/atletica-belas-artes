import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { TimesList } from "@/components/TimesList";

export const metadata: Metadata = {
  title: "Times — Atlética Belas Artes",
  description: "Conheça os times e modalidades da Atlética Belas Artes.",
};

/** Página de Times/Modalidades, exibindo filtros e a listagem de todas as equipes */
export default async function TimesPage() {
  const modalidades = await client.fetch(`*[_type == "modalidade"] | order(nome asc){
    _id, nome, slug, capitao_nome, link_grupo_whatsapp, foto_card, foto_banner
  }`).catch(() => []);

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ background: "#5c6484", marginBottom: "clamp(20px, 3vw, 32px)" }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 
            className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]" 
            style={{ color: "#f4f4f4" }}
          >
            Nossos Times
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "rgba(244, 244, 244, 0.75)" }}
          >
            Conheça as modalidades da Atlética Belas Artes
          </p>
        </div>
      </section>

      {modalidades.length === 0 ? (
        <div className="content-wrapper py-24 text-center">
          <p className="text-[15px]" style={{ color: "var(--text3)" }}>
            Nenhum time cadastrado no momento.
          </p>
        </div>
      ) : (
        <TimesList modalidades={modalidades} />
      )}
    </>
  );
}
