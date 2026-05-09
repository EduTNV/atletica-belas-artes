import { defineField, defineType } from 'sanity'

export const contatoType = defineType({
  name: 'contato',
  title: 'Contato',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram (URL)',
      type: 'url',
    }),
  ],
})
