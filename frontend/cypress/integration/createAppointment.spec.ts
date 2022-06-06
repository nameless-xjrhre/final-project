import { fakeDataRandomizer, patientRandomizer, medStaffRandomizer, visitTypeRandomizer } from "../fixtures/randomizer"
const fakeData = require('../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects


describe('Appointment Page - Create Appointment Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/appointments')
  })

  it('should select patient', () => {
    cy.get('[aria-label="SpeedDial basic example"]')
      .click()
      .get('[aria-label="Create Appointment"]')
      .click()
      .get('[id=mui-component-select-patient]')
      .click()
      .get('[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"]')
      .eq(patientRandomizer())
      .click()
  })

  it('should select visit type', () => {
    cy.get('[id=mui-component-select-visitType]')
      .click()
      .get('[name=visitType]')
      .contains(visitTypeRandomizer())
      .click()
  })

  it('should select medical staff', () => {
    cy.get('[id=mui-component-select-medicalStaff]')
      .click()
      .get('[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"]')
      .eq(medStaffRandomizer())
      .click()
  })

  it('should input date', () => {
    cy.get('[name=appointmentDate]')
      .click()
      .type(fakeDataProps[fakeDataRandomizer()].appointmentDate)
      .clear()
      .type(fakeDataProps[fakeDataRandomizer()].appointmentDate)
  })

  it('should input time', () => {
    cy.get('[name=appointmentTime]').click().type(fakeDataProps[fakeDataRandomizer()].startTime)
  })

  it('should input note', () => {
    cy.get('[name=note]').click().type('Sore throat, red eyes')
  })

  it('should book appointment', () => {
    cy.get('[type=submit]').contains('Book Now').click().wait(5000)
  })

  it('should display confirmation message', () => {
    cy.get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })
})
