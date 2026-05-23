import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { PortableText } from "@/components/PortableText";
import { CarrosselGaleria } from "@/components/CarrosselGaleria";
import type { SobreDTO, MissaoValorItem } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Sobre — Atlética Belas Artes",
  description: "Conheça a história, missão e valores da Atlética Belas Artes.",
};

const SOBRE_QUERY = `*[_type == "sobre"][0]{
  historia,
  fotos_galeria[]{ ..., asset-> },
  missao[]{ titulo, descricao },
  valores[]{ titulo, descricao }
}`;

export default async function SobrePage() {
  const sobre = await client.fetch<SobreDTO | null>(SOBRE_QUERY).catch(() => null);

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="page-hero">
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]">
            Sobre a Atlética
          </h1>
          <p className="page-hero-subtitle text-[14px] md:text-[16px] mt-2">
            Nossa história, missão e valores
          </p>
        </div>
      </section>

      <div className="page-sections">
        {/* ── História ── */}
        {sobre?.historia && (
          <section className="content-wrapper">
            <h2 className="font-heading text-[24px] md:text-[32px] tracking-[0.5px] mb-2 text-crimson">
              Nossa História
            </h2>
            <div className="section-divider" />
            <div className="w-full text-justify flex flex-col gap-6">
              <PortableText value={sobre.historia} />
            </div>
          </section>
        )}

        {/* ── Galeria de Fotos ── */}
        {sobre?.fotos_galeria && sobre.fotos_galeria.length > 0 && (
          <section className="content-wrapper">
            <CarrosselGaleria fotos={sobre.fotos_galeria} />
          </section>
        )}

        {/* ── Missão ── */}
        {sobre?.missao && sobre.missao.length > 0 && (
          <section className="content-wrapper">
            <h2 className="font-heading text-[24px] md:text-[32px] tracking-[0.5px] mb-2 text-crimson">
              Missão
            </h2>
            <div className="section-divider" />
            <div className="flex flex-col gap-6">
              {sobre.missao.map((item: MissaoValorItem, i: number) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6"
                >
                  <div className="shrink-0">
                    <span className="inline-block bg-[#5c6484] text-white px-[18px] py-[8px] rounded-lg text-[13px] font-semibold">
                      {item.titulo}
                    </span>
                  </div>
                  <p className="text-justify m-0 text-[clamp(14px,1.4vw,16px)] leading-[1.7] text-text-main">
                    {item.descricao}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Valores ── */}
        {sobre?.valores && sobre.valores.length > 0 && (
          <section className="content-wrapper">
            <h2 className="font-heading text-[24px] md:text-[32px] tracking-[0.5px] mb-2 text-crimson">
              Valores
            </h2>
            <div className="section-divider" />
            <div className="flex flex-col gap-6">
              {sobre.valores.map((valor: MissaoValorItem, i: number) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6"
                >
                  <div className="shrink-0">
                    <span className="inline-block bg-[#5c6484] text-white px-[18px] py-[8px] rounded-lg text-[13px] font-semibold">
                      {valor.titulo}
                    </span>
                  </div>
                  <p className="text-justify m-0 text-[clamp(14px,1.4vw,16px)] leading-[1.7] text-text-main">
                    {valor.descricao}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
