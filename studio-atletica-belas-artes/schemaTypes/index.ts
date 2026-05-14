import { cursoType } from './cursoType'
import { entidadeType } from './entidadeType'
import { modalidadeType } from './modalidadeType'
import { membroEntidadeType } from './membroEntidadeType'
import { membroModalidadeType } from './membroModalidadeType'
import { eventoType } from './eventoType'
import { jogoType } from './jogoType'
import { ajudaType } from './ajudaType'
import { faqType } from './faqType'
import { homeType } from './homeType'
import { contatoType } from './contatoType'
import { conquistaType } from './conquistaType'
import { treinoType } from './treinoType'
import { competicaoType } from './competicaoType'
import { edicaoCompeticaoType } from './edicaoCompeticaoType'

export const schemaTypes = [
  // Documentos principais
  cursoType,
  entidadeType,
  modalidadeType,
  membroEntidadeType,
  membroModalidadeType,
  eventoType,
  jogoType,
  conquistaType,
  treinoType,
  competicaoType,
  edicaoCompeticaoType,

  // Singletons (Configurações)
  ajudaType,
  homeType,
  contatoType,

  // Objetos auxiliares
  faqType,
]
