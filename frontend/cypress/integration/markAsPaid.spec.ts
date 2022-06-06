describe('Bills Page - Mark as Paid Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/bills')
  })

  it('should mark patient as paid', () => {
    cy.get('[id=basic-button]')
      .its('length')
      .then((len) => {
        cy.get('[id=basic-button]')
          .eq(len - 1)
          .click()
          .wait(3000)
          .get('[role="menuitem"]')
          .last()
          .contains('Mark as Paid')
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
