"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* =================== FOTO DA ATLÉTICA (HERO) =================== */}
      <section className="relative w-full" id="hero-banner">
        <div
          className="w-full relative"
          style={{ minHeight: "clamp(420px, 60vh, 680px)" }}
        >
          {/* Imagem de fundo */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#0f0f0f]" />

          {/* Conteúdo — fica na parte de baixo da imagem */}
          <div
            className="relative z-10 flex flex-col justify-end"
            style={{ minHeight: "clamp(420px, 60vh, 680px)", paddingBottom: "clamp(40px, 6vw, 80px)" }}
          >
            <div
              className="w-full mx-auto px-6 md:px-12 lg:px-16"
              style={{ maxWidth: "1400px" }}
            >
              <div
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-6 border"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  borderColor: "rgba(201,168,76,0.4)",
                  color: "var(--gold)",
                  backdropFilter: "blur(8px)",
                }}
              >
                A maior de São Paulo
              </div>

              <h1
                className="font-heading leading-[0.92] tracking-[1px] mb-5 drop-shadow-2xl"
                style={{
                  fontSize: "clamp(48px, 8vw, 100px)",
                  color: "var(--text)",
                }}
              >
                ATLÉTICA{" "}
                <span style={{ color: "var(--crimson-light)" }}>BELAS ARTES</span>
              </h1>

              <p
                className="text-[15px] md:text-[18px] font-medium"
                style={{ color: "rgba(240,236,228,0.75)", maxWidth: "520px" }}
              >
                A fúria do design, a força da arquitetura e a garra das artes.
                Junte-se à nossa matilha!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SEÇÃO 2: QUEM SOMOS ====== */}
      <section className="content-wrapper" style={{ paddingTop: "clamp(80px, 10vw, 160px)", paddingBottom: "clamp(80px, 10vw, 160px)" }}>
        <div className="max-w-5xl mx-auto md:flex gap-14 lg:gap-20 items-start">
          {/* Ícone BA — só desktop, alinhado ao topo do texto */}
          <div className="hidden md:flex shrink-0">
            <div
              className="rounded-2xl flex items-center justify-center font-heading shadow-xl"
              style={{
                width: "clamp(120px, 12vw, 160px)",
                height: "clamp(120px, 12vw, 160px)",
                fontSize: "clamp(44px, 5.5vw, 64px)",
                background:
                  "linear-gradient(135deg, var(--crimson-dark), var(--crimson))",
                color: "var(--gold)",
                border: "1px solid rgba(201, 168, 76, 0.25)",
              }}
            >
              BA
            </div>
          </div>

          {/* Texto */}
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
            <p
              className="text-[15px] md:text-[16px] leading-[1.8] mb-6"
              style={{ color: "var(--text2)" }}
            >
              A Atlética Belas Artes é a entidade esportiva oficial da
              Faculdade Belas Artes de São Paulo. Fundada por alunos
              apaixonados, representamos a BA nas principais competições
              universitárias com muito suor, tinta e determinação.
            </p>
            <ExpandableText />
          </div>
        </div>
      </section>

      {/* Separador visual */}
      <div
        className="w-full border-t"
        style={{ borderColor: "var(--border)" }}
      />

      {/* ====== SEÇÃO 3: PRÓXIMOS EVENTOS ====== */}
      <section className="content-wrapper py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho da seção */}
          <div className="flex justify-between items-end mb-10 md:mb-14">
            <div>
              <h2
                className="font-heading leading-none mb-2"
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  color: "var(--text)",
                }}
              >
                Próximos Eventos
              </h2>
              <p
                className="text-[14px] md:text-[16px] hidden md:block"
                style={{ color: "var(--text3)" }}
              >
                Fique por dentro das melhores festas e campeonatos
              </p>
            </div>
            <Link
              href="/eventos"
              className="text-[13px] md:text-[14px] font-semibold flex items-center gap-1.5 shrink-0 ml-4 transition-opacity hover:opacity-70"
              style={{ color: "var(--crimson-light)" }}
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

          {/* Cards de eventos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            <EventCard
              title="Balada da Virada 2025"
              date="12 de Outubro"
              location="Nos Trilhos, Mooca"
              status="LOTE 2"
              statusColor="gold"
              img="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop"
            />
            <EventCard
              title="Cervejada BA"
              date="25 de Novembro"
              location="Estacionamento FBA"
              status="À VENDA"
              statusColor="green"
              img="https://images.unsplash.com/photo-1540039155732-68ee23e15b51?q=80&w=1974&auto=format&fit=crop"
            />
            <EventCard
              title="Interartes"
              date="Dezembro"
              location="São Carlos - SP"
              status="EM BREVE"
              statusColor="neutral"
              img="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
              className="hidden lg:flex"
            />
          </div>
        </div>
      </section>

      {/* Separador visual */}
      <div
        className="w-full border-t"
        style={{ borderColor: "var(--border)" }}
      />

      {/* ====== SEÇÃO 4: RODAPÉ DE LINKS (compacto, discreto) ====== */}
      <section className="content-wrapper py-8 md:py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <span
            className="font-heading text-[18px] md:text-[20px] tracking-wide"
            style={{ color: "var(--text3)" }}
          >
            Faça parte da matilha
          </span>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <FooterLink
              href="#"
              label="Seja Sócio"
              hoverColor="var(--crimson-light)"
              icon={
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              }
            />
            <FooterLink
              href="#"
              label="Nossos Produtos"
              hoverColor="var(--gold)"
              icon={
                <>
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </>
              }
            />
            <FooterLink
              href="#"
              label="Contato"
              hoverColor="#60a5fa"
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

