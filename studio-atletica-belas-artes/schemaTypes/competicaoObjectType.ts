import { defineField, defineType } from 'sanity'

export const competicaoObjectType = defineType({
  name: 'competicaoObject',
  title: 'Competição',
  type: 'object',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sigla',
      title: 'Sigla',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto / Logo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
