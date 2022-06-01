describe('Appointment Page - Delete Appointment Test', ()=>{
    before(() => {
        cy.visit('http://localhost:3000/appointments')
    })

    it('should delete appointment', () => {
        cy.get('[id="basic-button"]').eq(0)
            .click()
            .get('[role="menuitem"]')
            .contains('Delete')
            .click({ force: true })
            .get('[type=button]')
            .last()
            .contains('Yes')
            .click().wait(5000)
    })

    it('should display confirmation message', () => {
        cy.get('[class="swal-title"]')
          .should('contain', 'Success')
          .get('[class="swal-button swal-button--confirm"]')
          .contains('OK')
          .click()
      })
})