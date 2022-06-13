import { fakeDataRandomizer } from '../../fixtures/randomizer'
const fakeData = require('../../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

const firstName = fakeDataProps[fakeDataRandomizer()].firstName
const lastName = fakeDataProps[fakeDataRandomizer()].lastName
const contactNum = fakeDataProps[fakeDataRandomizer()].contactNum
const address = fakeDataProps[fakeDataRandomizer()].address

describe('Doctor Page - Add Doctor Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/doctors')
      .get('[aria-label="SpeedDial basic example"]')
      .should('be.visible')
      .trigger('mouseover')
  })

  it('should input name of doctor', () => {
    cy.get('[aria-label="Add Doctor"]')
      .should('be.visible')
      .click()
      .get('[name=firstName]')
      .type(firstName)
      .should('have.value', firstName)
      .get('[name=lastName]')
      .type(lastName)
      .should('have.value', lastName)
  })

  it('should input contact information', () => {
    cy.get('[name=contactNum]')
      .type(contactNum)
      .should('have.value', contactNum)
  })

  it('should input address', () => {
    cy.get('[name=address]').type(address).should('have.value', address)
  })

  it('should click add doctor button', () => {
    cy.get('[type=button]').last().should('contain.text', 'Add Doctor').click()
  })

  it('should confirm in the doctors page', () => {
    cy.visit('http://localhost:3000/doctors')
      .get('tr td')
      .should('exist')
      .and('contain', 'Dr. ' + firstName + ' ' + lastName)
  })
})
