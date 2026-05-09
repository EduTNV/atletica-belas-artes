import { defineField, defineType } from 'sanity'

export const homeType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitulo_hero',
      title: 'Subtítulo Hero',
      type: 'text',
    }),
    defineField({
      name: 'foto_hero',
      title: 'Foto Hero',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'texto_quem_somos_resumo',
      title: 'Quem Somos (Resumo)',
      type: 'text',
    }),
    defineField({
      name: 'texto_quem_somos_completo',
      title: 'Quem Somos (Completo)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'frase_footer',
      title: 'Frase do Footer',
      type: 'string',
    }),
  ],
})
