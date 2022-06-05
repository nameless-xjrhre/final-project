describe('Doctors Page - Delete A Schedule Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/doctors')
    })

    it('should delete a schedule', () => {
        cy.get('[class=css-zgbp5c-MuiStack-root]')
            .last()
            .click()
            .get('[role="menuitem"]').last()
            .contains('Delete')
            .click()
            .get('[type=button]').last()
            .contains('Yes')
            .click()
            .wait(5000)

    })

    it('should display confirmation message', () => {
        cy.get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
    })
})