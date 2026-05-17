import type { TreinoDTO } from "@/types/sanity";
import { EmptyState } from "./EmptyState";

const diasLabels: Record<string, string> = {
  segunda: "Segunda-feira",
  terca: "Terça-feira",
  quarta: "Quarta-feira",
  quinta: "Quinta-feira",
  sexta: "Sexta-feira",
  sabado: "Sábado",
  domingo: "Domingo",
};

export function TabTreinos({ treinos }: { treinos: TreinoDTO[] }) {
  if (treinos.length === 0) {
    return <EmptyState text="Nenhum horário de treino cadastrado." />;
  }

  const temTreinoAberto = treinos.some((t) => t.aberto_novos_atletas !== false);

  return (
    <div>
      <div className="flex flex-col gap-1">
        {treinos.map((t) => (
          <div
            key={t._id}
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
      {temTreinoAberto && (
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
      )}
    </div>
  );
}
