describe('Doctors Page - Nullify A Schedule Test', () => {
  before(() => {
    cy.visit('doctors')
  })

  it('should nullify a schedule', () => {
    cy.get('[class="css-1s4yypy"]')
      .first()
      .click()
      .get('[value="NOT_AVAILABLE"]')
      .last()
      .click()
      .get('[class="swal-modal"]')
      .get('[class="swal-button swal-button--confirm"]')
      .should('contain', 'OK')
      .click()
  })

  it('should check change in color', () => {
    cy.get('[class="css-1s4yypy"]')
      .first()
      .get('.css-pepnum')
      .should('have.css', 'background-color', 'rgb(203, 203, 203)')
  })
})