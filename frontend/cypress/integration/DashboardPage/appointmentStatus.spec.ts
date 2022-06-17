describe('Dashboard Page - Appointment Status Test', () => {
  beforeEach(() => {
    cy.visit('dashboard')
  })

  describe('Canceled Status Test', () => {
    it('should change status to CANCELED', () => {
      cy.get('td button')
        .its('length')
        .then((len) => {
          cy.get('td button')
            .eq(len - 1)
            .click()
            .get('ul li')
            .contains('CANCELED')
            .first()
            .click({ force: true })
            .get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
        })
    })

    it('should check if status changed to CANCELED', () => {
      cy.get('td button span svg')
        .last()
        .should('have.attr', 'style', 'color: rgb(248, 111, 111);')
    })
  })

  describe('Pending Status Test', () => {
    it('should change status to PENDING', () => {
      cy.get('td button')
        .its('length')
        .then((len) => {
          cy.get('td button')
            .eq(len - 1)
            .click()
            .get('ul li')
            .contains('PENDING')
            .first()
            .click({ force: true })
            .get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
        })
    })

    it('should check if status changed to PENDING', () => {
      cy.get('td button span svg')
        .last()
        .should('have.attr', 'style', 'color: rgb(86, 146, 236);')
    })
  })

  describe('Expired Status Test', () => {
    it('should change status to EXPIRED', () => {
      cy.get('td button')
        .its('length')
        .then((len) => {
          cy.get('td button')
            .eq(len - 1)
            .click()
            .get('ul li')
            .contains('EXPIRED')
            .first()
            .click({ force: true })
            .get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
        })
    })

    it('should check if status changed to EXPIRED', () => {
      cy.get('td button span svg')
        .last()
        .should('have.attr', 'style', 'color: rgb(254, 189, 112);')
    })
  })

  describe('Done Status Test', () => {
    it('should change status to DONE', () => {
      cy.get('td button')
        .its('length')
        .then((len) => {
          cy.get('td button')
            .eq(len - 1)
            .click()
            .get('ul li')
            .contains('DONE')
            .first()
            .click({ force: true })
            .get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
        })
    })

    it('should check if status changed to DONE', () => {
      cy.get('td button span svg')
        .last()
        .should('have.attr', 'style', 'color: rgb(147, 225, 113);')
    })
  })
})