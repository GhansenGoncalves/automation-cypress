import users from "../fixtures/users.json";

describe("SauceDemo — Login", () => {
  before(() => {
    cy.visit("/");
  });

  it("percorre os cenários de login numa única navegação", () => {
    // Campos obrigatórios
    cy.get("#login-button").click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username is required");

    // Senha incorreta
    cy.get("#user-name").clear().type(users.invalidPassword.username);
    cy.get("#password").clear().type(users.invalidPassword.password);
    cy.get("#login-button").click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "do not match");

    // Usuário bloqueado
    cy.get("#user-name").clear().type(users.lockedOut.username);
    cy.get("#password").clear().type(users.lockedOut.password);
    cy.get("#login-button").click();
    cy.url().should("not.include", "/inventory.html");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "locked out");

    // Usuário válido
    cy.get("#user-name").clear().type(users.standard.username);
    cy.get("#password").clear().type(users.standard.password);
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_list").should("be.visible");
    cy.get(".inventory_item").should("have.length.greaterThan", 0);
  });
});
