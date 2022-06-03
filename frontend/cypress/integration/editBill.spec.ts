describe('Bills Page - Edit Bills Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/bills')
      .wait(5_000)
      .get('[id=basic-button]')
      .eq(7)
      .click()
      .get('[role="menuitem"]')
      .contains('Edit')
      .click({ force: true })
  })

  describe('update amount and payment term', () => {
    it('should change amount', () => {
      cy.get('[name=amount]').last().click().type('42069')
    })

    it('should select payment term', () => {
      cy.get('[id=mui-component-select-paymentTerm]')
        .last()
        .click()
        .get('[data-value="15 days"]')
        .click()
    })

    it('should save changes', () => {
      cy.get('[type=button]')
        .last()
        .contains('Save Changes')
        .click()
        .wait(5_000)
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
        .eq(7)
        .click()
        .get('[role="menuitem"]')
        .contains('Edit')
        .click({ force: true })
    })

    it('should change amount', () => {
      cy.get('[name=amount]').last().click().type('5000')
    })

    it('should save changes', () => {
      cy.get('[type=button]')
        .last()
        .contains('Save Changes')
        .click()
        .wait(5_000)
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
        .eq(7)
        .click()
        .get('[role="menuitem"]')
        .contains('Edit')
        .click({ force: true })
    })

    it('should select payment term', () => {
      cy.get('[id=mui-component-select-paymentTerm]')
        .last()
        .click()
        .get('[data-value="7 days"]')
        .click()
    })

    it('should save changes', () => {
      cy.get('[type=button]')
        .last()
        .contains('Save Changes')
        .click()
        .wait(5_000)
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
