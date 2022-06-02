describe('Appointment Page - View Note Test', ()=>{
    before(() => {
        cy.visit('http://localhost:3000/appointments')
    })

    it('should hover view note button', () => {
        cy.get('[id="basic-button"]').eq(7)
            .click()
            .get('[role="menuitem"]')
            .contains('View Note')
            .trigger('mouseover', {force:true})
    })
})