describe('Doctors Page - Close A Schedule Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/doctors')
    })

    it('should close a schedule', () => {
        cy.get('[class="css-zgbp5c-MuiStack-root"]')
            .last()
            .click()
            .get('[value="CLOSED"]').last()
            .click()

    })

    it('should check change in color', () => {
        cy.get('.css-1l5e8fi-MuiButtonBase-root-MuiChip-root')
            .should('be.visible')
            .and('have.css', 'background-color', 'rgb(254, 121, 129)')
    })




})