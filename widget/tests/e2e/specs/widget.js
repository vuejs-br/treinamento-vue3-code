const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Widget', () => {
  it('Check if widget button are shown', () => {
    cy.visit(APP_URL)
    cy.wait(2000)
    cy.get('#widget-open-button')
  })
})
