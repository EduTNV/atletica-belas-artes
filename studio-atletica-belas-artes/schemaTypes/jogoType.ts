import { defineField, defineType } from 'sanity'

export const jogoType = defineType({
  name: 'jogo',
  title: 'Jogo',
  type: 'document',
  fields: [
    defineField({
      name: 'time_casa',
      title: 'Time Casa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time_visitante',
      title: 'Time Visitante',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modalidade',
      title: 'Modalidade',
      type: 'reference',
      to: [{ type: 'modalidade' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'competicao',
      title: 'Competição',
      type: 'string',
    }),
    defineField({
      name: 'fase',
      title: 'Fase',
      type: 'string',
    }),
    defineField({
      name: 'data_hora',
      title: 'Data e Hora',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'local',
      title: 'Local',
      type: 'string',
    }),
    defineField({
      name: 'placar_casa',
      title: 'Placar Casa',
      type: 'number',
    }),
    defineField({
      name: 'placar_visitante',
      title: 'Placar Visitante',
      type: 'number',
    }),
    defineField({
      name: 'estado',
      title: 'Estado do Jogo',
      type: 'string',
      initialValue: 'proximo',
      options: {
        list: [
          { title: 'Próximo', value: 'proximo' },
          { title: 'Em Andamento', value: 'em_andamento' },
          { title: 'Finalizado', value: 'finalizado' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
