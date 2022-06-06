import {patientRandomizer} from "../fixtures/randomizer"

describe('Patient Page - View Patient Details Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/patients')
    })

    it('should view patient details', () => {
        cy.get('[id="basic-button"]').eq(patientRandomizer()).click()
            .get('[role="menuitem"]').contains('View Details')
            .last().click({ force: true })
    })
})