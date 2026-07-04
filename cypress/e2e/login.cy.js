import users from "../fixtures/users.json";

describe("SauceDemo — Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("autentica com usuário válido e chega no inventário", () => {
    cy.get("#user-name").type(users.standard.username);
    cy.get("#password").type(users.standard.password);
    cy.get("#login-button").click();

    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_list").should("be.visible");
    cy.get(".inventory_item").should("have.length.greaterThan", 0);
  });

  it("bloqueia usuário desativado com mensagem de erro", () => {
    cy.get("#user-name").type(users.lockedOut.username);
    cy.get("#password").type(users.lockedOut.password);
    cy.get("#login-button").click();

    cy.url().should("not.include", "/inventory.html");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "locked out");
  });

  it("rejeita senha incorreta com mensagem de erro", () => {
    cy.get("#user-name").type(users.invalidPassword.username);
    cy.get("#password").type(users.invalidPassword.password);
    cy.get("#login-button").click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "do not match");
  });

  it("não permite login sem preencher usuário e senha", () => {
    cy.get("#login-button").click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username is required");
  });
});
