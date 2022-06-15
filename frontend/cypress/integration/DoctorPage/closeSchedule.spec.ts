	describe('Doctors Page - Close A Schedule Test', () => {
  before(() => {
    cy.visit('doctors')
  })

  it('should close a schedule', () => {
    cy.get('[class="css-1s4yypy"]')
      .last()
      .click()
      .get('[value="CLOSED"]')
      .last()
      .click()
      .get('[class="swal-modal"]')
      .get('[class="swal-button swal-button--confirm"]')
      .should('contain', 'OK')
      .click()
  })

  it('should check change in color', () => {
    cy.get('[class="css-1s4yypy"]')
      .last()
      .get('.css-14hta07')
      .should('have.css', 'background-color', 'rgb(254, 121, 129)')
  })
})