/* ====== SUB-COMPONENTES ====== */

function ExpandableText() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "400px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p
          className="text-[15px] md:text-[16px] leading-[1.8] pt-1 pb-5"
          style={{ color: "var(--text2)" }}
        >
          Desde a nossa fundação, construímos uma história de vitórias,
          amizades e momentos inesquecíveis. Nossos times competem em diversas
          modalidades, levando o nome da BA com orgulho por toda São Paulo e em
          jogos universitários por todo o estado. Mais do que esporte, somos
          comunidade.
        </p>
      </div>

      <button
        className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full text-[13px] font-medium transition-all border"
        style={{
          color: "var(--text2)",
          borderColor: "var(--border)",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--text3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--border)";
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? "Ler menos" : "Conheça nossa história"}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </>
  );
}

/* Card de evento reutilizável */
interface EventCardProps {
  title: string;
  date: string;
  location: string;
  status: string;
  statusColor: "gold" | "green" | "neutral";
  img: string;
  className?: string;
}

const statusStyles = {
  gold: "bg-[rgba(201,168,76,0.12)] text-[#e8c97a] border-[rgba(201,168,76,0.3)]",
  green:
    "bg-[rgba(76,175,80,0.12)] text-[#81c784] border-[rgba(76,175,80,0.3)]",
  neutral: "bg-zinc-800/80 text-zinc-400 border-zinc-700",
};

function EventCard({
  title,
  date,
  location,
  status,
  statusColor,
  img,
  className = "",
}: EventCardProps) {
  return (
    <Link
      href="/eventos"
      className={`flex flex-col rounded-[var(--radius)] overflow-hidden border group transition-all hover:border-[var(--crimson)] shadow-md hover:shadow-xl ${className}`}
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Imagem com overlay */}
      <div
        className="h-[200px] relative flex items-end p-5 overflow-hidden"
        style={{
          backgroundImage: `url('${img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <h3
          className="font-heading text-[26px] relative z-10 tracking-wide drop-shadow-md transition-colors group-hover:text-[var(--gold)]"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h3>
      </div>

      {/* Footer do card */}
      <div
        className="px-5 py-4 flex justify-between items-center"
        style={{ background: "var(--surface)" }}
      >
        <div className="flex flex-col gap-0.5">
          <span
            className="text-[13px] font-semibold"
            style={{ color: "var(--text)" }}
          >
            {date}
          </span>
          <span className="text-[11px]" style={{ color: "var(--text3)" }}>
            {location}
          </span>
        </div>
        <span
          className={`text-[10px] font-bold px-4 py-1.5 rounded-md border tracking-wider ${statusStyles[statusColor]}`}
        >
          {status}
        </span>
      </div>
    </Link>
  );
}

/* Link de rodapé reutilizável */
interface FooterLinkProps {
  href: string;
  label: string;
  hoverColor: string;
  icon: React.ReactNode;
}

function FooterLink({ href, label, hoverColor, icon }: FooterLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 text-[13px] font-medium transition-colors group"
      style={{ color: "var(--text3)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = hoverColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--text3)";
      }}
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
    </a>
  );
}
