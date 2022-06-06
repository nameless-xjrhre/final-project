import { fakeDataRandomizer, medStaffRandomizer, visitTypeRandomizer, genderRandomizer } from "../fixtures/randomizer"
const fakeData = require('../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects


describe('Appointment Page - Create Appointment With Patient Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/appointments')
  })

  it('should input patient name', () => {
    cy.get('[aria-label="SpeedDial basic example"]')
      .click()
      .get('[aria-label="Create New Appointment"]')
      .click()
      .get('[name=firstName]')
      .click()
      .type(fakeDataProps[fakeDataRandomizer()].firstName)
      .get('[name=lastName]')
      .click()
      .type(fakeDataProps[fakeDataRandomizer()].lastName)
  })

  it('should input contact info', () => {
    cy.get('[name=contactNum]').click().type(fakeDataProps[fakeDataRandomizer()].contactNum)
  })

  it('should select gender', () => {
    cy.get('[class="MuiRadio-root MuiRadio-colorPrimary MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root css-vqmohf-MuiButtonBase-root-MuiRadio-root"]')
    .eq(genderRandomizer())
    .click()
  })

  it('should input date of birth', () => {
    cy.get('[name=dateOfBirth]')
      .click()
      .type(fakeDataProps[fakeDataRandomizer()].dateOfBirth)
      .clear()
      .type(fakeDataProps[fakeDataRandomizer()].dateOfBirth)
  })

  it('should input address', () => {
    cy.get('[name=address]').click().type(fakeDataProps[fakeDataRandomizer()].address)
  })

  it('should click next button', () => {
    cy.get('[type=submit]').contains('Next').click()
  })

  it('should click back button', () => {
    cy.get('[type=button]').contains('Back').click().wait(5000)
  })

  it('should click next button again', () => {
    cy.get('[type=submit]').contains('Next').click()
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

  it('should input appointment time', () => {
    cy.get('[name=appointmentTime]').click().type(fakeDataProps[fakeDataRandomizer()].startTime)
  })

  it('should input note', () => {
    cy.get('[name=note]').click().type('Black eyes, droopy nose')
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
