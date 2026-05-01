import type { Metadata } from "next";
import { getEventos, type Evento } from "@/lib/strapi";
import { EventosList } from "@/components/EventosList";

export const metadata: Metadata = {
  title: "Eventos — Atlética Belas Artes",
  description: "Confira os próximos eventos e a galeria da Atlética Belas Artes.",
};

/**
 * Página de Eventos — Server Component.
 * Busca todos os eventos do Strapi e divide em "próximos" e "passados".
 */
export default async function EventosPage() {
  const todosEventos = await getEventos().catch(() => [] as Evento[]);

  // Divide eventos por data: futuros vs passados
  const agora = new Date();
  const proximos = todosEventos.filter((e) => new Date(e.data) >= agora);
  const passados = todosEventos
    .filter((e) => new Date(e.data) < agora)
    .reverse(); // Mais recente primeiro na galeria

  return (
    <>
      {/* Hero compacto */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #2a0808 0%, #1a0505 40%, #0f0f0f 100%)",
        }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]">
            Eventos
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "var(--text2)" }}
          >
            Festas, campeonatos e tudo que rola na BA
          </p>
        </div>
      </section>

      {/* Abas e listagem — Client Component */}
      <EventosList proximos={proximos} passados={passados} />
    </>
  );
}
