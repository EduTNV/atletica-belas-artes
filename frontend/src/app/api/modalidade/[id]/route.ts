import { unstable_cache } from "next/cache";
import { createClient } from "next-sanity";
import { type NextRequest, NextResponse } from "next/server";
import type { JogoModalidadeDTO, TreinoDTO, ConquistaDTO, MembroModalidadeDTO } from "@/types/sanity";

// Client server-side puro — nunca exposto ao browser
const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: process.env.NODE_ENV === "production",
});

export interface ModalidadeApiResponse {
  jogos: JogoModalidadeDTO[];
  treinos: TreinoDTO[];
  conquistas: ConquistaDTO[];
  membros: MembroModalidadeDTO[];
}

/**
 * Cache global no servidor: compartilhado entre TODOS os usuários.
 * O primeiro request busca do Sanity e cacheia com a tag "modalidades".
 * Todos os seguintes recebem a resposta cacheada — zero chamadas ao Sanity.
 * Invalidado via revalidateTag("modalidades") no webhook e no cron-job.
 * Fallback automático de 1 hora caso o webhook não dispare.
 */
const getModalidadeData = unstable_cache(
  async (id: string): Promise<ModalidadeApiResponse> => {
    const [jogos, treinos, conquistas, membros] = await Promise.all([
      serverClient.fetch<JogoModalidadeDTO[]>(
        `*[_type == "jogo" && modalidade._ref == $id] | order(data_hora desc){
          _id, time_casa, time_visitante, belas_artes_posicao, competicao, fase, data_hora, local, placar_casa, placar_visitante, estado
        }`,
        { id }
      ),
      serverClient.fetch<TreinoDTO[]>(
        `*[_type == "treino" && modalidade._ref == $id]{
          _id, dia_semana, hora_inicio, hora_fim, local, aberto_novos_atletas
        }`,
        { id }
      ),
      serverClient.fetch<ConquistaDTO[]>(
        `*[_type == "conquista" && modalidade._ref == $id] | order(ano desc){
          _id, titulo, ano, medalha
        }`,
        { id }
      ),
      serverClient.fetch<MembroModalidadeDTO[]>(
        `*[_type == "membroModalidade" && modalidade._ref == $id] | order(ordem asc){
          _id, nome, cargo, foto, ordem,
          curso->{ nome, cor }
        }`,
        { id }
      ),
    ]);

    return {
      jogos: jogos ?? [],
      treinos: treinos ?? [],
      conquistas: conquistas ?? [],
      membros: membros ?? [],
    };
  },
  ["modalidade-data"],
  {
    tags: ["modalidades"],
    revalidate: 3600, // fallback de 1h — garante dados frescos mesmo sem webhook
  }
);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "ID da modalidade não informado" }, { status: 400 });
    }

    const data = await getModalidadeData(id);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json(
      { message: "Erro ao buscar dados da modalidade", error: message },
      { status: 500 }
    );
  }
}
