import { patientRandomizer } from '../fixtures/randomizer'

describe('Dashboard Page - Cancel Appointment Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/dashboard').wait(5000)
  })

  it('should cancel appointment', () => {
    cy.get(
      '[class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root  css-1e6y48t-MuiButtonBase-root-MuiButton-root"]',
    )
      .wait(5000)
      .its('length')
      .then((len) => {
        cy.get(
          '[class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root  css-1e6y48t-MuiButtonBase-root-MuiButton-root"]',
        )
          .eq(len - 1)
          .wait(3000)
          .click()
      })
  })

  it('should check if status changed', () => {
    cy.get(
      '[class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButtonBase-root button-text css-1xnvccj-MuiButtonBase-root-MuiButton-root"]',
    ).should('have.attr', 'status', 'CANCELED')
  })

  it('should display confirmation message', () => {
    cy.get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })
})
