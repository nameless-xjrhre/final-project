import {
  fakeDataRandomizer,
  medStaffRandomizer,
  visitTypeRandomizer,
  genderRandomizer,
} from '../../fixtures/randomizer'
const fakeData = require('../../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

const firstName = fakeDataProps[fakeDataRandomizer()].firstName
const lastName = fakeDataProps[fakeDataRandomizer()].lastName
const contactNum = fakeDataProps[fakeDataRandomizer()].contactNum
const dateOfBirth = fakeDataProps[fakeDataRandomizer()].dateOfBirth
const appointmentDate = fakeDataProps[fakeDataRandomizer()].appointmentDate
const appointmentTime = fakeDataProps[fakeDataRandomizer()].startTime
const address = fakeDataProps[fakeDataRandomizer()].address

describe('Appointment Page - Create Appointment With Patient Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/appointments')
      .get('[aria-label="SpeedDial basic example"]')
      .click()
      .should('be.visible')
      .get('[aria-label="Create New Appointment"]')
      .should('be.visible')
      .click()
  })

  it('should input patient name', () => {
    cy.get('[name=firstName]')
      .click()
      .type(firstName)
      .should('have.value', firstName)
      .get('[name=lastName]')
      .click()
      .type(lastName)
      .should('have.value', lastName)
  })

  it('should input contact info', () => {
    cy.get('[name=contactNum]')
      .click()
      .type(contactNum)
      .should('have.value', contactNum)
  })

  it('should select gender', () => {
    cy.get(
      '[class="MuiRadio-root MuiRadio-colorPrimary MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root css-vqmohf-MuiButtonBase-root-MuiRadio-root"]',
    )
      .eq(genderRandomizer())
      .click()
  })

  it('should input date of birth', () => {
    cy.get('[name=dateOfBirth]')
      .click()
      .clear()
      .type(dateOfBirth)
      .should('have.value', dateOfBirth)

  })

  it('should input address', () => {
    cy.get('[name=address]')
      .click()
      .type(address)
      .should('have.value', address)
  })

  it('should click next button', () => {
    cy.get('[type=submit]').should('contain', 'Next').click()
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
      .get('[role="option"]')
      .last()
      .should('not.be.empty')
      .click()
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
    cy.get('[name=note]').click().type('Black eyes, droopy nose')
  })

  it('should book appointment', () => {
    cy.get('[type=submit]')
      .should('contain', 'Book Now')
      .click()
      .get('[class="swal-modal"]')
      .get('[class="swal-button swal-button--confirm"]')
      .should('contain', 'OK')
      .click()
  })

  it('should check if appointment is in appointment list', () => {
    cy.visit('http://localhost:3000/appointments')
      .get('ul li button')
      .its('length')
      .then((len) => {
        if (len >= 4) {
          cy.get('ul li button')
            .eq(len - 2)
            .click()
        }
        cy.get('tr td')
          .should('be.visible')
          .and('contain', firstName + ' ' + lastName)

      })

  })

})
