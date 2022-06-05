describe('Appointment Page - Edit Appointment Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/appointments')
    })

    it('should click edit button', () => {
        cy.get('[id="basic-button"]').eq(5)
            .click()
            .get('[role="menuitem"]').contains('Edit').click({ force: true })
    })

    it('should change status', () => {
        cy.get('[id=mui-component-select-status]').last().click()
            .get('[data-value="EXPIRED"]').click()
    })

    it('should select visit type', () => {
        cy.get('[id=mui-component-select-visitType]').last()
            .click()
            .get('[data-value=ROUTINE]')
            .click()
    })

    it('should select medical staff', () => {
        cy.get('[id=mui-component-select-medicalStaff]').last()
            .click()
            .get('[name="medicalStaff"]')
            .last()
            .click()
    })

    it('should input date', () => {
        cy.get('[name=appointmentDate]').last()
            .click()
            .type('10/06/2022')
            .clear()
            .type('10/31/2022')
    })

    it('should input time', () => {
        cy.get('[name=appointmentTime]').last().click().clear().type('16:30')
    })

    it('should input note', () => {
        cy.get('[name=note]').last().click().type('Sore throat, red eyes')
    })

    it('should book appointment', () => {
        cy.get('[type=submit]').last().contains('Save Changes').click().wait(5000)
    })

    it('should display confirmation message', () => {
        cy.get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
    })

})