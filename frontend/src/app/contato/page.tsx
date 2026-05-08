"use client";

import { useState, useEffect } from "react";
import { getConfigContato, getConfigAjuda } from "@/lib/strapi";
import type { Faq, ConfigContato, ConfigAjuda } from "@/lib/strapi";

/** Página de Contato e Ajuda, exibindo redes sociais, email e FAQ */
export default function ContatoPage() {
  const [contato, setContato] = useState<ConfigContato | null>(null);
  const [configAjuda, setConfigAjuda] = useState<ConfigAjuda | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getConfigContato(), getConfigAjuda()]).then(([c, a]) => {
      setContato(c);
      setConfigAjuda(a);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

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
                    className="w-full md:w-auto text-center"
                    style={{
                      background: "#e02c2c",
                      color: "#f4f4f4",
                      borderRadius: "8px",
                      padding: "12px 32px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Falar pelo WhatsApp
                  </a>
                )}

                {contato.email && (
                  <a
                    href={`mailto:${contato.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto text-center"
                    style={{
                      background: "#e02c2c",
                      color: "#f4f4f4",
                      borderRadius: "8px",
                      padding: "12px 32px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Enviar E-mail
                  </a>
                )}

                {contato.instagram && (
                  <a
                    href={`https://instagram.com/${contato.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto text-center"
                    style={{
                      background: "#e02c2c",
                      color: "#f4f4f4",
                      borderRadius: "8px",
                      padding: "12px 32px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Seguir no Instagram
                  </a>
                )}
              </div>
            )}
          </section>
          {faqsOrdenados.length > 0 && (
            <section style={{ marginTop: "80px" }}>
              <div className="flex flex-col" style={{ gap: "10px" }}>
                {faqsOrdenados.map((faq, i) => (
                  <FaqItem
                    key={i}
                    faq={faq}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer"
      style={{
        background: isOpen ? "#e8e8e8" : "#ececec",
        borderRadius: "12px",
        padding: "20px 24px",
        boxShadow: isOpen ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
        transition: "background 0.2s, box-shadow 0.2s",
      }}
    >
      <div className="flex justify-between items-center gap-4 text-left">
        <p
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#1a1a1a",
            lineHeight: 1.4,
          }}
        >
          {faq.pergunta}
        </p>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 300,
            color: "#5c6484",
            flexShrink: 0,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </div>

      <div
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
        className="text-left"
      >
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#6e6a64",
            paddingTop: "14px",
          }}
        >
          {faq.resposta}
        </p>
      </div>
    </div>
  );
}