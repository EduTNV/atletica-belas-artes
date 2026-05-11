import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { EventosList } from "@/components/EventosList";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Eventos — Atlética Belas Artes",
  description: "Confira os próximos eventos e a galeria da Atlética Belas Artes.",
};

/** Página de Eventos, listando festas e integrações disponíveis */
export default async function EventosPage() {
  const todosEventos = await client.fetch(`*[_type == "evento" && ativo == true] | order(data asc){
    _id, nome, data, local, endereco, arte, status_lote, link_ingresso, aftermovie_url
  }`).catch(() => []);

  const agora = new Date();
  const proximos = todosEventos.filter((e: any) => new Date(e.data) >= agora);
  const passados = todosEventos
    .filter((e: any) => new Date(e.data) < agora)
    .reverse();

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
            Eventos
          </h1>
          <p
            className="text-[14px] md:text-[16px] mt-2"
            style={{ color: "rgba(244, 244, 244, 0.75)" }}
          >
            Festas, campeonatos e tudo que rola na BA
          </p>
        </div>
      </section>

      <EventosList proximos={proximos} passados={passados} />
    </>
  );
}
