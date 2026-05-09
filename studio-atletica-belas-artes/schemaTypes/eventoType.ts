import { defineField, defineType } from 'sanity'

export const eventoType = defineType({
  name: 'evento',
  title: 'Evento',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do Evento',
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
      name: 'data',
      title: 'Data e Hora',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'local',
      title: 'Local',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endereco',
      title: 'Endereço',
      type: 'string',
    }),
    defineField({
      name: 'arte',
      title: 'Arte / Banner',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'status_lote',
      title: 'Status do Lote',
      type: 'string',
      options: {
        list: [
          { title: 'Em breve', value: 'breve' },
          { title: 'Vendas Abertas / 1º Lote', value: 'vendas_abertas' },
          { title: '2º Lote', value: 'lote_2' },
          { title: '3º Lote', value: 'lote_3' },
          { title: 'Esgotado', value: 'esgotado' },
          { title: 'Vendas Encerradas', value: 'encerrado' },
        ],
      },
    }),
    defineField({
      name: 'link_ingresso',
      title: 'Link para Ingresso',
      type: 'url',
    }),
    defineField({
      name: 'aftermovie_url',
      title: 'URL do Aftermovie',
      type: 'url',
    }),
    defineField({
      name: 'ativo',
      title: 'Evento Ativo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
