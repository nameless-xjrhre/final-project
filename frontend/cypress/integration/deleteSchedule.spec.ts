describe('Doctors Page - Delete A Schedule Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/doctors')
  })

  it('should delete a schedule', () => {
    cy.get('[class="css-zgbp5c-MuiStack-root"]')
      .its('length')
      .then((len) => {
        cy.get('[class="css-zgbp5c-MuiStack-root"]')
          .eq(Math.ceil(len / 2))
          .wait(2000)
          .click()
          .get(
            '[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-x8xom5-MuiButtonBase-root-MuiMenuItem-root"]',
          )
          .contains('Delete')
          .click()
          .get('[type=button]')
          .last()
          .contains('Yes')
          .click()
          .wait(5000)
      })
  })

  it('should display confirmation message', () => {
    cy.get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })
})
