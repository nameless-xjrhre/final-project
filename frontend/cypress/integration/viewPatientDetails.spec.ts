describe('Patient Page - View Patient Details Test',()=>{
    it('should view patient details',()=>{
        cy.visit('http://localhost:3000/patients')
        .get('[id="basic-button"]').eq(2).click()
        .get('ul').get('li').contains('View Details').click({force:true})
    })
})