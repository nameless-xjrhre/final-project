import {
  amountRandomizer,
  paymentTermRandomizer,
  patientRandomizer,
} from '../fixtures/randomizer'
const fakeData = require('../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

describe('Bills Page - Edit Bills Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/bills')
      .wait(5000)
      .get('[id="basic-button"]')
      .its('length')
      .then((len) => {
        cy.get('[id="basic-button"]')
          .eq(len - 1)
          .click()
          .get('[role="menuitem"]')
          .contains('Edit')
          .click({ force: true })
      })
  })

  describe('update amount and payment term', () => {
    it('should change amount', () => {
      cy.get('[name=amount]').last().click().type(amountRandomizer().toString())
    })

    it('should select payment term', () => {
      cy.get('[id="mui-component-select-paymentTerm"]')
        .last()
        .click()
        .get('[name=paymentTerm]')
        .contains(paymentTermRandomizer())
        .click()
    })

    it('should save changes', () => {
      cy.get('[type=button]').last().contains('Save Changes').click().wait(5000)
    })

    it('should display confirmation message', () => {
      cy.get('[class="swal-title"]')
        .should('contain', 'Success')
        .get('[class="swal-button swal-button--confirm"]')
        .contains('OK')
        .click()
    })
  })

  describe('update amount only', () => {
    it('should select edit button', () => {
      cy.get('[id=basic-button]')
        .its('length')
        .then((len) => {
          cy.get('[id=basic-button]')
            .eq(len - 1)
            .click()
            .get('[role="menuitem"]')
            .contains('Edit')
            .click({ force: true })
        })
    })

    it('should change amount', () => {
      cy.get('[name=amount]').last().click().type(amountRandomizer().toString())
    })

    it('should save changes', () => {
      cy.get('[type=button]').last().contains('Save Changes').click().wait(5000)
    })

    it('should display confirmation message', () => {
      cy.get('[class="swal-title"]')
        .should('contain', 'Success')
        .get('[class="swal-button swal-button--confirm"]')
        .contains('OK')
        .click()
    })
  })

  describe('update payment term only', () => {
    it('should select edit button', () => {
      cy.get('[id=basic-button]')
        .its('length')
        .then((len) => {
          cy.get('[id=basic-button]')
            .eq(len - 1)
            .click()
            .get('[role="menuitem"]')
            .contains('Edit')
            .click({ force: true })
        })
    })

    it('should select payment term', () => {
      cy.get('[id=mui-component-select-paymentTerm]')
        .last()
        .click()
        .get('[name=paymentTerm]')
        .contains(paymentTermRandomizer())
        .click()
    })

    it('should save changes', () => {
      cy.get('[type=button]').last().contains('Save Changes').click().wait(5000)
    })

    it('should display confirmation message', () => {
      cy.get('[class="swal-title"]')
        .should('contain', 'Success')
        .get('[class="swal-button swal-button--confirm"]')
        .contains('OK')
        .click()
    })
  })
})
