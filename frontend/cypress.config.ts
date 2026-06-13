import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // El dev server de Vite arrancado por el script "start" (puerto fijo 5173).
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",
    video: false,
  },
});
