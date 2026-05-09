import { defineField, defineType } from 'sanity'

export const cursoType = defineType({
  name: 'curso',
  title: 'Curso',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do Curso',
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
      name: 'cor',
      title: 'Cor Representativa',
      type: 'string',
      description: 'Código Hexadecimal (ex: #e02c2c)',
    }),
    defineField({
      name: 'foto_capa',
      title: 'Foto de Capa',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
