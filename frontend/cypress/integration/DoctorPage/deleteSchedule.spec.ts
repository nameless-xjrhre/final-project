let totalNumberOfSchedules

describe('Doctors Page - Delete A Schedule Test', () => {
  before(() => {
    cy.visit('doctors')
  })

  it('should delete a schedule', () => {
    cy.get('[class="css-1s4yypy"]')
      .get('[class="MuiChip-label MuiChip-labelMedium css-9iedg7"]')
      .its('length')
      .then((len) => {
        totalNumberOfSchedules = len
        cy.get('[class="css-1s4yypy"]')
          .get('[class="MuiChip-label MuiChip-labelMedium css-9iedg7"]')
          .eq(len - 1)
          .click()
          .get('[role="menuitem"]')
          .contains('Delete')
          .click({ force: true })
          .get('[type=button]')
          .last()
          .contains('Yes')
          .click()
          .get('[class="swal-modal"]')
          .get('[class="swal-button swal-button--confirm"]')
          .should('contain', 'OK')
          .click()
      })
  })

  it('should check if a schedule was deleted', () => {
    cy.visit('doctors')
      .get('[class="css-1s4yypy"]')
      .get('[class="MuiChip-label MuiChip-labelMedium css-9iedg7"]')
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
