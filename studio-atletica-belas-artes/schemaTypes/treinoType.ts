import { defineField, defineType } from 'sanity'

export const treinoType = defineType({
  name: 'treino',
  title: 'Treino',
  type: 'document',
  fields: [
    defineField({
      name: 'dia_semana',
      title: 'Dia da Semana',
      type: 'string',
      options: {
        list: [
          { title: 'Segunda-feira', value: 'segunda' },
          { title: 'Terça-feira', value: 'terca' },
          { title: 'Quarta-feira', value: 'quarta' },
          { title: 'Quinta-feira', value: 'quinta' },
          { title: 'Sexta-feira', value: 'sexta' },
          { title: 'Sábado', value: 'sabado' },
          { title: 'Domingo', value: 'domingo' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hora_inicio',
      title: 'Hora de Início',
      type: 'string',
      description: 'Ex: 19:00',
    }),
    defineField({
      name: 'hora_fim',
      title: 'Hora de Término',
      type: 'string',
      description: 'Ex: 21:00',
    }),
    defineField({
      name: 'local',
      title: 'Local',
      type: 'string',
    }),
    defineField({
      name: 'modalidade',
      title: 'Modalidade',
      type: 'reference',
      to: [{ type: 'modalidade' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aberto_novos_atletas',
      title: 'Aberto a novos atletas?',
      description: 'Se marcado, exibe a mensagem de contato para novos atletas na página da modalidade.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      dia: 'dia_semana',
      hora: 'hora_inicio',
      modalidade: 'modalidade.nome',
    },
    prepare(selection) {
      const { dia, hora, modalidade } = selection
      
      const diaStr = dia ? dia.charAt(0).toUpperCase() + dia.slice(1) : 'Sem dia'
      const horaStr = hora ? ` - ${hora}` : ''

      return {
        title: `${diaStr}${horaStr}`,
        subtitle: `[${modalidade || 'Sem Modalidade'}]`,
      }
    },
  },
})
