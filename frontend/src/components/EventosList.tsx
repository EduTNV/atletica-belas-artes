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
      <div className="content-wrapper mt-10 md:mt-16">
        <div className="flex flex-wrap gap-4 md:gap-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center justify-between gap-6 py-4 px-6 md:px-8 
                  rounded-2xl border-2 transition-all duration-300 min-w-[160px] md:min-w-[200px]
                  hover:scale-[1.02] active:scale-[0.98]
                `}
                style={{
                  background: isActive ? "var(--blue-header)" : "transparent",
                  borderColor: isActive ? "var(--crimson)" : "var(--border)",
                  boxShadow: isActive ? "0 10px 25px -5px rgba(92, 100, 132, 0.2)" : "none",
                }}
                id={`ev-tab-${tab.id}`}
              >
                <span 
                  className="text-base md:text-lg font-bold tracking-wide"
                  style={{ color: isActive ? "var(--crimson)" : "var(--text-main)" }}
                >
                  {tab.label.toUpperCase()}
                </span>
                
                {tab.count >= 0 && (
                  <span
                    className="flex items-center justify-center min-w-[28px] h-[28px] px-2 text-[12px] font-bold rounded-lg transition-colors"
                    style={{
                      background: isActive ? "var(--crimson)" : "var(--surface)",
                      color: isActive ? "white" : "var(--text-main)",
                      border: isActive ? "none" : "1px solid var(--border)",
                    }}
                  >
                    {tab.count}
                  </span>
                )}

                {isActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--crimson)] rounded-full border-2 border-[var(--bg)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="content-wrapper py-12 md:py-20">
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

      {selectedEvento && (
        <EventDetail
          evento={selectedEvento}
          onClose={() => setSelectedEvento(null)}
        />
      )}
    </>
  );
}
