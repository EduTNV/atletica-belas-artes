import { defineField, defineType, defineArrayMember } from 'sanity'

export const sobreType = defineType({
  name: 'sobre',
  title: 'Sobre a Atlética',
  type: 'document',
  fields: [
    defineField({
      name: 'historia',
      title: 'História',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (rule) => rule.required(),
      description: 'Texto contando a história da atlética.',
    }),
    defineField({
      name: 'fotos_galeria',
      title: 'Fotos da Galeria',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Legenda',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Uma breve descrição da foto (obrigatório).',
            }),
          ],
        }),
      ],
      description: 'Fotos que aparecerão no carrossel da página.',
    }),
    defineField({
      name: 'missao',
      title: 'Missões',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Título (Subtópico)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'descricao',
              title: 'Descrição',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
      description: 'Lista de missões/objetivos da atlética.',
    }),
    defineField({
      name: 'valores',
      title: 'Valores',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Título do Valor',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'descricao',
              title: 'Descrição',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
      description: 'Lista de valores fundamentais da atlética.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Sobre a Atlética (Configuração Única)',
      }
    },
  },
})
