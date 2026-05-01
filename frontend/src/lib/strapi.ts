/**
 * Serviço de conexão com a API do Strapi.
 * Centraliza todas as chamadas ao CMS para reutilização em qualquer página.
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Fetch genérico para a API REST do Strapi.
 * @param path - Caminho da API (ex: "/api/eventos")
 * @param params - Query params opcionais (ex: { sort: "data:asc", populate: "*" })
 */
export async function fetchStrapi<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
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

/* ============================
   TIPOS DO STRAPI
   ============================ */

/** Estrutura padrão de resposta de coleção do Strapi v5 */
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

/** Estrutura padrão de resposta de single type do Strapi v5 */
export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

/** Tipo: Evento */
export interface Evento {
  id: number;
  documentId: string;
  nome: string;
  data: string; // ISO 8601
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

/** Tipo: ConfigHome (Single Type) */
export interface ConfigHome {
  id: number;
  texto_quem_somos_resumo: string | null;
  texto_quem_somos_completo: string | null;
  ano_fundacao: number | null;
  link_seja_socio: string | null;
  link_produtos: string | null;
  link_whatsapp_contato: string | null;
}

/** Tipo: ConfigContato (Single Type) */
export interface ConfigContato {
  id: number;
  email: string | null;
  whatsapp: string | null;
  instagram: string | null;
}

/** Tipo: Entidade */
export interface Entidade {
  id: number;
  documentId: string;
  nome: string;
  descricao: string | null;
  cor: string | null;
  logo: { url: string; formats?: Record<string, { url: string }> } | null;
  membros: MembroEntidade[];
}

/** Tipo: MembroEntidade */
export interface MembroEntidade {
  id: number;
  documentId: string;
  nome: string;
  cargo: string | null;
  foto: { url: string; formats?: Record<string, { url: string }> } | null;
  whatsapp: string | null;
  ordem: number | null;
}

/** Tipo: Curso */
export interface Curso {
  id: number;
  documentId: string;
  nome: string;
  emoji: string | null;
  foto_capa: { url: string; formats?: Record<string, { url: string }> } | null;
  cor: string | null;   // Cor hex opcional para personalização do card
  slug: string | null;
  modalidades?: Modalidade[]; // Populado com populate
}

/** Tipo: Modalidade */
export interface Modalidade {
  id: number;
  documentId: string;
  nome_interno: string;  // Ex: "Futebol Masculino Arq"
  nome: string;           // Ex: "Futebol Masculino"
  emoji: string | null;
  capitao_nome: string | null;
  capitao_whatsapp: string | null;
  foto_time: {
    url: string;
    formats?: {
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  } | null;
  historico: string | null;
  curso?: Pick<Curso, "id" | "documentId" | "nome" | "emoji" | "cor">;
}

/** Tipo: Resultado */
export interface Resultado {
  id: number;
  documentId: string;
  adversario: string;
  competicao: string | null;
  placar_nos: number | null;
  placar_adversario: number | null;
  data: string | null; // date string "YYYY-MM-DD"
}

/** Tipo: Treino */
export interface Treino {
  id: number;
  documentId: string;
  dia_semana: "segunda" | "terca" | "quarta" | "quinta" | "sexta" | "sabado" | "domingo";
  hora_inicio: string | null;
  hora_fim: string | null;
  local: string | null;
}

/** Tipo: Conquista */
export interface Conquista {
  id: number;
  documentId: string;
  titulo: string;
  ano: number | null;
  medalha: "ouro" | "prata" | "bronze" | "premio" | null;
}

/* ============================
   FUNÇÕES DE BUSCA ESPECÍFICAS
   ============================ */

/**
 * Busca os eventos ativos, ordenados por data (mais próximo primeiro).
 * Filtra apenas eventos com ativo=true.
 */
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

/**
 * Busca as configurações da Home Page (Single Type).
 */
export async function getConfigHome(): Promise<ConfigHome | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<ConfigHome>>(
      "/api/config-home"
    );
    return res.data;
  } catch {
    // Se ConfigHome ainda não foi preenchido, retorna null silenciosamente
    return null;
  }
}

/**
 * Busca as configurações de Contato (Single Type).
 */
export async function getConfigContato(): Promise<ConfigContato | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<ConfigContato>>(
      "/api/config-contato"
    );
    return res.data;
  } catch {
    return null;
  }
}

/**
 * Busca todas as Entidades com logo e membros (com fotos) populados.
 */
export async function getEntidades(): Promise<Entidade[]> {
  try {
    const res = await fetchStrapi<StrapiCollectionResponse<Entidade>>(
      "/api/entidades",
      {
        "sort": "nome:asc",
        "populate[logo]": "*",
        "populate[membros][populate][foto]": "*",
        "populate[membros][sort]": "ordem:asc",
        "pagination[pageSize]": "50",
      }
    );
    return res.data;
  } catch {
    return [];
  }
}

/**
 * Busca todos os Cursos, populando foto_capa e modalidades (com foto_time).
 */
export async function getCursos(): Promise<Curso[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<Curso>>(
    "/api/cursos",
    {
      "sort": "nome:asc",
      "populate[foto_capa]": "true",
      "populate[modalidades][populate][foto_time]": "true",
      "pagination[pageSize]": "50",
    }
  );
  return res.data;
}

/**
 * Busca todas as Modalidades com seu curso relacionado.
 */
export async function getModalidades(): Promise<Modalidade[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<Modalidade>>(
    "/api/modalidades",
    {
      "sort": "nome:asc",
      "populate": "curso,foto_time",
      "pagination[pageSize]": "100",
    }
  );
  return res.data;
}

/**
 * Busca os dados completos de uma modalidade específica.
 */
export async function getModalidadeDetalhe(documentId: string): Promise<Modalidade | null> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<Modalidade>>(
      `/api/modalidades/${documentId}`,
      { "populate": "curso,foto_time" }
    );
    return res.data;
  } catch {
    return null;
  }
}

/**
 * Busca os Resultados de uma modalidade.
 */
export async function getResultados(modalidadeDocumentId: string): Promise<Resultado[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<Resultado>>(
    "/api/resultados",
    {
      "filters[modalidade][documentId][$eq]": modalidadeDocumentId,
      "sort": "data:desc",
      "pagination[pageSize]": "50",
    }
  );
  return res.data;
}

/**
 * Busca os Treinos de uma modalidade.
 */
export async function getTreinos(modalidadeDocumentId: string): Promise<Treino[]> {
  const diasOrdem = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
  const res = await fetchStrapi<StrapiCollectionResponse<Treino>>(
    "/api/treinos",
    {
      "filters[modalidade][documentId][$eq]": modalidadeDocumentId,
      "pagination[pageSize]": "50",
    }
  );
  // Ordena por dia da semana
  return res.data.sort(
    (a, b) => diasOrdem.indexOf(a.dia_semana) - diasOrdem.indexOf(b.dia_semana)
  );
}

/**
 * Busca as Conquistas de uma modalidade.
 */
export async function getConquistas(modalidadeDocumentId: string): Promise<Conquista[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<Conquista>>(
    "/api/conquistas",
    {
      "filters[modalidade][documentId][$eq]": modalidadeDocumentId,
      "sort": "ano:desc",
      "pagination[pageSize]": "50",
    }
  );
  return res.data;
}
