import {
  fakeDataRandomizer,
  genderStringRandomizer,
} from '../../fixtures/randomizer'
const fakeData = require('../../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

const firstName = fakeDataProps[fakeDataRandomizer()].firstName
const lastName = fakeDataProps[fakeDataRandomizer()].lastName
const contactNum = fakeDataProps[fakeDataRandomizer()].contactNum
const dateOfBirth = fakeDataProps[fakeDataRandomizer()].dateOfBirth
const address = fakeDataProps[fakeDataRandomizer()].address

describe('Patient Page - Edit Patient Info Test', () => {
  before(() => {
    cy.visit('patients')
      .get('[id="basic-button"]')
      .first()
      .click()
      .get('[role="menuitem"]')
      .contains('Edit')
      .click({ force: true })
  })

  it('should edit name of patient', () => {
    cy.get('[name=firstName]')
      .last()
      .click()
      .type(firstName)
      .should('have.value', firstName)
      .get('[name=lastName]')
      .last()
      .click()
      .type(lastName)
      .should('have.value', lastName)
  })

  it('should input contact number', () => {
    cy.get('[name=contactNum]')
      .last()
      .click()
      .type(contactNum)
      .should('have.value', contactNum)
  })

  it('should select gender', () => {
    cy.get('label span input')
      .get('[value=' + genderStringRandomizer() + ']')
      .last()
      .click()
  })

  it('should input address', () => {
    cy.get('[name=address]')
      .last()
      .click()
      .type(address)
      .should('have.value', address)
  })

  it('should input date of birth', () => {
    cy.get('[name=dateOfBirth]')
      .last()
      .click()
      .clear()
      .type(dateOfBirth)
      .should('have.value', dateOfBirth)
  })

  it('should save changes', () => {
    cy.get('[type=button]').last().should('contain', 'Save Changes').click()
      .get('[class="swal-modal"]')
      .get('[class="swal-button swal-button--confirm"]')
      .should('contain', 'OK')
      .click()
  })

  it('should check if a patient info was indeed edited', () => {
    cy.visit('patients')
      .get('tr td')
      .should('contain', firstName + ' ' + lastName)
  })
})
