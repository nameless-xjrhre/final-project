let totalNumberOfSchedules;

describe('Doctors Page - Delete A Schedule Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/doctors')
  })

  it('should delete a schedule', () => {
    cy.get('[class="css-zgbp5c-MuiStack-root"]')
      .its('length')
      .then((len) => {
        totalNumberOfSchedules = len
        cy.get('[class="css-zgbp5c-MuiStack-root"]')
          .eq(len - 1)
          .click()
          .get(
            '[class="MuiMenuItem-root MuiMenuItem-gutters MuiButtonBase-root css-x8xom5-MuiButtonBase-root-MuiMenuItem-root"]',
          )
          .should('contain', 'Delete')
          .click()
          .get('[type=button]')
          .last()
          .contains('Yes')
          .click()
      })
  })

  it('should check if a schedule was deleted', () => {
    cy.visit('http://localhost:3000/doctors')
      .get('[class="css-zgbp5c-MuiStack-root"]')
      .its('length')
      .then((len)=>{
        cy.get('[class="css-zgbp5c-MuiStack-root"]')
        .should('have.length', len)
        .and('have.length.lessThan', totalNumberOfSchedules)
      })
  })
})
