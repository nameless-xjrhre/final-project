describe('Bills Page - Edit Bills Test',()=>{
    it('should change amount',()=>{
        cy.visit('http://localhost:3000/bills')
        .get('[id=basic-button]').eq(6).click()
        .get('[role="menuitem"]').contains('Edit').click({force:true})
        .get('[name=amount]').last().click().type('6969')
    })

    it('should select payment term',()=>{
        cy.get('[id=mui-component-select-paymentTerm]').last().click()
        .get('[data-value="60 days"]').click()
    })

    it('should save changes',()=>{
        cy.get('[type=button]').last().contains('Save Changes').click()
    })
})