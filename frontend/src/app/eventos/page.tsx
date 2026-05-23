import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { EventosList } from "@/components/EventosList";
import type { EventoDTO } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Eventos — Atlética Belas Artes",
  description: "Confira os próximos eventos e a galeria da Atlética Belas Artes.",
};

/** Página de Eventos, listando festas e integrações disponíveis */
export default async function EventosPage() {
  const todosEventos = await client.fetch<EventoDTO[]>(`*[_type == "evento" && ativo == true] | order(data asc){
    _id, nome, data, local, endereco, arte, status_lote, link_ingresso, aftermovie_url
  }`).catch(() => [] as EventoDTO[]);

  const agora = new Date();
  const proximos = todosEventos.filter((e) => new Date(e.data) >= agora);
  const passados = todosEventos
    .filter((e) => new Date(e.data) < agora)
    .reverse();

  return (
    <>
      <section className="page-hero">
        <div className="content-wrapper py-10 md:py-16 lg:py-20">
          <h1 className="font-heading text-[32px] md:text-[48px] tracking-[0.5px]">
            Eventos
          </h1>
          <p className="page-hero-subtitle text-[14px] md:text-[16px] mt-2">
            Festas, campeonatos e tudo que rola na BA
          </p>
        </div>
      </section>

      <EventosList proximos={proximos} passados={passados} />
    </>
  );
}
