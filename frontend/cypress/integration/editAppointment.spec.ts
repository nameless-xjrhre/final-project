import { fakeDataRandomizer, patientRandomizer, statusRandomizer, medStaffRandomizer, visitTypeRandomizer} from "../fixtures/randomizer"
const fakeData = require('../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

describe('Appointment Page - Edit Appointment Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/appointments')
    })

    it('should click edit button', () => {
        cy.get('[id="basic-button"]').eq(patientRandomizer())
            .click()
            .wait(3000)
            .get('[role="menuitem"]').contains('Edit').click({ force: true })
    })

    it('should change status', () => {
        cy.get('[id=mui-component-select-status]').last().click()
            .get('[data-value='+ statusRandomizer() + ']')
            .click()
            .wait(3000)
    })

    it('should select visit type', () => {
        cy.get('[id=mui-component-select-visitType]').last()
            .click()
            .wait(3000)
            .get('[name=visitType]')
            .contains(visitTypeRandomizer())
            .click()
    })

    it('should select medical staff', () => {
        cy.get('[id=mui-component-select-medicalStaff]').last()
            .click()
            .wait(3000)
            .get('[role="option"]')
            .eq(medStaffRandomizer())
            .click()
    })

    it('should input date', () => {
        cy.get('[name=appointmentDate]').last()
            .click()
            .type(fakeDataProps[fakeDataRandomizer()].appointmentDate)
            .clear()
            .type(fakeDataProps[fakeDataRandomizer()].appointmentDate)
    })

    it('should input time', () => {
        cy.get('[name=appointmentTime]').last().click().clear()
        .type(fakeDataProps[fakeDataRandomizer()].startTime)
    })

    it('should input note', () => {
        cy.get('[name=note]').last().click().type('Sore throat, red eyes')
    })

    it('should book appointment', () => {
        cy.get('[type=submit]').last().contains('Save Changes').click().wait(5000)
    })

    it('should display confirmation message', () => {
        cy.get('[class="swal-title"]')
            .wait(2000)
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
    })

})