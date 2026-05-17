import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Atletica Belas Artes',

  projectId: '6zhlnbqu',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates,
      {
        id: 'edicao-by-competicao',
        title: 'Edição de Competição',
        schemaType: 'edicaoCompeticao',
        parameters: [{name: 'competicaoId', type: 'string'}],
        value: (params: Record<string, any>) => ({
          competicao: {
            _type: 'reference',
            _ref: params.competicaoId,
          },
        }),
      },
    ],
  },
})
