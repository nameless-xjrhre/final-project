describe('Appointment Page - View Appointments Page', () => {
    it('should visit appointment page', () => {
        cy.visit('http://localhost:3000/appointments')
        .url().should('include', '/appointments')
    }) 
})