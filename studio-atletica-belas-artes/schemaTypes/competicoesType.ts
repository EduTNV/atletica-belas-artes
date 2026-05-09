import { defineField, defineType } from 'sanity'

export const competicoesType = defineType({
  name: 'competicoes',
  title: 'Configurações de Competições',
  type: 'document',
  fields: [
    defineField({
      name: 'competicoes',
      title: 'Lista de Competições',
      type: 'array',
      of: [{ type: 'competicaoObject' }],
    }),
  ],
})
