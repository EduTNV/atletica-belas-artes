import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { PortableText } from "@/components/PortableText";
import { CarrosselGaleria } from "@/components/CarrosselGaleria";

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
  const sobre = await client.fetch(SOBRE_QUERY).catch(() => null);

  return (
    <>
      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#5c6484", marginBottom: "clamp(20px, 3vw, 32px)" }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 
            className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]" 
            style={{ color: "#f4f4f4" }}
          >
            Sobre a Atlética
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "rgba(244, 244, 244, 0.75)" }}
          >
            Nossa história, missão e valores
          </p>
        </div>
      </section>

      {/* ── História ── */}
      {sobre?.historia && (
        <section className="content-wrapper mb-12 md:mb-16">
          <h2
            className="font-heading text-[24px] md:text-[32px] tracking-[0.5px] mb-2"
            style={{ color: "var(--crimson)" }}
          >
            Nossa História
          </h2>
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "var(--crimson)",
              borderRadius: "2px",
              marginBottom: "24px",
            }}
          />
          <div className="w-full text-justify flex flex-col gap-6">
            <PortableText value={sobre.historia} />
          </div>
        </section>
      )}

      {/* ── Galeria de Fotos ── */}
      {sobre?.fotos_galeria && sobre.fotos_galeria.length > 0 && (
        <section className="content-wrapper" style={{ marginBottom: "clamp(48px, 4vw, 64px)" }}>
          <CarrosselGaleria fotos={sobre.fotos_galeria} />
        </section>
      )}

      {/* ── Missão ── */}
      {sobre?.missao && sobre.missao.length > 0 && (
        <section className="content-wrapper" style={{ marginBottom: "clamp(48px, 4vw, 64px)" }}>
          <h2
            className="font-heading text-[24px] md:text-[32px] tracking-[0.5px] mb-2"
            style={{ color: "var(--crimson)" }}
          >
            Missão
          </h2>
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "var(--crimson)",
              borderRadius: "2px",
              marginBottom: "24px",
            }}
          />
          <div className="flex flex-col gap-6">
            {sobre.missao.map((item: any, i: number) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6"
              >
                <div className="shrink-0">
                  <span
                    style={{
                      display: "inline-block",
                      background: "#5c6484",
                      color: "#f4f4f4",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {item.titulo}
                  </span>
                </div>
                <p
                  className="text-justify m-0"
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    lineHeight: 1.7,
                    color: "var(--text-main)",
                  }}
                >
                  {item.descricao}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Valores ── */}
      {sobre?.valores && sobre.valores.length > 0 && (
        <section className="content-wrapper" style={{ marginBottom: "clamp(56px, 5vw, 80px)" }}>
          <h2
            className="font-heading text-[24px] md:text-[32px] tracking-[0.5px] mb-2"
            style={{ color: "var(--crimson)" }}
          >
            Valores
          </h2>
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "var(--crimson)",
              borderRadius: "2px",
              marginBottom: "24px",
            }}
          />
          <div className="flex flex-col gap-6">
            {sobre.valores.map((valor: any, i: number) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6"
              >
                <div className="shrink-0">
                  <span
                    style={{
                      display: "inline-block",
                      background: "#5c6484",
                      color: "#f4f4f4",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {valor.titulo}
                  </span>
                </div>
                <p
                  className="text-justify m-0"
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    lineHeight: 1.7,
                    color: "var(--text-main)",
                  }}
                >
                  {valor.descricao}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
