import { defineField, defineType } from 'sanity'

export const edicaoCompeticaoType = defineType({
  name: 'edicaoCompeticao',
  title: 'Edição de Competição',
  type: 'document',
  orderings: [
    {
      title: 'Ano (mais recente)',
      name: 'anoDesc',
      by: [{ field: 'ano', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'competicao',
      title: 'Competição',
      type: 'reference',
      to: [{ type: 'competicao' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ano',
      title: 'Ano',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Ex: "JUCA 2024"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resultado',
      title: 'Resultado',
      type: 'string',
      options: {
        list: [
          { title: 'Ouro', value: 'ouro' },
          { title: 'Prata', value: 'prata' },
          { title: 'Bronze', value: 'bronze' },
          { title: 'Semifinal', value: 'semifinal' },
          { title: 'Quartas de Final', value: 'quartas' },
          { title: 'Fase de Grupos', value: 'fase_grupos' },
          { title: 'Participação', value: 'participacao' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Número menor = mais antigo na timeline.',
    }),
  ],
  preview: {
    select: {
      titulo: 'titulo',
      resultado: 'resultado',
      competicao: 'competicao.sigla',
    },
    prepare(selection) {
      const { titulo, resultado, competicao } = selection
      const resultadoLabel: Record<string, string> = {
        ouro: 'Ouro',
        prata: 'Prata',
        bronze: 'Bronze',
        semifinal: 'Semifinal',
        quartas: 'Quartas de Final',
        fase_grupos: 'Fase de Grupos',
        participacao: 'Participação',
      }
      return {
        title: titulo || 'Edição sem título',
        subtitle: `[${competicao || '?'}] ${resultadoLabel[resultado] || resultado || ''}`,
      }
    },
  },
})
