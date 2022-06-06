import { fakeDataRandomizer } from '../fixtures/randomizer'
const fakeData = require('../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

describe('Doctor Page - Add Doctor Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/doctors')
  })

  it('should input name of doctor', () => {
    cy.get('[aria-label="SpeedDial basic example"]')
      .trigger('mouseover')
      .get('[aria-label="Add Doctor"]')
      .click()
      .get('[name=firstName]')
      .type(fakeDataProps[fakeDataRandomizer()].firstName)
      .get('[name=lastName]')
      .type(fakeDataProps[fakeDataRandomizer()].lastName)
  })

  it('should input contact information', () => {
    cy.get('[name=contactNum]').type(
      fakeDataProps[fakeDataRandomizer()].contactNum,
    )
  })

  it('should input address', () => {
    cy.get('[name=address]').type(fakeDataProps[fakeDataRandomizer()].address)
  })

  it('should click add doctor button', () => {
    cy.get('button').contains('Add Doctor').click().wait(5000)
  })

  it('should display confirmation message', () => {
    cy.get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })
})
