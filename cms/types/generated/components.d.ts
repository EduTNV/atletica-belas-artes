import type { Schema, Struct } from '@strapi/strapi';

export interface CompeticaoCompeticao extends Struct.ComponentSchema {
  collectionName: 'components_competicao_competicoes';
  info: {
    displayName: 'Competicao';
    icon: 'trophy';
  };
  attributes: {
    descricao: Schema.Attribute.Text & Schema.Attribute.Required;
    destaque: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    nome: Schema.Attribute.String & Schema.Attribute.Required;
    sigla: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'competicao.competicao': CompeticaoCompeticao;
    }
  }
}
