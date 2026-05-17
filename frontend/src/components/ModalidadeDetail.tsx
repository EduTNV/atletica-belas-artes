"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import type { ModalidadeListDTO, JogoModalidadeDTO, TreinoDTO, ConquistaDTO, MembroModalidadeDTO } from "@/types/sanity";
import { TabJogos } from "./TabJogos";
import { TabTreinos } from "./TabTreinos";
import { TabConquistas } from "./TabConquistas";
import { TabElenco } from "./TabElenco";
import { useFocusTrap } from "@/hooks/useFocusTrap";
type InnerTab = "jogos" | "treinos" | "conquistas" | "elenco";

interface ModalidadeDetailProps {
  modalidade: ModalidadeListDTO;
  cursoNome: string;
  cursoColor: string | null;
  onClose: () => void;
}

/** Painel de visualização detalhada para uma modalidade (Resultados, Treinos, etc) */
export function ModalidadeDetail({ modalidade, cursoColor, onClose }: ModalidadeDetailProps) {
  const panelRef = useFocusTrap(true);
  const [activeTab, setActiveTab] = useState<InnerTab>("jogos");
  const [jogosModalidade, setJogosModalidade] = useState<JogoModalidadeDTO[]>([]);
  const [treinos, setTreinos] = useState<TreinoDTO[]>([]);
  const [conquistas, setConquistas] = useState<ConquistaDTO[]>([]);
  const [membros, setMembros] = useState<MembroModalidadeDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const color = cursoColor || "#8b1a1a";
  const fotoBanner = modalidade.foto_banner?.asset 
    ? urlFor(modalidade.foto_banner).width(1200).url() 
    : null;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const id = modalidade._id;

        const [resJogos, resTre, resCon, resMem] = await Promise.all([
          client.fetch(`*[_type == "jogo" && modalidade._ref == $id] | order(data_hora desc){
            _id, time_casa, time_visitante, belas_artes_posicao, competicao, fase, data_hora, local, placar_casa, placar_visitante, estado
          }`, { id }),
          client.fetch(`*[_type == "treino" && modalidade._ref == $id]{
            _id, dia_semana, hora_inicio, hora_fim, local, aberto_novos_atletas
          }`, { id }),
          client.fetch(`*[_type == "conquista" && modalidade._ref == $id] | order(ano desc){
            _id, titulo, ano, medalha
          }`, { id }),
          client.fetch(`*[_type == "membroModalidade" && modalidade._ref == $id] | order(ordem asc){
            _id, nome, cargo, foto, ordem,
            curso->{ nome, cor }
          }`, { id }),
        ]);

        setJogosModalidade(resJogos || []);
        setTreinos(resTre || []);
        setConquistas(resCon || []);
        setMembros(resMem || []);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [modalidade._id]);

  const finalizados = jogosModalidade.filter(j => j.estado === "finalizado");
  
  let vitorias = 0;
  let derrotas = 0;
  let empates = 0;

  finalizados.forEach(j => {
    const pCasa = j.placar_casa ?? 0;
    const pVis = j.placar_visitante ?? 0;
    
    // Fallback: se não estiver preenchido, assume "casa" por retrocompatibilidade
    const isCasa = j.belas_artes_posicao === "casa" || !j.belas_artes_posicao;
    const isVisitante = j.belas_artes_posicao === "visitante";
    const isNenhum = j.belas_artes_posicao === "nenhum";

    if (isNenhum) return; // Se for jogo neutro (ex: terceirizado), não afeta stats da Atlética

    if (pCasa === pVis) {
      empates++;
    } else if (pCasa > pVis) {
      if (isCasa) vitorias++;
      if (isVisitante) derrotas++;
    } else { // pVis > pCasa
      if (isVisitante) vitorias++;
      if (isCasa) derrotas++;
    }
  });

  const totalJogos = vitorias + derrotas + empates;

  const tabs: { id: InnerTab; label: string }[] = [
    { id: "jogos", label: "Jogos" },
    { id: "treinos", label: "Treinos" },
    { id: "conquistas", label: "Conquistas" },
    { id: "elenco", label: "Elenco" },
  ];

  return (
    <>
      <div className="drawer-overlay open" onClick={onClose} style={{ zIndex: 9998 }} />

      <div ref={panelRef} className="slide-panel open" style={{ zIndex: 9999, top: 0, bottom: 0 }}>
        <div className="panel-header">
          <button className="back-btn" onClick={onClose} id="mod-detail-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Times
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="relative" style={{ height: "clamp(180px, 30vh, 260px)" }}>
            <div
              className="absolute inset-0"
              style={
                fotoBanner
                  ? {
                      backgroundImage: `url('${fotoBanner}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {
                      background: "linear-gradient(160deg, #e02c2c 0%, #f4f4f4 100%)",
                    }
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/50 to-transparent" />

            <div 
              className="absolute bottom-0 left-0 right-0"
              style={{ padding: "20px clamp(24px, 5vw, 32px)" }}
            >
              <h2
                className="font-heading tracking-wide"
                style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#000000" }}
              >
                {modalidade.nome}
              </h2>
            </div>
          </div>

          <div
            className="flex gap-2 overflow-x-auto sticky top-0 z-10"
            style={{ 
              padding: "12px clamp(24px, 5vw, 32px)",
              background: "var(--bg)",
              borderBottom: "1px solid var(--border)"
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 min-w-[70px] py-2.5 text-[12px] md:text-[13px] font-semibold tracking-wide transition-all whitespace-nowrap text-center rounded-lg"
                style={{
                  background: activeTab === tab.id ? "#5c6484" : "transparent",
                  color: activeTab === tab.id ? "#ffffff" : "var(--text3)",
                  border: activeTab === tab.id ? "none" : "1px solid var(--border)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {!loading && totalJogos > 0 && activeTab === "jogos" && (
            <div
              className="grid grid-cols-4 border-b"
              style={{ padding: "0 clamp(24px, 5vw, 32px)", borderColor: "var(--border)" }}
            >
              <StatCell value={totalJogos} label="JOGOS" />
              <StatCell value={vitorias} label="VITÓRIAS" color="#4caf50" />
              <StatCell value={derrotas} label="DERROTAS" color="#f44336" />
              <StatCell value={empates} label="EMPATES" color="#7c84a4" />
            </div>
          )}

          <div 
            className="detail-body py-4"
            style={{ 
              paddingLeft: "clamp(24px, 5vw, 32px)", 
              paddingRight: "clamp(24px, 5vw, 32px)" 
            }}
          >
            {loading ? (
              <div className="text-center py-12" style={{ color: "var(--text3)" }}>
                <p className="text-[14px]">Carregando...</p>
              </div>
            ) : (
              <>
                {activeTab === "jogos" && <TabJogos jogos={jogosModalidade} />}
                {activeTab === "treinos" && <TabTreinos treinos={treinos} />}
                {activeTab === "conquistas" && <TabConquistas conquistas={conquistas} />}
                {activeTab === "elenco" && <TabElenco modalidade={modalidade} membros={membros} color={color} />}
              </>
            )}
          </div>
        </div>

        {modalidade.link_grupo_whatsapp && (
          <div className="sticky-cta">
            <a
              href={modalidade.link_grupo_whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 rounded-xl text-center text-[15px] font-bold tracking-wide transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{
                background: "#25d366",
                color: "#fff",
              }}
              id="mod-detail-cta"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Entrar no Grupo
            </a>
          </div>
        )}
      </div>
    </>
  );
}

/** Renderiza uma célula única de estatística */
function StatCell({ value, label, color }: { value: number; label: string; color?: string }) {
  return (
    <div className="flex flex-col items-center py-4">
      <span
        className="font-heading text-[24px] md:text-[28px]"
        style={{ color: color || "#000000" }}
      >
        {value}
      </span>
      <span className="text-[9px] md:text-[10px] font-bold tracking-[1px]" style={{ color: "var(--text3)" }}>
        {label}
      </span>
    </div>
  );
}
