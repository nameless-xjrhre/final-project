describe('Patient Page - View Patient Page', () => {
  it('should visit patient page', () => {
    cy.visit('patients').url().should('include', '/patients')
  })
})
