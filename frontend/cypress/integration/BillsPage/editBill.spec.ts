import {
  amountRandomizer,
  paymentTermRandomizer,
} from '../../fixtures/randomizer'

let amount = amountRandomizer().toString()
let paymentTerm = paymentTermRandomizer()

describe('Bills Page - Edit Bills Test', () => {
  describe('update amount and payment term', () => {
    before(() => {
      cy.visit('bills')
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

    it('should change amount', () => {
      cy.get('[name=amount]').last().click().type(amount)
    })

    it('should select payment term', () => {
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
        .should('contain', 'Save Changes')
        .click()
        .get('[class="swal-modal"]')
        .get('[class="swal-button swal-button--confirm"]')
        .should('contain', 'OK')
        .click()
    })

    it('should check if bill is edited in the bills page', () => {
      let termSplitter = paymentTerm.split(' ')
      let termDays = parseInt(termSplitter[0])
      let dateNow = new Date().getTime()
      let futureDate = new Date(dateNow + termDays * 24 * 3600 * 1000)
      let dueDate = futureDate.toLocaleDateString('en-ZA')
      cy.visit('bills')
        .get('tr td')
        .should('be.visible')
        .and('contain', '₱ ' + amount + '.00')
        .and('contain', dueDate)
    })
  })

  describe('update amount only', () => {
    before(() => {
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
      cy.get('[name=amount]').last().click().type(amount)
    })

    it('should save changes', () => {
      cy.get('[type=button]')
        .last()
        .should('contain', 'Save Changes')
        .click()
        .get('[class="swal-modal"]')
        .get('[class="swal-button swal-button--confirm"]')
        .should('contain', 'OK')
        .click()
    })

    it('should check if the edited amount exists in the bills page', () => {
      cy.visit('bills')
        .get('tr td')
        .should('be.visible')
        .and('contain', '₱ ' + amount + '.00')
    })
  })

  describe('update payment term only', () => {
    before(() => {
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
        .should('contain', 'Save Changes')
        .click()
        .get('[class="swal-modal"]')
        .get('[class="swal-button swal-button--confirm"]')
        .should('contain', 'OK')
        .click()
    })

    it('should check if the updated payment term was reflected in the bills page', () => {
      let termSplitter = paymentTerm.split(' ')
      let termDays = parseInt(termSplitter[0])
      let dateNow = new Date().getTime()
      let futureDate = new Date(dateNow + termDays * 24 * 3600 * 1000)
      let dueDate = futureDate.toLocaleDateString('en-ZA')
      cy.visit('bills')
        .get('tr td')
        .should('be.visible')
        .and('contain', dueDate)
    })
  })
})
