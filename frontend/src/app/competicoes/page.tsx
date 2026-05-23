import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";

export const metadata: Metadata = {
  title: "Competições — Atlética Belas Artes",
  description:
    "Conheça as competições universitárias em que a Atlética Belas Artes compete: JUCA, NDU e Liga Paulista.",
};

interface Competicao {
  _id: string;
  nome: string;
  sigla: string;
  slug: { current: string };
  descricao: string;
  foto?: { asset: { _ref: string } };
}

/** Página de listagem das Competições da Atlética */
export default async function CompeticoesPage() {
  const competicoes = await client
    .fetch<Competicao[]>(
      `*[_type == "competicao"] | order(ordem asc){
        _id, nome, sigla, slug, descricao, foto
      }`
    )
    .catch(() => [] as Competicao[]);

  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]">
            Competições
          </h1>
          <p className="page-hero-subtitle text-[14px] md:text-[16px] mt-2">
            As competições universitárias em que representamos a Belas Artes
          </p>
        </div>
      </section>

      {/* Listagem */}
      <section className="content-wrapper pt-12 pb-24 md:pt-20 md:pb-32">
        {competicoes.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[15px] text-text-muted">
              Nenhuma competição cadastrada no momento.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-14 md:gap-20">
            {competicoes.map((comp) => {
              const fotoUrl = comp.foto?.asset
                ? urlFor(comp.foto).width(640).height(360).fit("crop").url()
                : null;

              return (
                <div
                  key={comp._id}
                  className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-center"
                >
                  {/* Foto */}
                  {fotoUrl ? (
                    <img
                      src={fotoUrl}
                      alt={comp.nome}
                      className="shrink-0 object-cover rounded-2xl max-w-full aspect-video"
                      style={{ width: "clamp(280px, 30vw, 320px)" }}
                    />
                  ) : (
                    <div
                      className="shrink-0 flex items-center justify-center font-heading rounded-2xl max-w-full aspect-video bg-surface-2 text-text-muted text-[clamp(40px,6vw,52px)]"
                      style={{ width: "clamp(280px, 30vw, 320px)" }}
                    >
                      {comp.sigla}
                    </div>
                  )}

                  {/* Texto */}
                  <div className="flex-1 min-w-0">
                    <span className="font-heading block leading-none mb-1 text-[clamp(40px,5vw,52px)] text-crimson">
                      {comp.sigla}
                    </span>
                    <p className="font-bold mb-3 text-[20px] text-text-main">
                      {comp.nome}
                    </p>
                    <p className="mb-5 leading-[1.7] text-[clamp(14px,1.5vw,16px)] text-text-secondary line-clamp-3">
                      {comp.descricao}
                    </p>
                    <Link
                      href={`/competicoes/${comp.slug?.current}`}
                      className="inline-block font-semibold transition-opacity hover:opacity-80 bg-crimson text-white rounded-lg px-6 py-2.5 text-[13px]"
                    >
                      Ver mais
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Espaçamento extra para evitar sobreposição com o footer/tab-bar mobile */}
      <div className="h-[clamp(48px,8vw,96px)]" />
    </>
  );
}
