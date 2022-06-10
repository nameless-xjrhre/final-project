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
          .get('[role="menuitem"]')
          .last()
          .contains('Mark as Paid')
          .click()
          .get('[class="swal-title"]')
          .should('contain', 'Success')
          .get('[class="swal-button swal-button--confirm"]')
          .contains('OK')
          .click()
      })
  })

  it('should check if a bill was marked paid', ()=>{
    cy.visit('http://localhost:3000/bills')
    .get('tr td')
    .should('contain', 'PAID')
  })
})
