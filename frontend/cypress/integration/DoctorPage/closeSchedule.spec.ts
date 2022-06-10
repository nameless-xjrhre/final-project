describe('Doctors Page - Close A Schedule Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/doctors')
    })

    it('should close a schedule', () => {
        cy.get('[class="MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-clickable MuiChip-clickableColorDefault MuiChip-filledDefault css-j4zylg-MuiButtonBase-root-MuiChip-root"]')
            .last()
            .click()
            .get('[value="CLOSED"]').last()
            .click()

    })

    it('should check change in color', () => {
        cy.get('.css-1l5e8fi-MuiButtonBase-root-MuiChip-root')
            .should('have.css', 'background-color', 'rgb(254, 121, 129)')
            .get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
    })




})