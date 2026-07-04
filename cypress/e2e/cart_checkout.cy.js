import users from "../fixtures/users.json";

describe("SauceDemo — Carrinho e checkout", () => {
  before(() => {
    cy.login(users.standard.username, users.standard.password);
  });

  it("percorre carrinho e checkout numa única navegação", () => {
    // Adiciona um produto
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.get('[data-test="remove-sauce-labs-backpack"]').should("be.visible");

    // Remove o produto
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("not.exist");

    // Adiciona dois produtos e confere o resumo no carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get(".shopping_cart_badge").should("have.text", "2");
    cy.get(".shopping_cart_link").click();
    cy.get(".cart_item").should("have.length", 2);
    cy.contains(".inventory_item_name", "Sauce Labs Backpack").should("be.visible");
    cy.contains(".inventory_item_name", "Sauce Labs Bike Light").should("be.visible");

    // Completa o checkout de ponta a ponta
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");
    cy.get("#first-name").type("Guilherme");
    cy.get("#last-name").type("Hansen");
    cy.get("#postal-code").type("01310-000");
    cy.get('[data-test="continue"]').click();

    cy.url().should("include", "/checkout-step-two.html");
    cy.get(".summary_total_label").should("contain.text", "Total");
    cy.get('[data-test="finish"]').click();

    cy.url().should("include", "/checkout-complete.html");
    cy.get(".complete-header").should("contain.text", "Thank you for your order");
  });
});
