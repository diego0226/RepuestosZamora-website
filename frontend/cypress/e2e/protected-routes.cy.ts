/// <reference types="cypress" />

// Pruebas E2E de la protección de rutas (ProtectedRoute + AuthContext).
describe("Rutas protegidas", () => {
  const rutasProtegidas = ["/dashboard", "/citas", "/vehiculo", "/repuestos", "/servicios", "/perfil"];

  it("redirige a /login al entrar sin sesión", () => {
    rutasProtegidas.forEach((ruta) => {
      cy.visit(ruta);
      cy.location("pathname").should("eq", "/login");
    });
  });

  it("permite el acceso al panel con un usuario en localStorage", () => {
    cy.intercept("GET", "**/api/citas/**", []);
    cy.intercept("GET", "**/api/vehiculo**", []);
    cy.intercept("GET", "**/api/repuesto**", []);
    cy.intercept("GET", "**/api/servicio**", []);

    cy.fixture("authUser.json").then((user) => {
      cy.visit("/dashboard", {
        onBeforeLoad(win) {
          // AuthContext lee auth_user de localStorage al inicializarse.
          win.localStorage.setItem("auth_user", JSON.stringify(user));
        },
      });
    });

    cy.location("pathname").should("eq", "/dashboard");
    cy.contains("PANEL DE CONTROL").should("be.visible");
  });

  it("redirige una ruta desconocida al inicio", () => {
    cy.visit("/ruta-que-no-existe");
    cy.location("pathname").should("eq", "/");
  });
});
