import { defineField, defineType } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'pergunta',
      title: 'Pergunta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resposta',
      title: 'Resposta',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
    }),
  ],
})
