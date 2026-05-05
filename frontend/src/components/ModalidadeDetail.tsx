"use client";

import { useState, useEffect } from "react";
import { 
  type Modalidade, 
  type Resultado, 
  type Treino, 
  type Conquista, 
  type MembroModalidade,
  getResultados,
  getTreinos,
  getConquistas,
  getMembrosModalidade,
  getStrapiMedia
} from "@/lib/strapi";

type InnerTab = "resultados" | "treinos" | "conquistas" | "elenco";

interface ModalidadeDetailProps {
  modalidade: Modalidade;
  cursoNome: string;
  cursoColor: string | null;
  onClose: () => void;
}

export function ModalidadeDetail({ modalidade, cursoNome, cursoColor, onClose }: ModalidadeDetailProps) {
  const [activeTab, setActiveTab] = useState<InnerTab>("resultados");
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [membros, setMembros] = useState<MembroModalidade[]>([]);
  const [loading, setLoading] = useState(true);

  const color = cursoColor || "#8b1a1a";
  const fotoBanner = getStrapiMedia(modalidade.foto_banner?.url);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const docId = modalidade.documentId;

        const [resRes, resTre, resCon, resMem] = await Promise.all([
          getResultados(docId),
          getTreinos(docId),
          getConquistas(docId),
          getMembrosModalidade(docId),
        ]);

        setResultados(resRes || []);
        setTreinos(resTre || []);
        setConquistas(resCon || []);
        setMembros(resMem || []);
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [modalidade.documentId]);

  const totalJogos = resultados.length;
  const vitorias = resultados.filter(r => r.placar_nos != null && r.placar_adversario != null && r.placar_nos > r.placar_adversario).length;
  const derrotas = resultados.filter(r => r.placar_nos != null && r.placar_adversario != null && r.placar_nos < r.placar_adversario).length;
  const empates = resultados.filter(r => r.placar_nos != null && r.placar_adversario != null && r.placar_nos === r.placar_adversario).length;

  const tabs: { id: InnerTab; label: string }[] = [
    { id: "resultados", label: "Resultados" },
    { id: "treinos", label: "Treinos" },
    { id: "conquistas", label: "Conquistas" },
    { id: "elenco", label: "Elenco" },
  ];

  return (
    <>
      <div className="drawer-overlay open" onClick={onClose} style={{ zIndex: 9998 }} />

      <div className="slide-panel open" style={{ zIndex: 9999, top: 0, bottom: 0 }}>
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

          {!loading && totalJogos > 0 && (
            <div
              className="grid grid-cols-4 border-y"
              style={{ borderColor: "var(--border)" }}
            >
              <StatCell value={totalJogos} label="JOGOS" />
              <StatCell value={vitorias} label="VITÓRIAS" color="#4caf50" />
              <StatCell value={derrotas} label="DERROTAS" color="#f44336" />
              <StatCell value={empates} label="EMPATES" color="#7c84a4" />
            </div>
          )}

          <div
            className="flex border-b overflow-x-auto"
            style={{ borderColor: "var(--border)" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 min-w-[80px] py-3 text-[12px] md:text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap text-center"
                style={{
                  color: activeTab === tab.id ? "var(--text)" : "var(--text3)",
                  borderColor: activeTab === tab.id ? color : "transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div 
            className="detail-body py-6"
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
                {activeTab === "resultados" && <TabResultados resultados={resultados} />}
                {activeTab === "treinos" && <TabTreinos treinos={treinos} />}
                {activeTab === "conquistas" && <TabConquistas conquistas={conquistas} />}
                {activeTab === "elenco" && <TabElenco modalidade={modalidade} membros={membros} color={color} />}
              </>
            )}
          </div>
        </div>

        {modalidade.capitao_whatsapp && (
          <div className="sticky-cta">
            <a
              href={`https://wa.me/55${modalidade.capitao_whatsapp.replace(/\D/g, "")}`}
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
              Falar com {modalidade.capitao_nome}
            </a>
          </div>
        )}
      </div>
    </>
  );
}

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

function TabResultados({ resultados }: { resultados: Resultado[] }) {
  if (resultados.length === 0) {
    return <EmptyState text="Nenhum resultado registrado." />;
  }

  return (
    <div className="flex flex-col gap-2">
      {resultados.map((r) => {
        const nos = r.placar_nos ?? 0;
        const adv = r.placar_adversario ?? 0;
        const outcome = nos > adv ? "win" : nos < adv ? "loss" : "draw";
        const outcomeLabel = nos > adv ? "VITÓRIA" : nos < adv ? "DERROTA" : "EMPATE";
        const colors = {
          win: { indicator: "#4caf50", text: "#4caf50" },
          loss: { indicator: "#f44336", text: "#f44336" },
          draw: { indicator: "#9e9e9e", text: "var(--text3)" },
        };

        return (
          <div
            key={r.documentId}
            className="flex items-center gap-3 py-3 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="w-[3px] h-10 rounded-full shrink-0"
              style={{ background: colors[outcome].indicator }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium truncate" style={{ color: "#000000" }}>
                vs {r.adversario}
              </p>
              <p className="text-[11px] truncate" style={{ color: "var(--text3)" }}>
                {r.competicao || "Amistoso"}
                {r.data && ` · ${new Date(r.data).toLocaleDateString("pt-BR", { day: "numeric", month: "short" })}`}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[15px] font-bold" style={{ color: colors[outcome].text }}>
                {nos}–{adv}
              </p>
              <p className="text-[9px] font-bold tracking-wider" style={{ color: colors[outcome].text }}>
                {outcomeLabel}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const diasLabels: Record<string, string> = {
  segunda: "Segunda-feira",
  terca: "Terça-feira",
  quarta: "Quarta-feira",
  quinta: "Quinta-feira",
  sexta: "Sexta-feira",
  sabado: "Sábado",
  domingo: "Domingo",
};

function TabTreinos({ treinos }: { treinos: Treino[] }) {
  if (treinos.length === 0) {
    return <EmptyState text="Nenhum horário de treino cadastrado." />;
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        {treinos.map((t) => (
          <div
            key={t.documentId}
            className="flex items-center justify-between py-3 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="text-[13px] font-medium" style={{ color: "#000000" }}>
              {diasLabels[t.dia_semana] || t.dia_semana}
            </span>
            <div className="text-right">
              {t.local && (
                <p className="text-[12px] font-medium" style={{ color: "var(--text2)" }}>
                  {t.local}
                </p>
              )}
              {t.hora_inicio && (
                <p className="text-[11px]" style={{ color: "var(--text3)" }}>
                  {t.hora_inicio}{t.hora_fim ? ` – ${t.hora_fim}` : ""}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-4 p-3 rounded-lg text-[12px] leading-relaxed"
        style={{
          background: "rgba(92, 100, 132, 0.06)",
          border: "0.5px solid rgba(92, 100, 132, 0.2)",
          color: "var(--text2)",
        }}
      >
        Treinos abertos a novos atletas. Entre em contato com o capitão para mais informações.
      </div>
    </div>
  );
}

const medalhaConfig: Record<string, { emoji: string; label: string; color: string; bg: string; border: string }> = {
  ouro: { emoji: "🥇", label: "OURO", color: "#c9a84c", bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.3)" },
  prata: { emoji: "🥈", label: "PRATA", color: "#666666", bg: "rgba(0,0,0,0.05)", border: "rgba(0,0,0,0.1)" },
  bronze: { emoji: "🏅", label: "BRONZE", color: "#cd7f32", bg: "rgba(205,127,50,0.1)", border: "rgba(205,127,50,0.3)" },
  premio: { emoji: "⭐", label: "PRÊMIO", color: "#e02c2c", bg: "rgba(224,44,44,0.1)", border: "rgba(224,44,44,0.3)" },
};

function TabConquistas({ conquistas }: { conquistas: Conquista[] }) {
  if (conquistas.length === 0) {
    return <EmptyState text="Nenhuma conquista registrada ainda." />;
  }

  return (
    <div className="flex flex-col gap-2">
      {conquistas.map((c) => {
        const config = c.medalha ? medalhaConfig[c.medalha] : medalhaConfig.premio;
        return (
          <div
            key={c.documentId}
            className="flex items-center gap-3 py-3 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="text-[22px] w-9 text-center shrink-0">{config.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium truncate" style={{ color: "#000000" }}>
                {c.titulo}
              </p>
              {c.ano && (
                <p className="text-[11px]" style={{ color: "var(--text3)" }}>
                  {c.ano}
                </p>
              )}
            </div>
            <span
              className="text-[10px] font-bold px-2 py-1 rounded-lg shrink-0"
              style={{ color: config.color, background: config.bg, border: `0.5px solid ${config.border}` }}
            >
              {config.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function TabElenco({
  modalidade,
  membros,
  color,
}: {
  modalidade: Modalidade;
  membros: MembroModalidade[];
  color: string;
}) {
  // Logic for roles
  const capitais = membros.filter(m => m.cargo === "capitão");
  const elencoRestante = membros.filter(m => m.cargo !== "capitão");

  if (capitais.length === 0 && elencoRestante.length === 0 && !modalidade.capitao_nome) {
    return null;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      {/* Capitão do CMS (Se existir como membro com cargo 'capitão') */}
      {capitais.map((m) => {
        const fotoUrl = getStrapiMedia(m.foto?.url);
        return (
          <div
            key={m.documentId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              background: "#ececec",
              borderRadius: "10px",
              overflow: "hidden",
              gridColumn: "span 2",
              border: `1px solid ${color}44`
            }}
          >
            {fotoUrl ? (
              <img
                src={fotoUrl}
                alt={m.nome}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: color,
                  color: "#f4f4f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {getInitials(m.nome)}
              </div>
            )}
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {m.nome}
              </p>
              <p style={{ fontSize: "11px", color: color, fontWeight: 600 }}>Capitão</p>
            </div>
          </div>
        );
      })}

      {/* Fallback para Capitão Antigo (caso não tenha membros com o novo cargo 'capitão') */}
      {capitais.length === 0 && modalidade.capitao_nome && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            background: "#ececec",
            borderRadius: "10px",
            overflow: "hidden",
            gridColumn: "span 2",
            border: `1px solid ${color}44`
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: color,
              color: "#f4f4f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {getInitials(modalidade.capitao_nome)}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {modalidade.capitao_nome}
            </p>
            <p style={{ fontSize: "11px", color: color, fontWeight: 600 }}>Capitão</p>
          </div>
        </div>
      )}

      {/* Membros do Elenco (Restante) */}
      {elencoRestante.map((m) => {
        const fotoUrl = getStrapiMedia(m.foto?.url);
        return (
          <div
            key={m.documentId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              background: "#ececec",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {fotoUrl ? (
              <img
                src={fotoUrl}
                alt={m.nome}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#5c6484",
                  color: "#f4f4f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {getInitials(m.nome)}
              </div>
            )}
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {m.nome}
              </p>
              {m.cargo && (
                <p style={{ fontSize: "11px", color: "#6e6a64", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {m.cargo}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-[14px]" style={{ color: "var(--text3)" }}>{text}</p>
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
