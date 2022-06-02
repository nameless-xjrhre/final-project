describe('Doctors Page - Close A Schedule Test', ()=>{
    before(()=>{
        cy.visit('http://localhost:3000/doctors')
    })

    it('should close a schedule', () => {
        cy.get('[class=css-zgbp5c-MuiStack-root]').contains('8:02 PM - 8:28 PM')
         .click()
         .get('[value="CLOSED"]')
         .click()
         .wait(5000)
         .get('[class="swal-title"]')
         .should('contain', 'Success')
         .get('[class="swal-button swal-button--confirm"]')
         .contains('OK')
         .click()
    })


})