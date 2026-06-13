/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, ...args: any[]): Chainable<JQuery<HTMLElement>>;
    getFirstBySel(
      parentSelector: string,
      childSelector: string,
      ...args: any[]
    ): Chainable<JQuery<HTMLElement>>;
  }
}
