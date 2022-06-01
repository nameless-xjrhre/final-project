describe('Doctors Page - Delete A Schedule Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/doctors')
    })

    it('should delete a schedule', () => {
        cy.get('[class=css-zgbp5c-MuiStack-root]').contains('12:42 PM - 12:43 PM')
        .click()
        .get('[role="menuitem"]')
        .contains('Delete')
        .click()
        .get('[type=button]')
        .contains('Yes')
        .click()
        .wait(5000)
        .get('[class="swal-title"]')
        .should('contain', 'Success')
        .get('[class="swal-button swal-button--confirm"]')
        .contains('OK')
        .click()
    })
})