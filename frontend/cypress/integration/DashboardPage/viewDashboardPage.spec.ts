describe('Dashboard Page - View Dashboard Page', () => {
    it('should access dashboard', () => {
        cy.visit('http://localhost:3000/dashboard')
        .url().should('include', '/dashboard')
    })
})