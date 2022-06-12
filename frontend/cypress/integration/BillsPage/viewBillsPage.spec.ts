describe('Bills Page - View Bills Page', () => {
  it('should access bills page', () => {
    cy.visit('bills').url().should('include', '/bills')
  })
})
