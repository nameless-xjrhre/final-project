import {
  fakeDataRandomizer,
  visitTypeRandomizer,
} from '../../fixtures/randomizer'
const fakeData = require('../../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

const appointmentDate = fakeDataProps[fakeDataRandomizer()].appointmentDate
const appointmentTime = fakeDataProps[fakeDataRandomizer()].startTime
let visitType;
let medicalStaff;

describe('Appointment Page - Edit Appointment Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/appointments')
      .get('[id="basic-button"]')
      .its('length')
      .then((len) => {
        cy.get('[id="basic-button"]')
          .eq(len - 1)
          .click()
          .get('ul li')
          .contains('Edit')
          .click({ force: true })
      })
  })

  it('should select visit type', () => {
    cy.get('[id=mui-component-select-visitType]')
      .last()
      .then((type) => {
        visitType = type.text()
        visitType = visitType.toLowerCase()
        visitType = visitType[0].toUpperCase() + visitType.substring(1)

        cy.get('[id=mui-component-select-visitType]')
          .last()
          .click()
          .get('ul li')
          .get('[name=visitType]')
          .contains(visitTypeRandomizer())
          .click()
      })

  })

  it('should select medical staff', () => {
    cy.get('[id=mui-component-select-medicalStaff]')
      .last()
      .then((name) => {
        medicalStaff = name.text()
        medicalStaff = medicalStaff.split(' ')
        cy.get('[id=mui-component-select-medicalStaff]')
          .last()
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

  })

  it('should input date', () => {
    cy.get('[name=appointmentDate]')
      .last()
      .click()
      .clear()
      .type(appointmentDate)
      .should('have.value', appointmentDate)
  })

  it('should input appointment time', () => {
    cy.get('[name=appointmentTime]')
      .last()
      .click()
      .clear()
      .type(appointmentTime)
      .should('have.value', appointmentTime)
  })

  it('should input note', () => {
    cy.get('[name=note]').last().click().type('Swollen ears, nodes')
  })

  it('should book appointment', () => {
    cy.get('[type=submit]')
      .last()
      .should('contain', 'Save Changes')
      .click()
      .get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })

  it('should check if an appointment is edited', () => {
    let appointmentDateSplitter = appointmentDate.split('/')
    let newAppointmentDate = appointmentDateSplitter[2] + '/' + appointmentDateSplitter[0] + '/' + appointmentDateSplitter[1]
    let newAppointmentTime = appointmentTime + ':00'
    cy.visit('http://localhost:3000/appointments')
    .get('tr td')
    .should('contain', visitType)
    .and('contain', medicalStaff[1])
    .and('contain', newAppointmentDate)
    .and('contain', newAppointmentTime)
  })
})
