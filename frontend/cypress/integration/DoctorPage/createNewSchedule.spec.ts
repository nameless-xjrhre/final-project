import {
  fakeDataRandomizer,
  daysRandomizer,
} from '../../fixtures/randomizer'
const fakeData = require('../../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects


const startTime = fakeDataProps[fakeDataRandomizer()].startTime
const endTime = fakeDataProps[fakeDataRandomizer()].endTime
let totalNumOfScheds;

describe('Doctor Page - Create New Schedule Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/doctors')
      .get('[class="MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-clickable MuiChip-clickableColorDefault MuiChip-filledDefault css-j4zylg-MuiButtonBase-root-MuiChip-root"]')
      .its('length')
      .then((len) => {
        totalNumOfScheds = len
      })
      .get('[aria-label="SpeedDial basic example"]')
      .should('be.visible')
      .trigger('mouseover')
      .get('[aria-label="Create New Schedule"]')
      .should('be.visible')
      .click()
  })

  it('should select doctor', () => {
    cy.get('[id=mui-component-select-medicalStaff]')
      .click()
      .get('[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"]')
      .its('length')
      .then((len) => {
        cy.get('[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"]')
          .eq(len - 1)
          .click({ force: true })
      })
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
      .type(startTime)
      .get('[name=endTime]')
      .click()
      .type(endTime)
  })

  it('should press add schedule button', () => {
    cy.get('[type=submit]')
      .should('contain', 'Create Schedule')
      .click()
      .get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })

  it('should check if a schedule was added', () => {
    cy.visit('http://localhost:3000/doctors')
      .get('[class="MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-clickable MuiChip-clickableColorDefault MuiChip-filledDefault css-j4zylg-MuiButtonBase-root-MuiChip-root"]')
      .should('have.length.greaterThan', totalNumOfScheds)
  })
})
