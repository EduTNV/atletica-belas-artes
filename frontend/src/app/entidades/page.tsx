import type { Metadata } from "next";
import { EntidadesList } from "@/components/EntidadesList";
import { client } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Entidades — Atlética Belas Artes",
  description: "Conheça as entidades e organizações da Atlética Belas Artes.",
};

/** Página das Entidades parceiras, listando Bateria, Cheerleading, Diretoria, etc */
export default async function EntidadesPage() {
  const entidades = await client.fetch(`*[_type == "entidade"] | order(nome asc){
    _id,
    nome,
    descricao,
    cor,
    logo,
    "membros": *[_type == "membroEntidade" && references(^._id)] | order(ordem asc){
      _id,
      nome,
      cargo,
      foto,
      whatsapp,
      ordem,
      curso->{ nome, cor }
    }
  }`);

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
            Entidades
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "rgba(244, 244, 244, 0.75)" }}
          >
            Organizações que fazem parte da Belas Artes
          </p>
        </div>
      </section>

      <EntidadesList entidades={entidades} />
    </>
  );
}
