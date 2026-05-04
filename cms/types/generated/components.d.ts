import type { Schema, Struct } from '@strapi/strapi';

export interface AjudaFaq extends Struct.ComponentSchema {
  collectionName: 'components_faq';
  info: {
    displayName: 'Faq';
    icon: 'question';
  };
  attributes: {
    ordem: Schema.Attribute.Integer;
    pergunta: Schema.Attribute.String & Schema.Attribute.Required;
    resposta: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface CompeticaoCompeticao extends Struct.ComponentSchema {
  collectionName: 'components_competicao_competicoes';
  info: {
    displayName: 'Competicao';
    icon: 'trophy';
  };
  attributes: {
    descricao: Schema.Attribute.Text & Schema.Attribute.Required;
    destaque: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    foto: Schema.Attribute.Media<'images'>;
    nome: Schema.Attribute.String & Schema.Attribute.Required;
    sigla: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ajuda.faq': AjudaFaq;
      'competicao.competicao': CompeticaoCompeticao;
    }
  }
}
