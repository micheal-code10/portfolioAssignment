describe("Portfolio E2E", () => {
  it("Loads the home page", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("My Portfolio");
    cy.contains("Projects");
    cy.contains("Qualifications");
  });

  it("Admin route is protected (redirects to signin)", () => {
    cy.visit("http://localhost:5173/admin");
    cy.url().should("include", "/signin");
  });
});
