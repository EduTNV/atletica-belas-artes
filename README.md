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
   - **Next.js / React**: Framework para construção da interface de forma rápida e otimizada.
   - **TypeScript**: Para garantir a tipagem e segurança do código.
   - **Vanilla CSS**: Estilização rica e flexível, garantindo designs premium com modo escuro e animações.
   
2. **Backend (CMS)**
   - **Strapi**: Headless CMS em Node.js utilizado para gerenciar todo o conteúdo dinâmico (notícias, times, eventos, fotos).
   - **Banco de Dados**: PostgreSQL.

## 📁 Estrutura do Repositório

- `/frontend`: Contém todo o código da interface do usuário e a lógica do Next.js.
- `/cms`: Contém a API e o painel administrativo gerados pelo Strapi.
- `/prototipo`: Arquivos de prototipagem e design inicial do projeto.

## 🚀 Como rodar o projeto localmente

Para rodar este projeto na sua máquina, você precisará ter o **Node.js** instalado.

### 1. Rodando o CMS (Backend)
O CMS precisa estar rodando para que o frontend consiga buscar as informações (como textos e imagens).

```bash
cd cms
npm install
npm run develop
```
> O painel do Strapi estará disponível em `http://localhost:1337/admin`.

### 2. Rodando o Frontend
Em um novo terminal, inicie o frontend:

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
