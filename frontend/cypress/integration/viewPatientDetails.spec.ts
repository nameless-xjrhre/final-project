describe('Patient Page - View Patient Details Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/patients')
    })

    it('should view patient details', () => {
        cy.get('[id="basic-button"]').eq(5).click()
            .get('ul').get('li').contains('View Details').click({ force: true })
    })
})