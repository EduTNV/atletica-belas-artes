import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !['edicaoCompeticao'].includes(listItem.getId() as string)
      ),
      S.divider(),
      S.listItem()
        .title('Edições por Competição')
        .child(
          S.documentTypeList('competicao')
            .title('Competições')
            .child((competicaoId) =>
              S.documentList()
                .title('Edições da Competição')
                .filter('_type == "edicaoCompeticao" && competicao._ref == $competicaoId')
                .params({ competicaoId })
                .initialValueTemplates([
                  S.initialValueTemplateItem('edicao-by-competicao', { competicaoId })
                ])
            )
        ),
    ])
