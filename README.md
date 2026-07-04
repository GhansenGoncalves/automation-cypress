# Automação E2E com Cypress

[![Cypress E2E](https://github.com/ghansengoncalves/automation-cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/ghansengoncalves/automation-cypress/actions/workflows/cypress.yml)

Projeto de portfólio: automação de testes end-to-end com
[Cypress](https://www.cypress.io) contra o site público de demonstração
[SauceDemo](https://www.saucedemo.com), usado pela comunidade de QA
justamente para prática de automação. Roda em CI a cada push.

## Cenários cobertos

**Login** (`cypress/e2e/login.cy.js`)
- Autenticação com usuário válido e redirecionamento ao inventário.
- Bloqueio de usuário desativado (`locked_out_user`) com mensagem de erro.
- Senha incorreta com mensagem de erro.
- Campos obrigatórios (usuário/senha vazios).

**Carrinho e checkout** (`cypress/e2e/cart_checkout.cy.js`)
- Adicionar e remover produto, com atualização do badge do carrinho.
- Adicionar múltiplos produtos e conferir o resumo no carrinho.
- Fluxo completo de checkout (dados pessoais → resumo → confirmação).

## Estrutura

```
cypress/
  e2e/          specs organizadas por funcionalidade
  fixtures/     massas de dados (usuários de teste)
  support/      comando customizado de login (cy.login)
```

## Como rodar

```bash
npm install
npx cypress open   # modo interativo
npm test           # headless, mesmo que roda no CI
```

## Stack

Cypress · JavaScript · GitHub Actions (`cypress-io/github-action`)

## Nota sobre estabilidade em CI

O SauceDemo trava a navegação a partir do segundo acesso vindo do mesmo IP em
um curto intervalo — comportamento comum de sites públicos de demonstração
contra IPs de nuvem/CI (como os runners do GitHub Actions). Por isso cada spec
navega uma única vez (`before`, não `beforeEach`) e percorre os cenários numa
mesma sessão de página, em vez de recarregar a cada teste. O
`cypress.config.js` também habilita retries em `runMode` como camada extra de
resiliência contra instabilidade de rede.
