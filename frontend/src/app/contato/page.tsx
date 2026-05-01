import type { Metadata } from "next";
import { getConfigContato } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Contato — Atlética Belas Artes",
  description: "Entre em contato com a Atlética Belas Artes.",
};

export default async function ContatoPage() {
  const contato = await getConfigContato();

  // Se não houver dados cadastrados, exibe mensagem padrão
  const hasAnyInfo = contato && (contato.email || contato.whatsapp || contato.instagram);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #2a0808 0%, #1a0505 40%, #0f0f0f 100%)",
        }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]">
            Contato
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "var(--text2)" }}
          >
            Fale com a gente por qualquer um dos canais abaixo
          </p>
        </div>
      </section>

      {/* Cards de contato */}
      <div className="content-wrapper py-10 md:py-16">
        {!hasAnyInfo ? (
          <p className="text-[15px] text-center py-12" style={{ color: "var(--text3)" }}>
            As informações de contato serão publicadas em breve.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {/* WhatsApp */}
            {contato.whatsapp && (
              <a
                href={`https://wa.me/55${contato.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "var(--surface)",
                  borderColor: "rgba(37, 211, 102, 0.25)",
                }}
                id="contato-whatsapp"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: "rgba(37, 211, 102, 0.12)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#25d366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-semibold" style={{ color: "var(--text)" }}>WhatsApp</p>
                  <p className="text-[13px] mt-1" style={{ color: "var(--text3)" }}>
                    Envie uma mensagem direto
                  </p>
                </div>
                <span
                  className="text-[12px] font-semibold px-4 py-2 rounded-lg"
                  style={{ background: "rgba(37, 211, 102, 0.15)", color: "#25d366" }}
                >
                  Abrir conversa →
                </span>
              </a>
            )}

            {/* E-mail */}
            {contato.email && (
              <a
                href={`mailto:${contato.email}`}
                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
                id="contato-email"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: "rgba(139, 26, 26, 0.12)" }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--crimson-light)" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,7 12,13 2,7" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-semibold" style={{ color: "var(--text)" }}>E-mail</p>
                  <p className="text-[13px] mt-1 break-all" style={{ color: "var(--text3)" }}>
                    {contato.email}
                  </p>
                </div>
                <span
                  className="text-[12px] font-semibold px-4 py-2 rounded-lg"
                  style={{ background: "rgba(139, 26, 26, 0.12)", color: "var(--crimson-light)" }}
                >
                  Enviar e-mail →
                </span>
              </a>
            )}

            {/* Instagram */}
            {contato.instagram && (
              <a
                href={`https://instagram.com/${contato.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "var(--surface)",
                  borderColor: "rgba(201, 168, 76, 0.25)",
                }}
                id="contato-instagram"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: "rgba(201, 168, 76, 0.1)" }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="var(--gold-light)" stroke="none" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-semibold" style={{ color: "var(--text)" }}>Instagram</p>
                  <p className="text-[13px] mt-1" style={{ color: "var(--text3)" }}>
                    @{contato.instagram.replace("@", "")}
                  </p>
                </div>
                <span
                  className="text-[12px] font-semibold px-4 py-2 rounded-lg"
                  style={{ background: "rgba(201, 168, 76, 0.1)", color: "var(--gold-light)" }}
                >
                  Seguir →
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
}
