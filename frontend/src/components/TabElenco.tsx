import type { MembroModalidadeDTO, ModalidadeListDTO } from "@/types/sanity";
import { urlFor } from "@/lib/sanity.image";

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TabElenco({
  modalidade,
  membros,
  color,
}: {
  modalidade: ModalidadeListDTO;
  membros: MembroModalidadeDTO[];
  color: string;
}) {
  if (membros.length === 0 && !modalidade.capitao_nome) {
    return null;
  }

  const tecnico = membros.find(m => m.cargo === "técnico");
  const capitais = membros.filter(m => m.cargo === "capitão");
  const coTecnicos = membros.filter(m => m.cargo === "co-técnico");
  
  const outrosCargos = ["co-capitão", "atleta", "atleta reserva"];
  const restante = membros
    .filter(m => outrosCargos.includes(m.cargo || "") || (!m.cargo && m.nome))
    .sort((a, b) => a.nome.localeCompare(b.nome));

  const renderMembroCard = (m: MembroModalidadeDTO, isFullWidth = false, customLabel?: string) => {
    const fotoUrl = m.foto?.asset 
      ? urlFor(m.foto).width(100).height(100).url() 
      : null;
    const label = customLabel || m.cargo || "Atleta";
    
    return (
      <div
        key={m._id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 12px",
          background: "#ececec",
          borderRadius: "10px",
          overflow: "hidden",
          gridColumn: isFullWidth ? "span 2" : "span 1",
          border: m.cargo === "técnico" || m.cargo === "capitão" ? `1px solid ${color}33` : "none"
        }}
      >
        {fotoUrl ? (
          <img
            src={fotoUrl}
            alt={m.nome}
            style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
        ) : (
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: m.cargo === "técnico" || m.cargo === "capitão" ? color : "#5c6484",
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
          <p style={{ 
            fontSize: "11px", 
            color: m.cargo === "técnico" || m.cargo === "capitão" ? color : "#6e6a64", 
            fontWeight: 600,
            textTransform: "capitalize"
          }}>
            {label}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      {tecnico && renderMembroCard(tecnico, true)}

      {capitais[0] && renderMembroCard(capitais[0])}
      {coTecnicos[0] && renderMembroCard(coTecnicos[0])}

      {restante.map(m => renderMembroCard(m))}

      {membros.length === 0 && modalidade.capitao_nome && (
        <div
          style={{
            display: "flex",
            alignItems: "center", gap: "10px", padding: "10px 12px", background: "#ececec",
            borderRadius: "10px", overflow: "hidden", gridColumn: "span 2", border: `1px solid ${color}44`
          }}
        >
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%", background: color,
            color: "#f4f4f4", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: 700, flexShrink: 0
          }}>
            {getInitials(modalidade.capitao_nome)}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a" }}>{modalidade.capitao_nome}</p>
            <p style={{ fontSize: "11px", color: color, fontWeight: 600 }}>Capitão</p>
          </div>
        </div>
      )}
    </div>
  );
}
