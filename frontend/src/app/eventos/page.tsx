import type { Metadata } from "next";
import { getEventos, type Evento } from "@/lib/strapi";
import { EventosList } from "@/components/EventosList";

export const metadata: Metadata = {
  title: "Eventos — Atlética Belas Artes",
  description: "Confira os próximos eventos e a galeria da Atlética Belas Artes.",
};

export default async function EventosPage() {
  const todosEventos = await getEventos().catch(() => [] as Evento[]);

  const agora = new Date();
  const proximos = todosEventos.filter((e) => new Date(e.data) >= agora);
  const passados = todosEventos
    .filter((e) => new Date(e.data) < agora)
    .reverse();

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--blue-header)",
        }}
      >
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]" style={{ color: "var(--crimson)" }}>
            Eventos
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Festas, campeonatos e tudo que rola na BA
          </p>
        </div>
      </section>

      <EventosList proximos={proximos} passados={passados} />
    </>
  );
}
