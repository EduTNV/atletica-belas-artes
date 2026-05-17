import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { CarrosselGaleria } from "@/components/CarrosselGaleria";
import { TimelineEdicoes } from "./TimelineEdicoes";

interface FotoGaleria {
  asset: { _ref: string; url?: string };
  caption?: string;
}

interface CompeticaoDetalhe {
  _id: string;
  nome: string;
  sigla: string;
  descricao: string;
  foto?: { asset: { _ref: string } };
  fotos_galeria?: FotoGaleria[];
}

interface EdicaoCompeticao {
  _id: string;
  ano: number;
  titulo: string;
  resultado: string;
  descricao: string;
}

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
    .fetch<Pick<CompeticaoDetalhe, "nome" | "sigla"> | null>(
      `*[_type == "competicao" && slug.current == $slug][0]{ nome, sigla }`,
      { slug }
    )
    .catch(() => null);

  return {
    title: comp
      ? `${comp.sigla} — Atlética Belas Artes`
      : "Competição — Atlética Belas Artes",
    description: comp
      ? `Conheça a participação da Atlética Belas Artes na ${comp.nome}.`
      : undefined,
  };
}

/** Página de detalhe de uma Competição */
export default async function CompeticaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [competicao, edicoes] = await Promise.all([
    client
      .fetch<CompeticaoDetalhe | null>(COMPETICAO_QUERY, { slug })
      .catch(() => null),
    // As edições são buscadas após ter o _id da competição
    client
      .fetch<{ _id: string } | null>(
        `*[_type == "competicao" && slug.current == $slug][0]{ _id }`,
        { slug }
      )
      .then((c) =>
        c
          ? client.fetch<EdicaoCompeticao[]>(EDICOES_QUERY, { id: c._id }).catch(() => [])
          : []
      )
      .catch(() => [] as EdicaoCompeticao[]),
  ]);

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
            <img
              src={heroBgUrl}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-10%",
                width: "120%",
                height: "120%",
                objectFit: "cover",
                filter: "blur(24px) brightness(0.6)",
              }}
            />
            {/* Imagem Principal (Sem distorção) */}
            <img
              src={heroBgUrl}
              alt={competicao.nome}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
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
