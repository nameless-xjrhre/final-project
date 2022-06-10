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
          .get('[role="menuitem"]')
          .contains('View Details')
          .last()
          .click({ force: true })
      })
  })

  it('should check if a profile after viewing details exists', ()=>{
    cy.visit('http://localhost:3000/profile/1')
  })
})
