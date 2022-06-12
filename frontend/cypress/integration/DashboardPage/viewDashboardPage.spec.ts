describe('Dashboard Page - View Dashboard Page', () => {
  it('should access dashboard', () => {
    cy.visit('dashboard').url().should('include', '/dashboard')
  })
})
