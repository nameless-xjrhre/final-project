
describe('Bills Page - Mark as Paid Test',()=>{
    it('should mark patient as paid',()=>{
        cy.visit('http://localhost:3000/bills')
        .get('[id=basic-button]').eq(4).click()
        .get('[role="menuitem"]').last().contains('Mark as Paid').click()
    })
})