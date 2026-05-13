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
  preview: {
    select: {
      titulo: 'titulo',
      ano: 'ano',
      medalha: 'medalha',
      modalidade: 'modalidade.nome',
    },
    prepare(selection) {
      const { titulo, ano, medalha, modalidade } = selection
      
      const anoStr = ano ? ` (${ano})` : ''
      const medalhaStr = medalha ? ` - ${medalha.charAt(0).toUpperCase() + medalha.slice(1)}` : ''

      return {
        title: titulo || 'Sem Título',
        subtitle: `[${modalidade || 'Sem Modalidade'}]${medalhaStr}${anoStr}`,
      }
    },
  },
})
