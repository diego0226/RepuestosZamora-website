/// <reference types="cypress" />

// Pruebas E2E de la página pública de inicio (LandingPage).
describe("Página de inicio", () => {
  beforeEach(() => {
    // Stub del catálogo de servicios para que la franja "Servicios del taller" sea determinista.
    cy.intercept("GET", "**/api/servicio", { fixture: "servicios.json" }).as("getServicios");
    cy.visit("/");
  });

  it("muestra el hero principal y las estadísticas", () => {
    cy.contains("h1", "MANOS EXPERTAS").should("be.visible");
    cy.contains("Crear cuenta gratis").should("be.visible");
    cy.contains("15").should("be.visible"); // años en el oficio
  });

  it("renderiza las tarjetas de servicios que devuelve la API", () => {
    cy.wait("@getServicios");
    // getFirstBySel: primer hijo [data-cy="servicio-card"] dentro de [data-cy="servicios-grid"].
    cy.getFirstBySel("servicios-grid", "servicio-card").should("contain", "Cambio de aceite");
    cy.getBySel("servicio-card").should("have.length", 3);
  });

  it("navega a iniciar sesión desde el encabezado", () => {
    cy.getBySel("nav-login").click();
    cy.location("pathname").should("eq", "/login");
    cy.contains("h2", "INICIAR SESIÓN").should("be.visible");
  });

  it("navega a registro desde el hero", () => {
    cy.getBySel("hero-register").click();
    cy.location("pathname").should("eq", "/register");
    cy.contains("h2", "REGISTRARSE").should("be.visible");
  });
});
