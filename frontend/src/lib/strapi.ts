const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/[\[\]()]/g, "").trim();

/** Retorna a URL absoluta correta para mídias do Strapi */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}

/** Wrapper de requisição pré-configurado com a URL base do Strapi e tratamento de erros */
export async function fetchStrapi<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  if (!STRAPI_URL) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined in environment variables");
  }
  const url = new URL(path, STRAPI_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const isDev = process.env.NODE_ENV === "development";

  const res = await fetch(url.toString(), {
    ...(isDev ? { cache: "no-store" } : { next: { revalidate: 60 } }),
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface Evento {
  id: number;
  documentId: string;
  nome: string;
  data: string;
  local: string;
  endereco: string | null;
  arte?: {
    url: string;
    formats?: {
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  } | null;
  status_lote: "vendas_abertas" | "lote_2" | "lote_3" | "esgotado" | null;
  link_ingresso: string | null;
  aftermovie_url: string | null;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ConfigHome {
  id: number;
  subtitulo_hero: string | null;
  texto_quem_somos_resumo: string | null;
  texto_quem_somos_completo: string | null;
  ano_fundacao: number | null;
  link_seja_socio: string | null;
  link_produtos: string | null;
  link_whatsapp_contato: string | null;
  frase_footer: string | null;
  foto_hero: { url: string; formats?: Record<string, { url: string }> } | null;
}

export interface ConfigContato {
  id: number;
  email: string | null;
  whatsapp: string | null;
  instagram: string | null;
}

export interface Competicao {
  nome: string;
  sigla: string;
  descricao: string;
  destaque: boolean;
  foto: { url: string; formats?: Record<string, { url: string }> } | null;
}

export interface ConfigCompeticoes {
  id: number;
  competicoes: Competicao[];
}

export interface Faq {
  pergunta: string;
  resposta: string;
  ordem: number | null;
}

export interface ConfigAjuda {
  id: number;
  titulo_pagina: string | null;
  subtitulo: string | null;
  faqs: Faq[];
}

export interface Entidade {
  id: number;
  documentId: string;
  nome: string;
  descricao: string | null;
  cor: string | null;
  logo: { url: string; formats?: Record<string, { url: string }> } | null;
  membros: MembroEntidade[];
}

export interface MembroEntidade {
  id: number;
  documentId: string;
  nome: string;
  cargo: string | null;
  foto: { url: string; formats?: Record<string, { url: string }> } | null;
  whatsapp: string | null;
  ordem: number | null;
  curso?: Pick<Curso, "id" | "documentId" | "nome" | "cor"> | null;
}

export interface MembroModalidade {
  id: number;
  documentId: string;
  nome: string;
  cargo: "técnico" | "co-técnico" | "capitão" | "co-capitão" | "atleta" | "atleta reserva" | null;
  foto: { url: string; formats?: Record<string, { url: string }> } | null;
  whatsapp: string | null;
  ordem: number | null;
  curso?: Pick<Curso, "id" | "documentId" | "nome" | "cor"> | null;
}

export interface Curso {
  id: number;
  documentId: string;
  nome: string;
  foto_capa: { url: string; formats?: Record<string, { url: string }> } | null;
  cor: string | null;
  slug: string | null;
  modalidades?: Modalidade[];
}

export interface Modalidade {
  id: number;
  documentId: string;
  nome_interno: string;
  nome: string;
  capitao_nome: string | null;
  link_grupo_whatsapp: string | null;
  foto_card: {
    url: string;
    formats?: {
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  } | null;
  foto_banner: {
    url: string;
    formats?: {
      medium?: { url: string };
      large?: { url: string };
    };
  } | null;
  historico: string | null;
  curso?: Pick<Curso, "id" | "documentId" | "nome" | "cor">;
}

export interface Resultado {
  id: number;
  documentId: string;
  adversario: string;
  competicao: string | null;
  placar_nos: number | null;
  placar_adversario: number | null;
  data: string | null;
}

export interface Treino {
  id: number;
  documentId: string;
  dia_semana: "segunda" | "terca" | "quarta" | "quinta" | "sexta" | "sabado" | "domingo";
  hora_inicio: string | null;
  hora_fim: string | null;
  local: string | null;
}

export interface Conquista {
  id: number;
  documentId: string;
  titulo: string;
  ano: number | null;
  medalha: "ouro" | "prata" | "bronze" | "premio" | null;
}

export interface Jogo {
  id: number;
  documentId: string;
  time_casa: string;
  time_visitante: string;
  modalidade_nome: string;
  competicao: string | null;
  fase: string | null;
  data_hora: string;
  local: string | null;
  placar_casa: number | null;
  placar_visitante: number | null;
  ativo: boolean;
}

/** Busca jogos ativos ordenados pela data mais próxima */
export async function getJogos(): Promise<Jogo[]> {
  try {
    const res = await fetchStrapi<StrapiCollectionResponse<Jogo>>(
      "/api/jogos",
      {
        "filters[ativo][$eq]": "true",
        "sort": "data_hora:asc",
        "pagination[pageSize]": "20",
      }
    );
    return res.data || [];
  } catch {
    return [];
  }
}

/** Busca todos os eventos ativos */
export async function getEventos(): Promise<Evento[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<Evento>>(
    "/api/eventos",
    {
      "sort": "data:asc",
      "filters[ativo][$eq]": "true",
      "populate": "*",
      "pagination[pageSize]": "50",
    }
  );
  return res.data;
}

/** Busca as configurações da página inicial */
export async function getConfigHome(): Promise<ConfigHome | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<ConfigHome>>(
      "/api/home",
      { "populate[foto_hero]": "true" }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Busca as configurações de contato */
export async function getConfigContato(): Promise<ConfigContato | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<ConfigContato>>(
      "/api/contato"
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Busca as competições em destaque */
export async function getConfigCompeticoes(): Promise<ConfigCompeticoes | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<ConfigCompeticoes>>(
      "/api/competicoes",
      { 
        "populate[competicoes][populate][foto]": "true" 
      }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Busca as configurações e perguntas da página de Ajuda/FAQ */
export async function getConfigAjuda(): Promise<ConfigAjuda | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<ConfigAjuda>>(
      "/api/ajuda",
      { "populate[faqs]": "true" }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Busca as entidades (Atlética, Bateria, Cheer, etc) e seus membros */
export async function getEntidades(): Promise<Entidade[]> {
  try {
    const res = await fetchStrapi<StrapiCollectionResponse<Entidade>>(
      "/api/entidades",
      {
        "sort": "nome:asc",
        "populate[logo]": "true",
        "populate[membros][populate][foto]": "true",
        "pagination[pageSize]": "50",
      }
    );
    return res.data || [];
  } catch (error) {
    console.error("Erro ao buscar entidades:", error);
    return [];
  }
}

/** Busca os cursos e suas respectivas modalidades */
export async function getCursos(): Promise<Curso[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<Curso>>(
    "/api/cursos",
    {
      "sort": "nome:asc",
      "populate[foto_capa]": "true",
      "populate[modalidades][populate][foto_card]": "true",
      "populate[modalidades][populate][foto_banner]": "true",
      "pagination[pageSize]": "50",
    }
  );
  return res.data;
}

/** Busca todas as modalidades esportivas */
export async function getModalidades(): Promise<Modalidade[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<Modalidade>>(
    "/api/modalidades",
    {
      "sort": "nome:asc",
      "populate[curso]": "true",
      "populate[foto_card]": "true",
      "populate[foto_banner]": "true",
      "pagination[pageSize]": "500",
    }
  );
  return res.data;
}

/** Busca os detalhes específicos de uma modalidade pelo seu ID */
export async function getModalidadeDetalhe(documentId: string): Promise<Modalidade | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<Modalidade>>(
      `/api/modalidades/${documentId}`,
      { "populate": "curso,foto_card,foto_banner" }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Busca resultados de jogos anteriores para uma modalidade */
export async function getResultados(modalidadeDocumentId: string): Promise<Resultado[]> {
  try {
    const res = await fetchStrapi<StrapiCollectionResponse<Resultado>>(
      "/api/resultados",
      {
        "filters[modalidade][documentId][$eq]": modalidadeDocumentId,
        "sort": "data:desc",
        "pagination[pageSize]": "100",
      }
    );
    return res.data || [];
  } catch {
    return [];
  }
}

/** Busca os horários de treino de uma modalidade */
export async function getTreinos(modalidadeDocumentId: string): Promise<Treino[]> {
  try {
    const diasOrdem = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
    const res = await fetchStrapi<StrapiCollectionResponse<Treino>>(
      "/api/treinos",
      {
        "filters[modalidade][documentId][$eq]": modalidadeDocumentId,
        "pagination[pageSize]": "50",
      }
    );
    return (res.data || []).sort(
      (a, b) => diasOrdem.indexOf(a.dia_semana) - diasOrdem.indexOf(b.dia_semana)
    );
  } catch {
    return [];
  }
}

/** Busca premiações, medalhas e títulos de uma modalidade */
export async function getConquistas(modalidadeDocumentId: string): Promise<Conquista[]> {
  try {
    const res = await fetchStrapi<StrapiCollectionResponse<Conquista>>(
      "/api/conquistas",
      {
        "filters[modalidade][documentId][$eq]": modalidadeDocumentId,
        "sort": "ano:desc",
        "pagination[pageSize]": "100",
      }
    );
    return res.data || [];
  } catch {
    return [];
  }
}

/** Busca a comissão técnica e o elenco de uma modalidade */
export async function getMembrosModalidade(
  modalidadeDocumentId: string
): Promise<MembroModalidade[]> {
  try {
    const res = await fetchStrapi<StrapiCollectionResponse<MembroModalidade>>(
      "/api/membro-modalidades",
      {
        "filters[modalidade][documentId][$eq]": modalidadeDocumentId,
        "populate[foto]": "true",
        "populate[curso]": "true",
        "sort": "ordem:asc",
        "pagination[pageSize]": "100",
      }
    );
    return res.data || [];
  } catch (error) {
    console.error("Erro ao buscar membros da modalidade:", error);
    return [];
  }
}
