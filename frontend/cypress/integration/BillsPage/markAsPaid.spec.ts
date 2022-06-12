describe('Bills Page - Mark as Paid Test', () => {
  before(() => {
    cy.visit('bills')
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
      })
  })

  it('should check if a bill was marked paid', () => {
    cy.visit('bills').get('tr td').should('contain', 'PAID')
  })
})
