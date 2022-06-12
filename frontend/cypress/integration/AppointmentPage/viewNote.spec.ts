import { patientRandomizer } from '../../fixtures/randomizer'

describe('Appointment Page - View Note Test', () => {
  before(() => {
    cy.visit('appointments')
      .get('[id="basic-button"]')
      .its('length')
      .then((len) => {
        cy.get('[id="basic-button"]')
          .eq(len - 1)
          .click()
      })
  })

  it('should hover view note button', () => {
    cy.get('[role="menuitem"]')
      .contains('View Note')
      .trigger('mouseover', { force: true })
  })
})
