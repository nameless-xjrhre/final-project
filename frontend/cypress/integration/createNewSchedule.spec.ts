import {
  fakeDataRandomizer,
  daysRandomizer,
  medStaffRandomizer,
} from '../fixtures/randomizer'
const fakeData = require('../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

describe('Doctor Page - Create New Schedule Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/doctors')
  })

  it('should select doctor', () => {
    cy.get('[aria-label="SpeedDial basic example"]')
      .trigger('mouseover')
      .get('[aria-label="Create New Schedule"]')
      .click()
      .get('[id=mui-component-select-medicalStaff]')
      .click()
      .get(
        '[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"]',
      )
      .eq(medStaffRandomizer())
      .click()
  })

  it('should select days', () => {
    cy.get('[class=" css-1kwwvb1-ValueContainer2"]')
      .click()
      .type(daysRandomizer() + '{enter}')
      .click()
      .get('[class="css-xb97g8"]')
      .click()
      .get('[class=" css-1kwwvb1-ValueContainer2"]')
      .click()
      .type(daysRandomizer() + '{enter}')
      .type(daysRandomizer() + '{enter}')
      .click()
  })

  it('should input start and end time', () => {
    cy.get('[name=startTime]')
      .click()
      .type(fakeDataProps[fakeDataRandomizer()].startTime)
      .get('[name=endTime]')
      .click()
      .type(fakeDataProps[fakeDataRandomizer()].endTime)
  })

  it('should press add schedule button', () => {
    cy.get('[type=submit]').contains('Create Schedule').click().wait(5000)
  })

  it('should display confirmation message', () => {
    cy.get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })
})
