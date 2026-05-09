import { defineField, defineType } from 'sanity'

export const entidadeType = defineType({
  name: 'entidade',
  title: 'Entidade',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome da Entidade',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nome' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'cor',
      title: 'Cor da Entidade',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
