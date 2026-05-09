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
import { competicaoObjectType } from './competicaoObjectType'
import { competicoesType } from './competicoesType'
import { contatoType } from './contatoType'
import { conquistaType } from './conquistaType'
import { treinoType } from './treinoType'

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

  // Singletons (Configurações)
  ajudaType,
  homeType,
  competicoesType,
  contatoType,

  // Objetos auxiliares
  faqType,
  competicaoObjectType,
]
