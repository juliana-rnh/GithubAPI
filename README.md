# Teste Automatizado de BackEnd com Cypress consumindo a API do Github

Este projeto contém testes automatizados para a API do GitHub utilizando **Cypress**. Ele cobre as seguintes ações:

- Criação de um repositório no github;
- Consulta do repositório criado;
- Criação de uma issue no repositório recém-criado;
- Consulta da issue;
- Exclusão do repositório;
- Consultar se o repositório foi eliminado


## Tecnologias Utilizadas
- **Cypress** - Framework de testes
- **Node.js** - Ambiente de execução
- **GitHub API** - Testes automatizados na API do GitHub
- **Cucumber** - Para escrita dos cenários em Gherkin


## Pré-requisitos
Instalação de:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Cypress](https://www.cypress.io/)
- Uma conta no [GitHub](https://github.com/)


### Instale as dependências em uma pasta
```sh
npm init -y
npm install cypress --save-dev
npm install --save-dev @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor
npm install dotenv --save

```

### Configure seu Token do GitHub

1. No Github, acesse o Menu>Settings>Developer Settings>Personal Access Tokens>Tokens(Classic).
2. Clique em **"Generate new token (classic)"**.
3. Marque as permissões:
   - `repo` → **Full control of private repositories**
   - `delete_repo` → **Delete repositories**
4. Copie o token.

Crie um arquivo `.env` no diretório do projeto e adicione:

```
GITHUB_TOKEN=seu_token
```

##  Executando os Testes

### Rodando todos os testes no terminal
```sh
npx cypress run
```

### Rodando um teste específico
Para executar apenas um teste dentro do arquivo, modifique o código e adicione `.only` ao `it()`:

```sh
it.only('Cria um repositório no GitHub', () => {
  cy.request({ ... });
});
```



