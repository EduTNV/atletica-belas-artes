import type { Metadata } from "next";
import { getConfigContato, getConfigAjuda } from "@/lib/strapi";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Ajuda — Atlética Belas Artes",
  description: "Tire suas dúvidas e entre em contato com a Atlética Belas Artes.",
};

export default async function ContatoPage() {
  const [contato, configAjuda] = await Promise.all([
    getConfigContato(),
    getConfigAjuda(),
  ]);

  const hasAnyInfo = contato && (contato.email || contato.whatsapp || contato.instagram);
  const titulo = configAjuda?.titulo_pagina || "Ajuda";
  const subtitulo = configAjuda?.subtitulo || "Tire suas dúvidas e entre em contato com a gente";

  const faqsOrdenados = [...(configAjuda?.faqs || [])].sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99));

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ background: "#5c6484" }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20" style={{ paddingBottom: "clamp(32px, 4vw, 48px)" }}>
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

      <div className="content-wrapper py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Canais de Contato - Layout Compacto */}
          <section>
            <h2 className="font-heading text-[24px] md:text-[32px] mb-6" style={{ color: "var(--text)" }}>
              Canais de Contato
            </h2>
            {!hasAnyInfo ? (
              <p className="text-[15px]" style={{ color: "var(--text3)" }}>
                As informações de contato serão publicadas em breve.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {contato.whatsapp && (
                  <ContactRow
                    href={`https://wa.me/55${contato.whatsapp.replace(/\D/g, "")}`}
                    icon={
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    }
                    title="WhatsApp"
                    subtitle="Envie uma mensagem direto"
                    label="Abrir conversa"
                    color="rgba(37, 211, 102, 0.12)"
                    id="contato-whatsapp"
                  />
                )}

                {contato.email && (
                  <ContactRow
                    href={`mailto:${contato.email}`}
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--crimson-light)" strokeWidth="2.5">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <polyline points="22,7 12,13 2,7" />
                      </svg>
                    }
                    title="E-mail"
                    subtitle={contato.email}
                    label="Enviar e-mail"
                    color="rgba(224, 44, 44, 0.1)"
                    id="contato-email"
                  />
                )}

                {contato.instagram && (
                  <ContactRow
                    href={`https://instagram.com/${contato.instagram.replace("@", "")}`}
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2.5">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="var(--gold-light)" stroke="none" />
                      </svg>
                    }
                    title="Instagram"
                    subtitle={`@${contato.instagram.replace("@", "")}`}
                    label="Seguir"
                    color="rgba(201, 168, 76, 0.12)"
                    id="contato-instagram"
                  />
                )}
              </div>
            )}
          </section>

          {/* FAQ Accordion */}
          {faqsOrdenados.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16 md:mt-24">
              <FaqAccordion faqs={faqsOrdenados} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ContactRow({
  href,
  icon,
  title,
  subtitle,
  label,
  color,
  id,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  label: string;
  color: string;
  id: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-4 rounded-xl border transition-all hover:bg-black/5 hover:border-gray-300"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
      id={id}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-bold" style={{ color: "#1a1a1a" }}>
          {title}
        </p>
        <p className="text-[13px] truncate" style={{ color: "var(--text3)" }}>
          {subtitle}
        </p>
      </div>
      <span
        className="text-[12px] font-bold hidden sm:inline-block"
        style={{ color: "#5c6484" }}
      >
        {label} →
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5c6484"
        strokeWidth="3"
        className="sm:hidden"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>
  );
}
