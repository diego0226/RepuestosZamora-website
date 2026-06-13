/// <reference types="cypress" />

// Pruebas E2E del flujo de registro de clientes (RegisterPage + AuthService).
describe("Registro de cliente", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("exige los campos obligatorios", () => {
    cy.getBySel("register-submit").click();
    cy.contains("El nombre es obligatorio").should("be.visible");
    cy.contains("El apellido es obligatorio").should("be.visible");
    cy.contains("El correo es obligatorio").should("be.visible");
    cy.contains("La contraseña es obligatoria").should("be.visible");
  });

  it("exige una contraseña de al menos 8 caracteres", () => {
    cy.getBySel("register-nombre").type("Andrés");
    cy.getBySel("register-apellido1").type("Solano");
    cy.getBySel("register-correo").type("andres@correo.com");
    cy.getBySel("register-contrasena").type("123");
    cy.getBySel("register-submit").click();
    cy.contains("La contraseña debe tener al menos 8 caracteres").should("be.visible");
  });

  it("muestra error cuando el correo ya está registrado", () => {
    cy.intercept("POST", "**/api/auth/register", { statusCode: 409 }).as("registerDup");

    cy.getBySel("register-nombre").type("Andrés");
    cy.getBySel("register-apellido1").type("Solano");
    cy.getBySel("register-correo").type("repetido@correo.com");
    cy.getBySel("register-contrasena").type("clave1234");
    cy.getBySel("register-submit").click();

    cy.wait("@registerDup");
    cy.getBySel("register-error").should("contain", "El correo ya está registrado");
  });

  it("registra un cliente nuevo y entra al panel", () => {
    cy.intercept("POST", "**/api/auth/register", { fixture: "authUser.json" }).as("registerOk");
    cy.intercept("GET", "**/api/citas/**", []);
    cy.intercept("GET", "**/api/vehiculo**", []);
    cy.intercept("GET", "**/api/repuesto**", []);
    cy.intercept("GET", "**/api/servicio**", []);

    cy.getBySel("register-nombre").type("Andrés");
    cy.getBySel("register-apellido1").type("Solano");
    cy.getBySel("register-apellido2").type("Vargas");
    cy.getBySel("register-correo").type("andres@correo.com");
    cy.getBySel("register-telefono").type("8888-8888");
    cy.getBySel("register-contrasena").type("clave1234");
    cy.getBySel("register-submit").click();

    cy.wait("@registerOk");
    cy.location("pathname").should("eq", "/dashboard");
    cy.contains("PANEL DE CONTROL").should("be.visible");
  });
});
