import { eq } from 'cypress/types/lodash'

describe('Dashboard - cancel Appointments Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/dashboard')
  })
  it('should Check if cancel appointment works', () => {
    cy.get(
      '[class="MuiSvgIcon-root MuiSvgIcon-colorError MuiSvgIcon-fontSizeMedium css-1wxstni-MuiSvgIcon-root"',
    )
      .eq(0)
      .click()
      .get('[class="swal-button swal-button--confirm"]')
      .click()
  })
  it('should cancel status', () => {
    cy.get(
      '[class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButtonBase-root button-text css-1xnvccj-MuiButtonBase-root-MuiButton-root"]',
    ).should('have.attr', 'status', 'CANCELED')
  })
})
