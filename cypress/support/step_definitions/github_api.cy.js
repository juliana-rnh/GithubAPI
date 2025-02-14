import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const GITHUB_API_URL = 'https://api.github.com';
const repo = `teste-api-cypress-${(globalThis.repoCounter = (globalThis.repoCounter || 0) + 1)}`;

let repoFullName;
let issueNumber;

Given('que eu crio um repositório no GitHub', () => {
  cy.request({
    method: 'POST',
    url: `${GITHUB_API_URL}/user/repos`,
    headers: {
      Authorization: `token ${Cypress.env('GITHUB_TOKEN')}`,
      Accept: 'application/vnd.github.v3+json'
    },
    body: {
      name: repo,
      description: 'Repositório de teste criado via Cypress',
      private: false
    }
  }).as('createRepoResponse'); 
});

Then('o repositório deve ser criado com sucesso', () => {
  cy.get('@createRepoResponse').then((response) => {
    expect(response.status).to.eq(201);
    repoFullName = response.body.full_name;
    expect(repoFullName).to.not.be.undefined;
  });
});

Given('que um repositório foi criado', () => {
  expect(repoFullName).to.not.be.undefined;
});

When('eu consultar o repositório', () => {
  cy.request({
    method: 'GET',
    url: `${GITHUB_API_URL}/repos/${repoFullName}`,
    headers: { Authorization: `token ${Cypress.env('GITHUB_TOKEN')}` }
  }).as('getRepoResponse');
});

Then('os detalhes do repositório devem estar corretos', () => {
  cy.get('@getRepoResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq(repo);
  });
});

When('eu criar uma issue no repositório', () => {
  cy.request({
    method: 'POST',
    url: `${GITHUB_API_URL}/repos/${repoFullName}/issues`,
    headers: { Authorization: `token ${Cypress.env('GITHUB_TOKEN')}` },
    body: {
      title: 'Erro ao salvar dados no formulário de cadastro',
      body: `
### Descrição do problema
Ao tentar salvar os dados no formulário de cadastro, ocorre um erro de validação inesperado.

### Passos para reproduzir
1. Acesse a página de cadastro.
2. Preencha todos os campos obrigatórios corretamente.
3. Clique no botão "Salvar".
4. Observe que o erro "Erro ao processar requisição" é exibido.
`
    }
  }).as('createIssueResponse');
});

Then('a issue deve ser criada com sucesso', () => {
  cy.get('@createIssueResponse').then((response) => {
    expect(response.status).to.eq(201);
    issueNumber = response.body.number;
    expect(issueNumber).to.not.be.undefined;
  });
});

Given('que uma issue foi criada no repositório', () => {
  expect(issueNumber).to.not.be.undefined;
});

When('eu consultar a issue', () => {
  cy.request({
    method: 'GET',
    url: `${GITHUB_API_URL}/repos/${repoFullName}/issues/${issueNumber}`,
    headers: { Authorization: `token ${Cypress.env('GITHUB_TOKEN')}` }
  }).as('getIssueResponse');
});

Then('os detalhes da issue devem estar corretos', () => {
  cy.get('@getIssueResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.title).to.eq('Erro ao salvar dados no formulário de cadastro');
  });
});

When('eu excluir o repositório', () => {
  cy.request({
    method: 'DELETE',
    url: `${GITHUB_API_URL}/repos/${repoFullName}`,
    headers: { Authorization: `token ${Cypress.env('GITHUB_TOKEN')}` }
  }).as('deleteRepoResponse');
});

Then('o repositório deve ser removido com sucesso', () => {
  cy.get('@deleteRepoResponse').then((response) => {
    expect(response.status).to.eq(204);
  });
});

Given('que um repositório foi excluído', () => {
  expect(repoFullName).to.not.be.undefined;
});

When('eu tentar consultar o repositório', () => {
  cy.request({
    method: 'GET',
    url: `${GITHUB_API_URL}/repos/${repoFullName}`,
    headers: { Authorization: `token ${Cypress.env('GITHUB_TOKEN')}` },
    failOnStatusCode: false
  }).as('getRepoDeletedResponse');
});

Then('a resposta deve indicar que o repositório não existe', () => {
  cy.get('@getRepoDeletedResponse').then((response) => {
    expect(response.status).to.eq(404);
  });
});
