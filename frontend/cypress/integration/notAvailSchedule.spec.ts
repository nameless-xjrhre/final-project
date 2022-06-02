describe('Doctors Page - Nullify A Schedule Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/doctors')
    })

    it('should nullify a schedule', () => {
        cy.get('[class=css-zgbp5c-MuiStack-root]').contains('1:11 AM - 3:04 AM')
            .click()
            .get('[value="NOT_AVAILABLE"]')
            .click()
            .wait(5000)
            .get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
    })
})