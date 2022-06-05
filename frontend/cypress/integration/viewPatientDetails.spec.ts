import { last } from "cypress/types/lodash"

describe('Patient Page - View Patient Details Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/patients')
    })

    it('should view patient details', () => {
        cy.get('[id="basic-button"]').eq(5).click()
            .get('[role="menuitem"]').contains('View Details')
            .last().click({ force: true })
    })
})