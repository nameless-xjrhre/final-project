import { fakeDataRandomizer, daysRandomizer } from '../../fixtures/randomizer'
const fakeData = require('../../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

const startTime = fakeDataProps[fakeDataRandomizer()].startTime
const endTime = fakeDataProps[fakeDataRandomizer()].endTime
let totalNumOfScheds

describe('Doctor Page - Create New Schedule Test', () => {
  before(() => {
    cy.visit('doctors')
      .get('[class="css-1s4yypy"]')
      .should('be.visible')
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
      .get('ul li')
      .get('[role="option"]')
      .eq(5)
      .should('not.be.empty')
      .click()
  })

  it('should select days', () => {
    cy.get('[class=" css-b62m3t-container"]')
      .click()
      .type(daysRandomizer() + '{enter}')
      .click()
      .get('[class="css-xb97g8"]')
      .click()
      .get('[class=" css-b62m3t-container"]')
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
    cy.get('[type=submit]').should('contain', 'Create Schedule').click()
      .get('[class="swal-modal"]')
      .get('[class="swal-button swal-button--confirm"]')
      .should('contain', 'OK')
      .click()
  })

  it('should check if a schedule was added', () => {
    cy.visit('doctors')
      .get('[class="css-1s4yypy"]')
      .should('be.visible')
      .its('length')
      .then((len) => {
        if (len > totalNumOfScheds) {
          assert.isAbove(len, totalNumOfScheds, 'A new schedule was created')
        } else {
          assert.equal(len, totalNumOfScheds, 'A schedule was not added')
        }
      })
  })
})