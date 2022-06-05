describe('Appointments - Pignation Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/appointments')
  })
  it('should go to the next page if there are more than 1 pignation', () => {
    cy.get(
      '[class="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-outlined MuiPaginationItem-rounded MuiPaginationItem-outlinedPrimary MuiPaginationItem-page css-r93niq-MuiButtonBase-root-MuiPaginationItem-root"]',
    ).click()
  })
  it('pignation should have only 10 rows max', () => {
    cy.get('[class="MuiTable-root css-rqglhn-MuiTable-root"]').should(
      'have.length.at.most',
      10,
    )
  })
})
