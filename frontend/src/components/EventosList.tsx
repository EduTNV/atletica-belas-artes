"use client";

import { useState } from "react";
import type { Evento } from "@/lib/strapi";
import { EventCard } from "@/components/EventCard";
import { EventDetail } from "@/components/EventDetail";

type TabId = "proximos" | "galeria";

interface EventosListProps {
  proximos: Evento[];
  passados: Evento[];
}

/**
 * Componente client-side que gerencia as abas "Próximos" e "Galeria"
 * e o painel de detalhe slide-in ao clicar em um evento.
 */
export function EventosList({ proximos, passados }: EventosListProps) {
  const [activeTab, setActiveTab] = useState<TabId>("proximos");
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "proximos", label: "Próximos", count: proximos.length },
    { id: "galeria", label: "Galeria", count: passados.length },
  ];

  const eventos = activeTab === "proximos" ? proximos : passados;

  return (
    <>
      {/* Tabs */}
      <div className="content-wrapper mt-4">
        <div
          className="flex border-b gap-4 md:gap-8"
          style={{ borderColor: "var(--border)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="py-[14px] px-2 md:px-4 text-[14px] md:text-[16px] font-medium border-b-2 transition-colors"
              style={{
                color: activeTab === tab.id ? "var(--text)" : "var(--text3)",
                borderColor: activeTab === tab.id ? "var(--crimson)" : "transparent",
              }}
              id={`ev-tab-${tab.id}`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className="ml-2 text-[11px] px-2 py-[2px] rounded-full"
                  style={{
                    background: activeTab === tab.id
                      ? "rgba(139, 26, 26, 0.2)"
                      : "rgba(255,255,255,0.06)",
                    color: activeTab === tab.id
                      ? "var(--crimson-light)"
                      : "var(--text3)",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo da aba ativa */}
      <div className="content-wrapper py-10 md:py-16 mt-4">
        {eventos.length === 0 ? (
          <div
            className="text-center py-16 md:py-24"
            style={{ color: "var(--text3)" }}
          >
            <p className="text-[15px]">
              {activeTab === "proximos"
                ? "Nenhum evento próximo no momento."
                : "Nenhum evento passado registrado."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {eventos.map((evento) => (
              <div
                key={evento.documentId}
                onClick={() => setSelectedEvento(evento)}
                className="cursor-pointer"
              >
                <EventCard
                  evento={evento}
                  disableLink
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Painel de detalhe do evento (slide-in) */}
      {selectedEvento && (
        <EventDetail
          evento={selectedEvento}
          onClose={() => setSelectedEvento(null)}
        />
      )}
    </>
  );
}
