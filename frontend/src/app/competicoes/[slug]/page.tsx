import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { CarrosselGaleria } from "@/components/CarrosselGaleria";
import { TimelineEdicoes } from "./TimelineEdicoes";

import type { CompeticaoDetalheDTO, EdicaoCompeticaoDTO } from "@/types/sanity";

const COMPETICAO_QUERY = `*[_type == "competicao" && slug.current == $slug][0]{
  _id, nome, sigla, descricao, foto,
  fotos_galeria[]{ ..., asset-> }
}`;

const EDICOES_QUERY = `*[_type == "edicaoCompeticao" && competicao._ref == $id] | order(ano desc){
  _id, ano, titulo, resultado, descricao
}`;

export async function generateStaticParams() {
  const slugs = await client
    .fetch<{ slug: string }[]>(`*[_type == "competicao"]{ "slug": slug.current }`)
    .catch(() => []);
  return slugs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comp = await client
    .fetch<Pick<CompeticaoDetalheDTO, "nome" | "sigla" | "descricao" | "foto"> | null>(
      `*[_type == "competicao" && slug.current == $slug][0]{ nome, sigla, descricao, foto }`,
      { slug }
    )
    .catch(() => null);

  const title = comp ? `${comp.sigla} | Atlética Belas Artes` : "Competição | Atlética Belas Artes";
  const description = comp?.descricao || "Conheça a participação da Atlética Belas Artes nesta competição.";
  
  const ogImageUrl = comp?.foto?.asset 
    ? urlFor(comp.foto).width(1200).height(630).fit("crop").url() 
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

/** Página de detalhe de uma Competição */
export default async function CompeticaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const competicao = await client.fetch<CompeticaoDetalheDTO | null>(COMPETICAO_QUERY, { slug }).catch(() => null);
  const edicoes = competicao ? await client.fetch<EdicaoCompeticaoDTO[]>(EDICOES_QUERY, { id: competicao._id }).catch(() => []) : [];

  if (!competicao) {
    notFound();
  }

  const heroBgUrl = competicao.foto?.asset
    ? urlFor(competicao.foto).width(1600).height(960).fit("crop").url()
    : null;

  return (
    <>
      {/* Bloco 1 — Hero Banner com foto */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(280px, 45vh, 480px)" }}
      >
        {heroBgUrl && (
          <>
            {/* Fundo Desfocado (Layer inferior) */}
            <Image
              src={heroBgUrl}
              alt=""
              aria-hidden="true"
              fill
              priority
              style={{
                objectFit: "cover",
                filter: "blur(24px) brightness(0.6)",
                transform: "scale(1.2)",
              }}
            />
            {/* Imagem Principal (Sem distorção) */}
            <Image
              src={heroBgUrl}
              alt={competicao.nome}
              fill
              priority
              style={{
                objectFit: "contain",
              }}
            />
          </>
        )}
        {/* Overlay gradiente */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
          }}
        />
        {/* Texto sobre o overlay */}
        <div
          className="relative z-10 flex flex-col justify-end h-full content-wrapper"
          style={{ paddingBottom: "clamp(24px, 4vw, 48px)" }}
        >
          <span
            className="font-heading leading-none block"
            style={{
              fontSize: "clamp(56px, 10vw, 120px)",
              color: "#ffffff",
              textShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {competicao.sigla}
          </span>
          <span
            style={{
              fontSize: "clamp(16px, 2vw, 22px)",
              color: "rgba(255,255,255,0.8)",
              marginTop: "4px",
            }}
          >
            {competicao.nome}
          </span>
        </div>
      </section>

      {/* Bloco 2 — Descrição */}
      <section className="content-wrapper" style={{ paddingTop: "clamp(32px, 5vw, 64px)" }}>
        <div style={{ maxWidth: "720px" }}>
          <Link
            href="/competicoes"
            className="inline-flex items-center gap-1 mb-6 transition-opacity hover:opacity-70"
            style={{ fontSize: "13px", color: "var(--text3)" }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Competições
          </Link>
          <p
            style={{
              fontSize: "clamp(15px, 1.5vw, 17px)",
              lineHeight: "1.8",
              color: "var(--text2)",
            }}
          >
            {competicao.descricao}
          </p>
        </div>

        {/* Bloco 3 — Carrossel de Galeria */}
        {competicao.fotos_galeria && competicao.fotos_galeria.length > 0 && (
          <CarrosselGaleria fotos={competicao.fotos_galeria} />
        )}

        {/* Bloco 4 — Timeline de Edições */}
        <TimelineEdicoes edicoes={edicoes} />

        {/* Espaço inferior */}
        <div style={{ height: "clamp(48px, 6vw, 80px)" }} />
      </section>
    </>
  );
}
