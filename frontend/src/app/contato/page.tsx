import { client } from "@/lib/sanity";
import { FaqSection } from "./FaqSection";
import type { ContatoDTO, AjudaDTO } from "@/types/sanity";

/** Página de Contato e Ajuda, exibindo redes sociais, email e FAQ */
export default async function ContatoPage() {
  const [contato, configAjuda] = await Promise.all([
    client.fetch<ContatoDTO | null>(`*[_type == "contato"][0]{ email, whatsapp, instagram }`),
    client.fetch<AjudaDTO | null>(`*[_type == "ajuda"][0]{ titulo_pagina, subtitulo, faqs[]{ pergunta, resposta, ordem } }`)
  ]);

  const hasAnyInfo = contato && (contato.email || contato.whatsapp || contato.instagram);
  const titulo = configAjuda?.titulo_pagina || "Ajuda";
  const subtitulo = configAjuda?.subtitulo || "Tire suas dúvidas e entre em contato com a gente";

  const faqsOrdenados = [...(configAjuda?.faqs || [])].sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99));

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
            {titulo}
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "rgba(244, 244, 244, 0.75)" }}
          >
            {subtitulo}
          </p>
        </div>
      </section>
      <div className="content-wrapper py-12 md:py-20 flex justify-center">

        <div className="w-full max-w-[680px]">

          <section className="text-center">
            <h2 className="font-heading text-[24px] md:text-[32px] mb-6" style={{ color: "var(--text)" }}>
              Canais de Contato
            </h2>
            {!hasAnyInfo ? (
              <p className="text-[15px]" style={{ color: "var(--text3)" }}>
                As informações de contato serão publicadas em breve.
              </p>
            ) : (
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                {contato.whatsapp && (
                  <a
                    href={`https://wa.me/55${contato.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Falar pelo WhatsApp
                  </a>
                )}

                {contato.email && (
                  <a
                    href={`mailto:${contato.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Enviar E-mail
                  </a>
                )}

                {contato.instagram && (
                  <a
                    href={`https://instagram.com/${contato.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Seguir no Instagram
                  </a>
                )}
              </div>
            )}
          </section>

          <FaqSection faqs={faqsOrdenados} />

        </div>
      </div>
    </>
  );
}