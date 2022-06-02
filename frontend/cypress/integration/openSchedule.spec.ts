describe('Doctors Page - Open A Schedule Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/doctors')
    })

    it('should open a schedule', () => {
        cy.get('[class=css-zgbp5c-MuiStack-root]').contains('7:40 AM - 10:15 AM')
            .click()
            .get('[value="OPEN"]')
            .click()
            .wait(5000)
            .get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
    })
})