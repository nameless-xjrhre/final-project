describe('Patient Page - View Patient Page',()=>{
    it('should visit patient page',()=>{
        cy.visit('http://localhost:3000/patients')
        .url().should('include', '/patients')
    }) 
})