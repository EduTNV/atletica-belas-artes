import { defineField, defineType } from 'sanity'

export const competicaoType = defineType({
  name: 'competicao',
  title: 'Competição',
  type: 'document',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'sigla', slugify: (input) => input.toLowerCase() },
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
      title: 'Foto Principal',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fotos_galeria',
      title: 'Galeria de Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Legenda',
              type: 'string',
              description: 'Ex: "JUCA 2023 · São Carlos"',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Número menor aparece primeiro na listagem.',
    }),
  ],
  preview: {
    select: {
      title: 'sigla',
      subtitle: 'nome',
      media: 'foto',
    },
  },
})
