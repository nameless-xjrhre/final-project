describe('Doctors Page - Open A Schedule Test', () => {
  before(() => {
    cy.visit('doctors')
  })

  it('should open a schedule', () => {
    cy.get('[class="css-1s4yypy"]')
      .last()
      .click()
      .get('[value="OPEN"]')
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
      .get('.css-1di7u3v')
      .should('have.css', 'background-color', 'rgb(87, 231, 153)')
  })
})
