import {
  fakeDataRandomizer,
  visitTypeRandomizer,
} from '../../fixtures/randomizer'
const fakeData = require('../../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

const appointmentDate = fakeDataProps[fakeDataRandomizer()].appointmentDate
const appointmentTime = fakeDataProps[fakeDataRandomizer()].startTime
let visitType
let newVisitType
let medicalStaff

describe('Appointment Page - Edit Appointment Test', () => {
  before(() => {
    cy.visit('appointments')
      .get('[id="basic-button"]')
      .first()
      .click()
      .get('ul li')
      .contains('Edit')
      .click({ force: true })
  })

  it('should select visit type', () => {
    cy.get('[id=mui-component-select-visitType]')
      .last()
      .then((type) => {
        visitType = type.text()
        cy.get('[id=mui-component-select-visitType]')
          .last()
          .click()
          .get('ul li')
          .get('[name=visitType]')
          .contains(visitTypeRandomizer())
          .then((type) => {
            newVisitType = type.text()
            while (visitType.toUpperCase() == newVisitType) {
              newVisitType = visitTypeRandomizer()
            }
            cy.get('ul li')
              .get('[name=visitType]')
              .contains(newVisitType)
              .click()
          })
      })
  })

  it('should select medical staff', () => {
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
      .get('[class="swal-modal"]')
      .get('[class="swal-button swal-button--confirm"]')
      .should('contain', 'OK')
      .click()
  })

  it('should check if an appointment is edited', () => {
    newVisitType = newVisitType.toLowerCase()
    newVisitType = newVisitType[0].toUpperCase() + newVisitType.substring(1)
    let appointmentDateSplitter = appointmentDate.split('/')
    let newAppointmentDate =
      appointmentDateSplitter[2] +
      '/' +
      appointmentDateSplitter[0] +
      '/' +
      appointmentDateSplitter[1]
    let newAppointmentTime = appointmentTime + ':00'

    cy.visit('appointments')
      .get('[class="MuiTableRow-root css-1q1u3t4-MuiTableRow-root"]')
      .should('be.visible')
      .get('td')
      .should('be.visible')
      .and('contain', newVisitType)
      .and('contain', newAppointmentDate)
      .and('contain', newAppointmentTime)
  })
})
