import { fakeDataRandomizer, visitTypeRandomizer } from '../../fixtures/randomizer'
const fakeData = require('../../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects


let patientName;
const appointmentDate = fakeDataProps[fakeDataRandomizer()].appointmentDate
const appointmentTime = fakeDataProps[fakeDataRandomizer()].startTime


describe('Appointment Page - Create Appointment Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/appointments')
      .get('[aria-label="SpeedDial basic example"]')
      .click()
      .should('be.visible')
      .get('[aria-label="Create Appointment"]')
      .should('be.visible')
      .click()
  })

  it('should select patient', () => {
    cy.get('[id=mui-component-select-patient]')
      .click()
      .get('[name="patient"]')
      .its('length')
      .then((len) => {
        const index = len - 1
        cy.get('[name="patient"]')
          .eq(index)
          .then((name) => {
            patientName = name.text()
            cy.get('[name="patient"]')
              .eq(index)
              .click({force:true})
          })
      })
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
      .get('ul li')
      .get('[name="medicalStaff"]')
      .its('length')
      .then((len) => {
        cy.get('[name="medicalStaff"]')
          .eq(len - 1)
          .should('not.be.empty')
          .click({ force: true })
      })
  })

  it('should input date', () => {
    cy.get('[name=appointmentDate]')
      .click()
      .type(appointmentDate)
      .should('have.value', appointmentDate)
  })

  it('should input appointment time', () => {
    cy.get('[name=appointmentTime]')
      .click()
      .type(appointmentTime)
      .should('have.value', appointmentTime)
  })

  it('should input note', () => {
    cy.get('[name=note]').click().type('Sore throat, red eyes')
  })

  it('should book appointment', () => {
    cy.get('[type=submit]')
      .should('contain', 'Book Now')
      .click()
      .get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })

  it('should check if appointment is in appointment list', () => {
    cy.visit('http://localhost:3000/appointments')
      .get('tr td')
      .should('contain', patientName)
  })
})
