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
      <section
        className="relative overflow-hidden"
        style={{ background: "#5c6484", marginBottom: "clamp(20px, 3vw, 32px)" }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1
            className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]"
            style={{ color: "#f4f4f4" }}
          >
            Competições
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "rgba(244, 244, 244, 0.75)" }}
          >
            As competições universitárias em que representamos a Belas Artes
          </p>
        </div>
      </section>

      {/* Listagem */}
      <section className="content-wrapper pt-12 pb-24 md:pt-20 md:pb-32">
        {competicoes.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[15px]" style={{ color: "var(--text3)" }}>
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
                      className="w-full shrink-0 object-cover"
                      style={{
                        width: "clamp(280px, 30vw, 320px)",
                        aspectRatio: "16/9",
                        borderRadius: "16px",
                        maxWidth: "100%",
                      }}
                    />
                  ) : (
                    <div
                      className="shrink-0 flex items-center justify-center font-heading"
                      style={{
                        width: "clamp(280px, 30vw, 320px)",
                        aspectRatio: "16/9",
                        borderRadius: "16px",
                        background: "var(--surface2)",
                        fontSize: "clamp(40px, 6vw, 52px)",
                        color: "var(--text3)",
                        maxWidth: "100%",
                      }}
                    >
                      {comp.sigla}
                    </div>
                  )}

                  {/* Texto */}
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-heading block leading-none mb-1"
                      style={{
                        fontSize: "clamp(40px, 5vw, 52px)",
                        color: "var(--crimson)",
                      }}
                    >
                      {comp.sigla}
                    </span>
                    <p
                      className="font-bold mb-3"
                      style={{ fontSize: "20px", color: "var(--text-main)" }}
                    >
                      {comp.nome}
                    </p>
                    <p
                      className="mb-5 leading-[1.7]"
                      style={{
                        fontSize: "clamp(14px, 1.5vw, 16px)",
                        color: "var(--text2)",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {comp.descricao}
                    </p>
                    <Link
                      href={`/competicoes/${comp.slug?.current}`}
                      className="inline-block font-semibold transition-opacity hover:opacity-80"
                      style={{
                        background: "var(--crimson)",
                        color: "#f4f4f4",
                        borderRadius: "8px",
                        padding: "10px 24px",
                        fontSize: "13px",
                      }}
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
      <div style={{ height: "clamp(48px, 8vw, 96px)" }} />
    </>
  );
}
