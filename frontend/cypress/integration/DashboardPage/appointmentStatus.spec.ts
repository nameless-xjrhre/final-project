describe('Dashboard Page - Appointment Status Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard')
  })

  it('should check if status changed to CANCELED', () => {
    cy.get('td button', { timeout: 5000 })
      .its('length')
      .then((len) => {
        cy.get('td button', { timeout: 5000 })
          .eq(len - 1)
          .click()
          .should('have.attr', 'status')
          .get('[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"]', { timeout: 5000 })
          .should('contain', "CANCELED")
          .first()
          .click({ force: true })
          .get('[class="swal-title"]', { timeout: 5000 })
          .should('contain', 'Success')
          .get('[class="swal-button swal-button--confirm"]')
          .contains('OK')
          .click()
      })

  })

  it('should check if status changed to PENDING', () => {
    cy.get('td button', { timeout: 5000 })
      .its('length')
      .then((len) => {
        cy.get('td button', { timeout: 5000 })
          .eq(len - 1)
          .click()
          .should('have.attr', 'status')
          .get('[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"]', { timeout: 5000 })
          .should('contain', "PENDING")
          .first()
          .click({ force: true })
          .get('[class="swal-title"]', { timeout: 5000 })
          .should('contain', 'Success')
          .get('[class="swal-button swal-button--confirm"]')
          .contains('OK')
          .click()
      })

  })

  it('should check if status changed to EXPIRED', () => {
    cy.get('td button', { timeout: 5000 })
      .its('length')
      .then((len) => {
        cy.get('td button', { timeout: 5000 })
          .eq(len - 1)
          .click()
          .should('have.attr', 'status')
          .get('[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"]', { timeout: 5000 })
          .should('contain', "EXPIRED")
          .first()
          .click({ force: true })
          .get('[class="swal-title"]', { timeout: 5000 })
          .should('contain', 'Success')
          .get('[class="swal-button swal-button--confirm"]')
          .contains('OK')
          .click()
      })

  })

  it('should check if status changed to DONE', () => {
    cy.get('td button', { timeout: 5000 })
      .its('length')
      .then((len) => {
        cy.get('td button', { timeout: 5000 })
          .eq(len - 1)
          .click()
          .should('have.attr', 'status')
          .get('[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"]', { timeout: 5000 })
          .should('contain', "DONE")
          .first()
          .click({ force: true })
      })

  })
})
