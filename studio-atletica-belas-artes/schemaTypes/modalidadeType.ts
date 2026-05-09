import { defineField, defineType } from 'sanity'

export const modalidadeType = defineType({
  name: 'modalidade',
  title: 'Modalidade',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome da Modalidade',
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
      name: 'capitao_nome',
      title: 'Nome do Capitão (Legado)',
      type: 'string',
      description: 'Use apenas se não houver um capitão cadastrado no Elenco',
    }),
    defineField({
      name: 'link_grupo_whatsapp',
      title: 'Link do Grupo de WhatsApp',
      type: 'url',
    }),
    defineField({
      name: 'foto_card',
      title: 'Foto do Card',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'foto_banner',
      title: 'Foto do Banner',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
