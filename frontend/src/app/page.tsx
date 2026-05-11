import Link from "next/link";
import { ExpandableText, Paragraphs } from "@/components/ExpandableText";
import { EventCard } from "@/components/EventCard";
import { JogosCard } from "@/components/JogosCard";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";

export const revalidate = 60;

/** Página principal (Home) da Atlética, listando banner, quem somos, próximos jogos e eventos */
export default async function HomePage() {
  const [todosEventos, configHome, configCompeticoes, jogos] = await Promise.all([
    client.fetch(`*[_type == "evento" && ativo == true] | order(data asc){
      _id, nome, data, local, endereco, arte, status_lote, link_ingresso
    }`).catch(() => []),
    client.fetch(`*[_type == "home"][0]{
      subtitulo_hero, foto_hero, texto_quem_somos_resumo, texto_quem_somos_completo, frase_footer
    }`).catch(() => null),
    client.fetch(`*[_type == "competicoes"][0]{
      competicoes[]{ nome, sigla, descricao, foto }
    }`).catch(() => null),
    client.fetch(`*[_type == "jogo"] | order(data_hora desc)[0...50]{
      _id, time_casa, time_visitante, modalidade->{ nome }, competicao, fase, data_hora, local, placar_casa, placar_visitante, estado
    }`).catch(() => []),
  ]);

  const agora = new Date();
  const proximosEventos = todosEventos.filter((e: any) => new Date(e.data) >= agora);

  const quemSomosResumo =
    configHome?.texto_quem_somos_resumo ||
    "A Atlética Belas Artes é a entidade esportiva oficial da Faculdade Belas Artes de São Paulo. Fundada por alunos apaixonados, representamos a BA nas principais competições universitárias com muito suor, tinta e determinação.";

  const quemSomosCompleto = configHome?.texto_quem_somos_completo || null;

  const heroImgUrl = configHome?.foto_hero?.asset 
    ? urlFor(configHome.foto_hero).width(1600).url() 
    : null;

  return (
    <>
      <section className="relative w-full" id="hero-banner">
        <div
          className="w-full relative"
          style={{ minHeight: "clamp(420px, 60vh, 680px)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: heroImgUrl ? `url('${heroImgUrl}')` : undefined,
              backgroundColor: heroImgUrl ? undefined : "var(--surface2)",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#0f0f0f]" />

          <div
            className="relative z-10 flex flex-col justify-end"
            style={{ minHeight: "clamp(420px, 60vh, 680px)", paddingBottom: "clamp(40px, 6vw, 80px)" }}
          >
            <div
              className="w-full mx-auto"
              style={{ maxWidth: "1400px", paddingLeft: "clamp(32px, 8vw, 120px)", paddingRight: "clamp(32px, 8vw, 120px)" }}
            >
              <h1
                className="font-heading leading-[0.92] tracking-[1px] mb-5 drop-shadow-2xl"
                style={{
                  fontSize: "clamp(48px, 8vw, 100px)",
                  color: "#ffffff",
                }}
              >
                ATLÉTICA
                <br />
                <span style={{ color: "var(--crimson)" }}>BELAS ARTES</span>
              </h1>

              {configHome?.subtitulo_hero && (
                <p
                  className="text-[15px] md:text-[18px] font-medium"
                  style={{ color: "rgba(255,255,255,0.75)", maxWidth: "520px" }}
                >
                  {configHome.subtitulo_hero}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <JogosCard jogos={jogos} />

      <section className="content-wrapper" style={{ paddingTop: "clamp(32px, 5vw, 60px)", paddingBottom: "clamp(32px, 5vw, 60px)" }}>
        <div className="max-w-5xl mx-auto md:flex gap-14 lg:gap-20 items-start">
          <div className="hidden md:flex shrink-0">
            <div
              className="rounded-2xl flex items-center justify-center font-heading shadow-xl"
              style={{
                width: "clamp(120px, 12vw, 160px)",
                height: "clamp(120px, 12vw, 160px)",
                fontSize: "clamp(44px, 5.5vw, 64px)",
                background:
                  "linear-gradient(135deg, var(--crimson-dark), var(--crimson))",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.25)",
              }}
            >
              BA
            </div>
          </div>

          <div className="flex-1">
            <h2
              className="font-heading tracking-wide mb-5"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                color: "var(--text)",
              }}
            >
              Quem Somos
            </h2>
            <div className="mb-6">
              <Paragraphs text={quemSomosResumo} />
            </div>
            <ExpandableText text={null} value={quemSomosCompleto} />
          </div>
        </div>
      </section>

      {proximosEventos.length > 0 && (
        <section 
          className="w-full" 
          style={{ paddingTop: "32px", paddingBottom: "60px" }}
        >
          <div className="content-wrapper">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-10 md:mb-14">
                <div>
                  <h2
                    className="font-heading leading-none mb-2 pl-2 md:pl-4"
                    style={{
                      fontSize: "clamp(30px, 4vw, 48px)",
                      color: "var(--text)",
                    }}
                  >
                    Próximos Eventos
                  </h2>
                  <p
                    className="text-[14px] md:text-[16px] hidden md:block"
                    style={{ color: "var(--text-main)" }}
                  >
                    Fique por dentro das melhores festas e campeonatos
                  </p>
                </div>
                <Link
                  href="/eventos"
                  className="text-[13px] md:text-[14px] font-semibold flex items-center gap-1.5 shrink-0 ml-4 py-2 px-1 transition-opacity hover:opacity-70"
                  style={{ color: "var(--crimson)" }}
                >
                  Ver todos
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                {proximosEventos.slice(0, 3).map((evento: any, index: number) => (
                  <EventCard
                    key={evento._id}
                    evento={evento}
                    className={index === 2 ? "hidden lg:flex" : ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {configCompeticoes?.competicoes && configCompeticoes.competicoes.length > 0 && (
        <section 
          className="w-full"
          style={{ paddingTop: "32px", paddingBottom: "clamp(48px, 6vw, 80px)" }}
        >
          <div className="content-wrapper">
            <div className="max-w-5xl mx-auto">
              <h2
                className="font-heading mb-3"
                style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "var(--text)" }}
              >
                Onde Competimos
              </h2>
              <p
                className="text-[14px] md:text-[16px] mb-10 md:mb-16"
                style={{ color: "var(--text-main)" }}
              >
                Representando a Belas Artes nos maiores palcos universitários
              </p>

              <div className="flex flex-col gap-10 md:gap-14">
                {configCompeticoes.competicoes.map((comp: any) => {
                  const fotoUrl = comp.foto?.asset 
                    ? urlFor(comp.foto).width(800).url() 
                    : null;
                  return (
                    <div key={comp.sigla} className="flex flex-col gap-5">
                      <div className="flex flex-col md:flex-row gap-6 md:items-start">
                        {fotoUrl ? (
                          <img
                            src={fotoUrl}
                            alt={comp.nome}
                            className="w-full md:w-[280px] lg:w-[320px] aspect-[16/9] rounded-2xl object-cover shrink-0"
                          />
                        ) : (
                          <div
                            className="w-full md:w-[280px] lg:w-[320px] aspect-[16/9] rounded-2xl flex items-center justify-center font-heading text-[44px] shrink-0"
                            style={{
                              background: "var(--surface2)",
                              color: "var(--text3)",
                            }}
                          >
                            {comp.sigla}
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex items-baseline gap-4 mb-3">
                            <span className="font-heading text-[32px] md:text-[44px]" style={{ color: "var(--crimson)" }}>
                              {comp.sigla}
                            </span>
                            <h3 className="text-[18px] md:text-[22px] font-bold" style={{ color: "var(--text-main)" }}>
                              {comp.nome}
                            </h3>
                          </div>
                          <p className="text-[15px] md:text-[16px] leading-[1.7]" style={{ color: "var(--text2)" }}>
                            {comp.descricao}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <div
        className="w-full border-t"
        style={{ borderColor: "var(--border)" }}
      />

      <section className="content-wrapper pt-16 pb-10 md:pt-24 md:pb-16 border-t" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <span
            className="font-heading text-[18px] md:text-[20px] tracking-wide"
            style={{ color: "var(--text3)" }}
          >
            {configHome?.frase_footer || "Venha defender as cores da BA"}
          </span>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <FooterLink
              href="/contato"
              label="Contato / Ajuda"
              icon={
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}

interface FooterLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function FooterLink({ href, label, icon }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-[13px] font-medium transition-colors group py-2"
      style={{ color: "var(--text3)" }}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <svg
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        {icon}
      </svg>
      {label}
    </Link>
  );
}
