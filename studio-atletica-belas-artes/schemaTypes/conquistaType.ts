import { defineField, defineType } from 'sanity'

export const conquistaType = defineType({
  name: 'conquista',
  title: 'Conquista',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título da Conquista',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ano',
      title: 'Ano',
      type: 'number',
    }),
    defineField({
      name: 'medalha',
      title: 'Medalha',
      type: 'string',
      options: {
        list: [
          { title: 'Ouro', value: 'ouro' },
          { title: 'Prata', value: 'prata' },
          { title: 'Bronze', value: 'bronze' },
          { title: 'Prêmio/Destaque', value: 'premio' },
        ],
      },
    }),
    defineField({
      name: 'modalidade',
      title: 'Modalidade',
      type: 'reference',
      to: [{ type: 'modalidade' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
