Feature: Testes na API do GitHub com Cypress

  Scenario: Criar um repositório no GitHub
    Given que eu crio um repositório no GitHub
    Then o repositório deve ser criado com sucesso

  Scenario: Consultar o repositório criado
    Given que um repositório foi criado
    When eu consultar o repositório
    Then os detalhes do repositório devem estar corretos

  Scenario: Criar uma issue no repositório
    Given que um repositório foi criado
    When eu criar uma issue no repositório
    Then a issue deve ser criada com sucesso

  Scenario: Consultar a issue criada
    Given que uma issue foi criada no repositório
    When eu consultar a issue
    Then os detalhes da issue devem estar corretos

  Scenario: Excluir o repositório
    Given que um repositório foi criado
    When eu excluir o repositório
    Then o repositório deve ser removido com sucesso

  Scenario: Verificar a exclusão do repositório
    Given que um repositório foi excluído
    When eu tentar consultar o repositório
    Then a resposta deve indicar que o repositório não existe
