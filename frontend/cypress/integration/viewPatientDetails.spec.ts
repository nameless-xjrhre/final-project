describe('Patient Page - View Patient Details Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/patients')
  })

  it('should view patient details', () => {
    cy.get('[id="basic-button"]')
      .its('length')
      .then((len) => {
        cy.get('[id="basic-button"]')
          .eq(len - 1)
          .click()
          .wait(3000)
          .get('[role="menuitem"]')
          .contains('View Details')
          .last()
          .click({ force: true })
      })
  })
})
