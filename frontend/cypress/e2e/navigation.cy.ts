/// <reference types="cypress" />

// Pruebas E2E de la navegación por la barra lateral una vez autenticado (Layout).
describe("Navegación del panel", () => {
  beforeEach(() => {
    // Stubs de las listas que cargan las distintas secciones.
    cy.intercept("GET", "**/api/citas/**", []);
    cy.intercept("GET", "**/api/vehiculo**", []);
    cy.intercept("GET", "**/api/repuesto**", []);
    cy.intercept("GET", "**/api/servicio**", []);

    cy.fixture("authUser.json").then((user) => {
      cy.visit("/dashboard", {
        onBeforeLoad(win) {
          win.localStorage.setItem("auth_user", JSON.stringify(user));
        },
      });
    });
  });

  it("navega entre las secciones desde la barra lateral", () => {
    cy.getBySel("nav-citas").click();
    cy.location("pathname").should("eq", "/citas");

    cy.getBySel("nav-vehiculo").click();
    cy.location("pathname").should("eq", "/vehiculo");

    cy.getBySel("nav-repuestos").click();
    cy.location("pathname").should("eq", "/repuestos");

    cy.getBySel("nav-servicios").click();
    cy.location("pathname").should("eq", "/servicios");

    cy.getBySel("nav-dashboard").click();
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("muestra el catálogo de servicios en su sección", () => {
    cy.intercept("GET", "**/api/servicio**", { fixture: "servicios.json" }).as("getServicios");
    cy.getBySel("nav-servicios").click();
    cy.wait("@getServicios");
    cy.contains("Cambio de aceite").should("be.visible");
  });
});
