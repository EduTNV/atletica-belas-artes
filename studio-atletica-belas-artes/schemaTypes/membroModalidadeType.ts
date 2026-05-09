import { defineField, defineType } from 'sanity'

export const membroModalidadeType = defineType({
  name: 'membroModalidade',
  title: 'Membro de Modalidade',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cargo',
      title: 'Cargo',
      type: 'string',
      options: {
        list: [
          { title: 'Técnico', value: 'técnico' },
          { title: 'Co-técnico', value: 'co-técnico' },
          { title: 'Capitão', value: 'capitão' },
          { title: 'Co-capitão', value: 'co-capitão' },
          { title: 'Atleta', value: 'atleta' },
          { title: 'Atleta Reserva', value: 'atleta reserva' },
        ],
      },
    }),
    defineField({
      name: 'curso',
      title: 'Curso',
      type: 'reference',
      to: [{ type: 'curso' }],
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
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 99,
    }),
  ],
})
