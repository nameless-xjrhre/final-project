describe('Doctors Page - Open A Schedule Test', () => {
  before(() => {
    cy.visit('doctors')
  })

  it('should open a schedule', () => {
    cy.get('[class="css-zgbp5c-MuiStack-root"]')
      .eq(2)
      .click()
      .get('[value="OPEN"]')
      .last()
      .click()
  })

  it('should check change in color', () => {
    cy.get('.css-j4zylg-MuiButtonBase-root-MuiChip-root')
      .should('be.visible')
      .and('have.css', 'background-color', 'rgb(87, 231, 153)')
  })
})
