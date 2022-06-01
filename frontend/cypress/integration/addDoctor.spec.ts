describe('Doctor Page - Add Doctor Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/doctors')
    })

    it('should input name of doctor', () => {
        cy.get('[aria-label="SpeedDial basic example"]').trigger('mouseover')
            .get('[aria-label="Add Doctor"]').click()
            .get('[name=firstName]').type('Shinobu')
            .get('[name=lastName]').type('Kuki')
    })

    it('should input contact information', () => {
        cy.get('[name=contactNum]').type('09273877110')
    })

    it('should input address', () => {
        cy.get('[name=address]').type('Naga, Camarines Sur')
    })

    it('should click add doctor button', () => {
        cy.get('button').contains('Add Doctor').click().wait(5000)
    })

    it('should display confirmation message', ()=>{
        cy.get('[class="swal-title"]')
        .should('contain', 'Success')
        .get('[class="swal-button swal-button--confirm"]')
        .contains('OK')
        .click()
    })
})