// ─── Tipos Compartilhados ─────────────────────────────────────────────

import type { PortableTextBlock } from "@portabletext/react";

/** Referência de imagem do Sanity (campo `image` com hotspot) */
export interface SanityImage {
  asset: { _ref: string; url?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

/** Referência de imagem com dados expandidos (via `asset->`) */
export interface SanityImageExpanded {
  asset: { _ref: string; url?: string };
  caption?: string;
}

// ─── Evento ───────────────────────────────────────────────────────────

export interface EventoDTO {
  _id: string;
  nome: string;
  data: string;
  local: string;
  endereco?: string;
  arte?: SanityImage;
  status_lote?: string;
  link_ingresso?: string;
  aftermovie_url?: string;
  ativo?: boolean;
}

// ─── Home (Single Type) ───────────────────────────────────────────────

export interface HomeConfig {
  subtitulo_hero?: string;
  foto_hero?: SanityImage;
  texto_quem_somos_resumo?: string;
  frase_footer?: string;
}

// ─── Jogo ─────────────────────────────────────────────────────────────

/** Jogo com modalidade resolvida (usado na Home e JogosCard) */
export interface JogoDTO {
  _id: string;
  time_casa: string;
  time_visitante: string;
  belas_artes_posicao?: "casa" | "visitante" | "nenhum";
  modalidade?: { nome: string };
  competicao?: string;
  fase?: string;
  data_hora: string;
  local?: string;
  placar_casa: number | null;
  placar_visitante: number | null;
  estado: "proximo" | "em_andamento" | "finalizado";
}

/** Jogo sem modalidade resolvida (fetch direto no ModalidadeDetail) */
export interface JogoModalidadeDTO {
  _id: string;
  time_casa: string;
  time_visitante: string;
  belas_artes_posicao?: "casa" | "visitante" | "nenhum";
  competicao?: string;
  fase?: string;
  data_hora: string;
  local?: string;
  placar_casa: number | null;
  placar_visitante: number | null;
  estado: "proximo" | "em_andamento" | "finalizado";
}

// ─── Treino ───────────────────────────────────────────────────────────

export interface TreinoDTO {
  _id: string;
  dia_semana: string;
  hora_inicio?: string;
  hora_fim?: string;
  local?: string;
  aberto_novos_atletas?: boolean;
}

// ─── Conquista ────────────────────────────────────────────────────────

export interface ConquistaDTO {
  _id: string;
  titulo: string;
  ano?: number;
  medalha?: "ouro" | "prata" | "bronze" | "premio";
}

// ─── Membro de Modalidade ─────────────────────────────────────────────

export interface MembroModalidadeDTO {
  _id: string;
  nome: string;
  cargo?: string;
  foto?: SanityImage;
  ordem?: number;
  curso?: { nome: string; cor?: string };
}

// ─── Modalidade (listagem) ────────────────────────────────────────────

export interface ModalidadeListDTO {
  _id: string;
  nome: string;
  slug?: { current: string };
  capitao_nome?: string;
  link_grupo_whatsapp?: string;
  foto_card?: SanityImage;
  foto_banner?: SanityImage;
}

// ─── Entidade ─────────────────────────────────────────────────────────

export interface MembroEntidadeDTO {
  _id: string;
  nome: string;
  cargo?: string;
  foto?: SanityImage;
  whatsapp?: string;
  ordem?: number;
  curso?: { nome: string; cor?: string };
}

export interface EntidadeDTO {
  _id: string;
  nome: string;
  descricao?: string;
  cor?: string;
  logo?: SanityImage;
  membros?: MembroEntidadeDTO[];
}

// ─── Contato (Single Type) ────────────────────────────────────────────

export interface ContatoDTO {
  email?: string;
  whatsapp?: string;
  instagram?: string;
}

// ─── Ajuda / FAQ ──────────────────────────────────────────────────────

export interface FaqDTO {
  pergunta: string;
  resposta: string;
  ordem?: number;
}

export interface AjudaDTO {
  titulo_pagina?: string;
  subtitulo?: string;
  faqs?: FaqDTO[];
}

// ─── Sobre (Single Type) ──────────────────────────────────────────────

export interface MissaoValorItem {
  titulo: string;
  descricao: string;
}

export interface SobreDTO {
  historia?: PortableTextBlock[]; // PortableText blocks
  fotos_galeria?: SanityImageExpanded[];
  missao?: MissaoValorItem[];
  valores?: MissaoValorItem[];
}

// ─── Cron (update-games) ──────────────────────────────────────────────

export interface JogoCronDTO {
  _id: string;
  estado: string;
  data_hora: string;
}

// ─── Competição ───────────────────────────────────────────────────────

export interface EdicaoCompeticaoDTO {
  _id: string;
  ano: number;
  titulo: string;
  resultado: string;
  descricao: string;
}

export interface CompeticaoDetalheDTO {
  _id: string;
  nome: string;
  sigla: string;
  descricao: string;
  foto?: SanityImage;
  fotos_galeria?: SanityImageExpanded[];
}
