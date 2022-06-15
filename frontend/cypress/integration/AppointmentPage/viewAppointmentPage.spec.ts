describe('Appointment Page - View Appointments Page', () => {
  it('should visit appointment page', () => {
    cy.visit('appointments').url().should('include', '/appointments')
  })
})
