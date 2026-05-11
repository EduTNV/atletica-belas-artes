import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Client com token de escrita — usado APENAS nesta rota server-side
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!, // Token com permissão de escrita (Editor ou superior)
});

export async function GET(req: NextRequest) {
  try {
    // Proteção: Vercel Cron envia o header 'authorization' com o CRON_SECRET automaticamente
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const agora = new Date();
    // 3 horas depois do início = considerado finalizado
    const treHorasMs = 3 * 60 * 60 * 1000;

    // Busca todos os jogos que NÃO estão finalizados
    const jogosAtivos = await writeClient.fetch(
      `*[_type == "jogo" && estado != "finalizado"]{ _id, estado, data_hora }`
    );

    let atualizados = 0;

    for (const jogo of jogosAtivos) {
      if (!jogo.data_hora) continue;

      const dataJogo = new Date(jogo.data_hora);

      // proximo → em_andamento (já passou da hora de início)
      if (jogo.estado === "proximo" && agora >= dataJogo) {
        await writeClient.patch(jogo._id).set({ estado: "em_andamento" }).commit();
        atualizados++;
      }

      // em_andamento → finalizado (já passou 3h desde o início)
      if (jogo.estado === "em_andamento" && agora.getTime() >= dataJogo.getTime() + treHorasMs) {
        await writeClient.patch(jogo._id).set({ estado: "finalizado" }).commit();
        atualizados++;
      }
    }

    // Se houve alguma alteração, limpa o cache das páginas afetadas
    if (atualizados > 0) {
      revalidatePath("/", "layout");
    }

    return NextResponse.json({
      success: true,
      message: `${atualizados} jogo(s) atualizado(s) de ${jogosAtivos.length} ativo(s).`,
      timestamp: agora.toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro no cron de jogos", error: err.message },
      { status: 500 }
    );
  }
}
