Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add(
  "getFirstBySel",
  (parentSelector: string, childSelector: string, ...args) => {
    return cy
      .get(`[data-cy="${parentSelector}"]`)
      .find(`[data-cy="${childSelector}"]:first-child`, ...args);
  },
);
