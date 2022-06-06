describe('Appointments Page - Pagination Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/appointments')
  })

  it('should check maximum number of rows per page', () => {
    cy.get('[class="MuiTableRow-root css-1q1u3t4-MuiTableRow-root"]').should(
      'have.length.at.most',
      10,
    )
  })

  it('should check if there are multiple pages', () => {
    cy.get('[class="MuiPagination-ul css-wjh20t-MuiPagination-ul"]')
      .get('li')
      .should('have.length.gte', 4)
  })

  it('should click a page if number of pages is greater than 1', () => {
    cy.get('[class="MuiPagination-ul css-wjh20t-MuiPagination-ul"]')
      .get('li')
      .eq(2)
      .click()
  })
})
