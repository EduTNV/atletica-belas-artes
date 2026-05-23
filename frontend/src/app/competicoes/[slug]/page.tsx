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
        className="relative w-full overflow-hidden h-[clamp(280px,45vh,480px)]"
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
              className="object-cover scale-[1.2]"
              style={{
                filter: "blur(24px) brightness(0.6)",
              }}
            />
            {/* Imagem Principal (Sem distorção) */}
            <Image
              src={heroBgUrl}
              alt={competicao.nome}
              fill
              priority
              className="object-contain"
            />
          </>
        )}
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        {/* Texto sobre o overlay */}
        <div
          className="relative z-10 flex flex-col justify-end h-full content-wrapper pb-[clamp(24px,4vw,48px)]"
        >
          <span
            className="font-heading leading-none block text-[clamp(56px,10vw,120px)] text-white"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
          >
            {competicao.sigla}
          </span>
          <span className="text-[clamp(16px,2vw,22px)] text-white/80 mt-1">
            {competicao.nome}
          </span>
        </div>
      </section>

      {/* Bloco 2 — Descrição */}
      <section className="content-wrapper pt-[clamp(32px,5vw,64px)]">
        <div className="max-w-[720px]">
          <Link
            href="/competicoes"
            className="inline-flex items-center gap-1 mb-6 transition-opacity hover:opacity-70 text-[13px] text-text-muted"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Competições
          </Link>
          <p className="text-[clamp(15px,1.5vw,17px)] leading-[1.8] text-text-secondary">
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
        <div className="h-[clamp(48px,6vw,80px)]" />
      </section>
    </>
  );
}
