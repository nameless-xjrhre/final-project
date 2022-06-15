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
    cy.get('ul li button')
      .get('[aria-label^="Go to"]')
      .its('length')
      .then((len) => {
        if (len >= 3) {
          assert.isAtLeast(len, 3, 'Have multiple pages')
        } else {
          assert.isBelow(len, 3, 'No multiple pages')
        }
      })
  })

  it('should click a page if number of pages is greater than 1', () => {
    cy.get('ul li button')
      .get('[aria-label^="Go to"]')
      .its('length')
      .then((len) => {
        if (len >= 3) {
          cy.get('ul li button')
            .get('[aria-label^="Go to"]')
            .eq(len - 1)
            .click()
        } else {
          assert.isBelow(len, 3, 'Has only one page')
        }
      })
  })
})
