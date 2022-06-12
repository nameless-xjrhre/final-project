let totalNumberOfSchedules

describe('Doctors Page - Delete A Schedule Test', () => {
  before(() => {
    cy.visit('doctors')
  })

  it('should delete a schedule', () => {
    cy.get('[class="css-zgbp5c-MuiStack-root"]')
      .its('length')
      .then((len) => {
        totalNumberOfSchedules = len
        cy.get('[class="css-zgbp5c-MuiStack-root"]')
          .eq(len - 2)
          .click()
          .get(
            '[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-x8xom5-MuiButtonBase-root-MuiMenuItem-root"]',
          )
          .should('exist')
          .and('contain', 'Delete')
          .click()
          .get('[type=button]')
          .last()
          .contains('Yes')
          .click()
      })
  })

  it('should check if a schedule was deleted', () => {
    cy.visit('doctors')
      .get('[class="css-zgbp5c-MuiStack-root"]')
      .should('be.visible')
      .its('length')
      .then((len) => {
        if (totalNumberOfSchedules > len) {
          assert.isAbove(totalNumberOfSchedules, len, 'A schedule was deleted')
        } else {
          assert.equal(
            totalNumberOfSchedules,
            len,
            'A schedule was not deleted',
          )
        }
      })
  })
})
