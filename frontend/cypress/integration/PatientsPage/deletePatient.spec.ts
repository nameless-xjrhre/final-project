let totalNumOfPatients

describe('Patient Page - Delete Patient Test', () => {
  before(() => {
    cy.visit('patients')
      .get('[id="basic-button"]')
      .its('length')
      .then((len) => {
        totalNumOfPatients = len
      })
  })

  it('should delete patient', () => {
    cy.get('[id="basic-button"]')
      .first()
      .click()
      .get('[role="menuitem"]')
      .last()
      .should('contain', 'Delete')
      .click()
      .get('[type=button]')
      .last()
      .contains('Yes')
      .click()
      .get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })

  it('should check if a patient was deleted', () => {
    cy.visit('patients')
      .get('td button')
      .get('[id="basic-button"]')
      .its('length')
      .should('be.lessThan', totalNumOfPatients)
  })
})
