
describe('Patient Page - Edit Patient Info Test', ()=>{
    it('should edit name of patient',()=>{
        cy.visit('http://localhost:3000/patients')
        .get('[id="basic-button"]').eq(3).click()
        .get('[role="menuitem"]').contains('Edit').click({force:true})
        .get('[name=firstName]').last().click().type('Samuel')
        .get('[name=lastName]').last().click().type('Crawshank')
    })

    it('should input contact number',()=>{
        cy.get('[name=contactNum]').last().click().type('09273877110')
    })

    it('should select gender',()=>{
        cy.get('[value="MALE"]').last().click()
    })

    it('should input address', ()=>{
        cy.get('[name=address]').last().click().type('Toronto, Canada')
    })

    //Test fails if clearing the date field
    it('should input date of birth',()=>{
        cy.get('[name=dateOfBirth]').last().click().type('10/06/2000')
    })

    it('should save changes',()=>{
        cy.get('[type=button]').last().contains('Save Changes').click()
    })

})