describe('Patient Page - Delete Patient Test',()=>{
    it('should delete patient',()=>{
        cy.visit('http://localhost:3000/patients')
        .get('[id="basic-button"]').eq(7).click()
        .get('ul').get('li').last().contains('Delete').click()
        .get('[type=button]').last().contains('Yes').click()
    })
})