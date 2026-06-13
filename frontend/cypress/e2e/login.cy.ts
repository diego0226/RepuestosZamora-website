/// <reference types="cypress" />

// Pruebas E2E del flujo de inicio de sesión (LoginPage + AuthService).
describe("Inicio de sesión", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("muestra errores de validación al enviar el formulario vacío", () => {
    cy.getBySel("login-submit").click();
    cy.contains("El correo es obligatorio").should("be.visible");
    cy.contains("La contraseña es obligatoria").should("be.visible");
    // No debe navegar al panel.
    cy.location("pathname").should("eq", "/login");
  });

  it("valida el formato del correo", () => {
    // "correo@sindominio" pasa la validación nativa de type=email (tiene @),
    // pero incumple el patrón de la app que exige un dominio con punto.
    cy.getBySel("login-correo").type("correo@sindominio");
    cy.getBySel("login-contrasena").type("12345678");
    cy.getBySel("login-submit").click();
    cy.contains("Formato de correo inválido").should("be.visible");
  });

  it("muestra un error cuando las credenciales son incorrectas", () => {
    cy.intercept("POST", "**/api/auth/login", { statusCode: 401 }).as("loginFail");

    cy.getBySel("login-correo").type("nadie@correo.com");
    cy.getBySel("login-contrasena").type("claveMala");
    cy.getBySel("login-submit").click();

    cy.wait("@loginFail");
    cy.getBySel("login-error").should("contain", "Correo o contraseña incorrectos");
    cy.location("pathname").should("eq", "/login");
  });

  it("inicia sesión correctamente y redirige al panel", () => {
    cy.intercept("POST", "**/api/auth/login", { fixture: "authUser.json" }).as("loginOk");
    // El Dashboard dispara estas llamadas tras autenticarse; las dejamos vacías.
    cy.intercept("GET", "**/api/citas/**", []).as("getCitas");
    cy.intercept("GET", "**/api/vehiculo**", []).as("getVehiculos");
    cy.intercept("GET", "**/api/repuesto**", []).as("getRepuestos");
    cy.intercept("GET", "**/api/servicio**", []).as("getServicios");

    cy.getBySel("login-correo").type("andres@correo.com");
    cy.getBySel("login-contrasena").type("clave1234");
    cy.getBySel("login-submit").click();

    cy.wait("@loginOk");
    cy.location("pathname").should("eq", "/dashboard");
    cy.contains("PANEL DE CONTROL").should("be.visible");
    cy.contains("Hola, Andrés").should("be.visible");

    // El usuario quedó guardado en localStorage bajo la clave auth_user.
    cy.window().then((win) => {
      const stored = JSON.parse(win.localStorage.getItem("auth_user") || "{}");
      expect(stored.correo).to.eq("andres@correo.com");
    });
  });
});
