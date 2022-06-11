describe('Doctors Page - Nullify A Schedule Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/doctors')
  })

  it('should nullify a schedule', () => {
    cy.get(
      '[class="css-zgbp5c-MuiStack-root"]',
    )
      .first()
      .click()
      .get('[value="NOT_AVAILABLE"]')
      .last()
      .click()
  })

  it('should check change in color', () => {
    cy.get('.css-1n7jwnc-MuiButtonBase-root-MuiChip-root')
      .should('be.visible')
      .and(
        'have.css',
        'background-color',
        'rgb(203, 203, 203)',
      )
  })


})
