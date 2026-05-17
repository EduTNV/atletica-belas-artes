import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    
    // Verificação de segurança (o mesmo secret deve ser colocado no painel do Sanity)
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    // Invalida o cache global do painel de modalidades (compartilhado entre todos os usuários)
    revalidateTag("modalidades");

    // Revalida a aplicação toda (todas as rotas e filhos)
    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json(
      { message: "Erro ao revalidar", error: message },
      { status: 500 }
    );
  }
}
