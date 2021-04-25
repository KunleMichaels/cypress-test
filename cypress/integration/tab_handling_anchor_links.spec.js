// In this recipe we have a <nav> with some links we want
// to test in /examples/tab_handling_anchor_links/index.html
//
// One of the links has a target='_blank' attribute that
// should open in a new tab.
//
// Another link is pointed to an external domain that
// doesn't match our domain under test - https://www.google.com
describe("Tab Handling Anchor Links", function () {
    beforeEach(function () {
      cy.visit("/index.html");
    });
    context('testing the target="_blank" link', function () {
      it("solution #1: verify the href, dont click through", function () {
        cy.get("#users").should("have.attr", "href").and("include", "users.html");
        cy.get("#users")
          .should("have.prop", "href")
          .and("equal", "http://localhost:7078/users.html");
      });
      it("solution #2: click through to the new page", function () {
        cy.get("#users").invoke("removeAttr", "target").click();
        cy.url().should("include", "users.html");
      });
      it("solution #3: visit without modifying the <a>", function () {
        cy.get("#users").then(function ($a) {
          // extract the fully qualified href property
          const href = $a.prop("href");
          // and now visit the href directly
          cy.visit(href);
          cy.url().should("include", "users.html");
        });
      });
      it("solution #4: request without visiting", function () {
        cy.get("#users").then(function ($a) {
          // extract the fully qualified href property
          const href = $a.prop("href");
          cy.request(href)
            .its("body")
            .should("include", "<title>")
            .and("include", "<h1>Users</h1")
            .and("include", "</html>");
        });
      });
    });
    context("testing the external domain link", function () {
      it("solution #1: verify the href property only", function () {
        cy.get("#google").should("have.prop", "href", "https://www.google.com/");
      });
      it("solution #2: request its contents", function () {
        cy.get("#google").then(function ($a) {
          const href = $a.prop("href");
          cy.request(href).its("body").should("include", "</html>");
        });
      });
      it("solution #3: click through to the external domain", function () {
        // This test will not work until you add {chromeWebSecurity: false} in your
        // cypress.json which is why the test below is commented out.
        // cy.get('#google').click()
        // cy.url().should('include', 'google.com')
      });
    });
  });