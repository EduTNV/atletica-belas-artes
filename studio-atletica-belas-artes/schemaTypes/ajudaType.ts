import { defineField, defineType } from 'sanity'

export const ajudaType = defineType({
  name: 'ajuda',
  title: 'Ajuda',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo_pagina',
      title: 'Título da Página',
      type: 'string',
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'faq' }],
    }),
  ],
})
