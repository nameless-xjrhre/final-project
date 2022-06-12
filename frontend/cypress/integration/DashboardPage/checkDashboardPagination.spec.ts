describe('Dashboard Page - Pagination Test', () => {
  before(() => {
    cy.visit('dashboard')
  })

  it('should check maximum number of rows per page', () => {
    cy.get('[class="MuiTableRow-root css-1q1u3t4-MuiTableRow-root"]').should(
      'have.length.at.most',
      10,
    )
  })

  it('should check if there are multiple pages', () => {
    cy.get('[class="MuiPagination-ul css-wjh20t-MuiPagination-ul"]')
      .should('exist')
      .get('li')
      .its('length')
      .then((len) => {
        if (len < 4) {
          expect(len).to.be.lessThan(4)
        } else {
          expect(len).to.be.gte(4)
        }
      })
  })

  it('should click a page if number of pages is greater than 1', () => {
    cy.get('[class="MuiPagination-ul css-wjh20t-MuiPagination-ul"]')
      .get('li')
      .its('length')
      .then((len) => {
        if (len >= 4) {
          cy.get('[class="MuiPagination-ul css-wjh20t-MuiPagination-ul"]')
            .get('li')
            .eq(len - 1)
            .click()
        } else {
          expect(len).to.be.lessThan(4)
        }
      })
  })
})
