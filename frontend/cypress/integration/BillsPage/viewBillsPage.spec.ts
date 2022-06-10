describe('Bills Page - View Bills Page',()=>{
    it('should access bills page',()=>{
        cy.visit('http://localhost:3000/bills')
        .url().should('include', '/bills')
    }) 
})