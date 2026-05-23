import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { TimesList } from "@/components/TimesList";
import type { ModalidadeListDTO } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Times — Atlética Belas Artes",
  description: "Conheça os times e modalidades da Atlética Belas Artes.",
};

/** Página de Times/Modalidades, exibindo filtros e a listagem de todas as equipes */
export default async function TimesPage() {
  const modalidades = await client.fetch<ModalidadeListDTO[]>(`*[_type == "modalidade"] | order(nome asc){
    _id, nome, slug, capitao_nome, link_grupo_whatsapp, foto_card, foto_banner
  }`).catch(() => [] as ModalidadeListDTO[]);

  return (
    <>
      <section className="page-hero">
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]">
            Nossos Times
          </h1>
          <p className="page-hero-subtitle text-[14px] md:text-[16px] mt-2">
            Conheça as modalidades da Atlética Belas Artes
          </p>
        </div>
      </section>

      {modalidades.length === 0 ? (
        <div className="content-wrapper py-24 text-center">
          <p className="text-[15px] text-text-muted">
            Nenhum time cadastrado no momento.
          </p>
        </div>
      ) : (
        <TimesList modalidades={modalidades} />
      )}
    </>
  );
}
