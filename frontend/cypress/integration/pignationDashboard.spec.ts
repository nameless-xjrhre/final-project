describe('Dashboard - Pignation Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/dashboard')
  })
  it('should go to the next page if there are more than 1 pignation', () => {
    cy.get(
      '[class="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-outlined MuiPaginationItem-rounded MuiPaginationItem-outlinedPrimary Mui-selected MuiPaginationItem-page css-r93niq-MuiButtonBase-root-MuiPaginationItem-root"]',
    ).click()
  })
  it('pignation should have only 10 rows max', () => {
    cy.get('[class="MuiTableBody-root css-apqrd9-MuiTableBody-root"]').should(
      'have.length.at.most',
      10,
    )
  })
})
