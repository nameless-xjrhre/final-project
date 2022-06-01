describe('Appointment Page - Generate Bill Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/appointments')
    })

    it('should click generate bill button', () => {
        cy.get('[id="basic-button"]').eq(7)
            .click()
            .get('[role="menuitem"]')
            .contains('Generate Bill')
            .click({ force: true })
    })

    it('should input amount', () => {
        cy.get('[name=amount]').last().click().type('4269')
    })

    it('should input payment term', () => {
        cy.get('[id=mui-component-select-paymentTerm]').last().click()
            .get('[data-value="30 days"]').click()
    })

    it('should save changes', () => {
        cy.get('[type=button]').last().contains('Create Bill').click().wait(5000)
    })

    it('should display confirmation message', () => {
        cy.get('[class="swal-title"]')
          .should('contain', 'Success')
          .get('[class="swal-button swal-button--confirm"]')
          .contains('OK')
          .click()
      })
})