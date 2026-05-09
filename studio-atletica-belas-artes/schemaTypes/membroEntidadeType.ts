import { defineField, defineType } from 'sanity'

export const membroEntidadeType = defineType({
  name: 'membroEntidade',
  title: 'Membro de Entidade',
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
          { title: 'Presidente', value: 'presidente' },
          { title: 'Vice-Presidente', value: 'vice_presidente' },
          { title: 'Secretário(a)', value: 'secretario' },
          { title: 'Tesoureiro(a)', value: 'tesoureiro' },
          { title: 'Diretor(a) de Esportes', value: 'diretor_esportes' },
          { title: 'Diretor(a) de Eventos', value: 'diretor_eventos' },
          { title: 'Diretor(a) de Marketing', value: 'diretor_marketing' },
          { title: 'Diretor(a) de Patrimônio', value: 'diretor_patrimonio' },
          { title: 'Diretor(a) de Vendas', value: 'diretor_vendas' },
          { title: 'Assessor(a)', value: 'assessor' },
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
      name: 'entidade',
      title: 'Entidade',
      type: 'reference',
      to: [{ type: 'entidade' }],
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
