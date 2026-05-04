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
      <div className="content-wrapper" style={{ marginTop: "24px" }}>
        <div 
          className="inline-flex rounded-xl overflow-hidden p-1" 
          style={{ background: "#5c6484" }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  color: isActive ? "#f4f4f4" : "rgba(244,244,244,0.6)",
                  borderBottom: isActive ? "2px solid #f4f4f4" : "2px solid transparent",
                  background: "transparent",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                }}
                id={`ev-tab-${tab.id}`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "20px",
                      background: "rgba(244,244,244,0.2)",
                      color: "#f4f4f4",
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="content-wrapper pt-24 pb-12 md:pt-32 md:pb-20">
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
