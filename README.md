# 🎨 Atlética Belas Artes - Plataforma Oficial

Bem-vindo ao repositório oficial da plataforma digital da **Atlética Belas Artes**. 

Este projeto foi construído para servir como o portal principal dos alunos e da diretoria, oferecendo uma experiência moderna de aplicativo web progressivo (PWA) para os estudantes, e um painel de gerenciamento de conteúdo robusto para os diretores.

## 📌 Sobre o Projeto

A plataforma tem o objetivo de centralizar todas as informações importantes da Atlética, permitindo que os estudantes acompanhem de perto:
- 📅 **Eventos e Festas**: Cronograma, detalhes e links para ingressos.
- 🏆 **Times e Modalidades**: Informações sobre as equipes esportivas, treinos e resultados.
- 🏢 **Entidades e Diretoria**: Contatos, estrutura organizacional e membros responsáveis.

Tudo isso é gerenciado pelos próprios diretores da Atlética de forma autônoma através de um painel administrativo (CMS).

## 🛠️ Tecnologias Utilizadas

Este repositório é um *monorepo* dividido em duas partes principais:

1. **Frontend (PWA)**
   - **Next.js (App Router)**: Framework para construção da interface de forma rápida, otimizada e SSR/SSG.
   - **TypeScript**: Para garantir a tipagem e segurança do código.
   - **Tailwind CSS v4**: Estilização rica e flexível, garantindo designs premium.
   - **Sanity Client**: Integração nativa para consumir a API de dados com suporte a *PortableText* e geração de URLs de imagens otimizadas.
   
2. **Backend (CMS)**
   - **Sanity Studio**: Headless CMS moderno, hospedado na nuvem, utilizado para gerenciar todo o conteúdo dinâmico e flexível (notícias, times, eventos, fotos) com modelagem de conteúdo via código (schemas).

## 📁 Estrutura do Repositório

- `/frontend`: Contém todo o código da interface do usuário e a lógica do Next.js.
- `/studio-atletica-belas-artes`: Contém o painel administrativo do Sanity (Sanity Studio) com a definição dos schemas de conteúdo.

## 🚀 Como rodar o projeto localmente

Para rodar este projeto na sua máquina, você precisará ter o **Node.js** instalado.

### 1. Configurando e Rodando o Sanity Studio (CMS)
O CMS (Sanity) precisa estar configurado para que o frontend consiga buscar as informações. O Sanity é um banco de dados hospedado na nuvem, e o Studio é a interface de gerenciamento.

```bash
cd studio-atletica-belas-artes
npm install
npm run dev
```
> O painel do Sanity Studio estará disponível em `http://localhost:3333`.

### 2. Configurando as Variáveis de Ambiente (Frontend)
Na pasta `/frontend`, copie o arquivo `.env.example` ou crie um arquivo `.env.local` e configure as seguintes variáveis relacionadas ao seu projeto do Sanity:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id_do_sanity
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Rodando o Frontend
Em um terminal na pasta do frontend, inicie o aplicativo:

```bash
cd frontend
npm install
npm run dev
```
> O site estará acessível em `http://localhost:3000`.

## 🤝 Contribuindo

Se você faz parte da equipe de tecnologia da Atlética Belas Artes e quer contribuir:
1. Crie uma branch com a sua feature: `git checkout -b feature/minha-feature`
2. Faça os commits com mensagens descritivas.
3. Abra um Pull Request detalhando o que foi feito.

---
*Feito com 🖤 para a Atlética Belas Artes.*
