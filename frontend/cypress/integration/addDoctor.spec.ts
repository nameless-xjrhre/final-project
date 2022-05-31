describe('Doctor Page - Add Doctor Test', ()=>{
    it('should input name of doctor',()=>{
        cy.visit('http://localhost:3000/doctors')
        .get('[aria-label="SpeedDial basic example"]').trigger('mouseover')
        .get('[aria-label="Add Doctor"]').click()
        .get('[name=firstName]').type('Stuart')
        .get('[name=lastName]').type('Dolittle')
    })

    it('should input contact information',()=>{
        cy.get('[name=contactNum]').type('09273877110')
    })

    it('should input address',()=>{
        cy.get('[name=address]').type('Naga, Camarines Sur')
    })

    it('should click add doctor button', () => {
        cy.get('button').contains('Add Doctor').click()
    })
})