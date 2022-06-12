import {
  amountRandomizer,
  paymentTermRandomizer,
} from '../../fixtures/randomizer'

const amount = amountRandomizer().toString()
const paymentTerm = paymentTermRandomizer()

describe('Appointment Page - Generate Bill Test', () => {
  before(() => {
    cy.visit('appointments')
      .get('[id="basic-button"]')
      .its('length')
      .then((len) => {
        cy.get('[id="basic-button"]')
          .eq(len - 1)
          .click()
      })
  })

  it('should click generate bill button', () => {
    cy.get('[role="menuitem"]').contains('Generate Bill').click({ force: true })
  })

  it('should input amount', () => {
    cy.get('[name=amount]').last().click().type(amount)
  })

  it('should input payment term', () => {
    cy.get('[id="mui-component-select-paymentTerm"]')
      .last()
      .click()
      .get('[name=paymentTerm]')
      .contains(paymentTerm)
      .click()
  })

  it('should save changes', () => {
    cy.get('[type=button]')
      .last()
      .should('contain', 'Create Bill')
      .click()
      .get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })

  it('should check if the bill has been generated', () => {
    cy.visit('bills')
      .get('tr td')
      .should('contain', amount)
      .and('contain', 'UNPAID')
  })
})
