describe('App', () => {
  it('should visit doctors page', () => {
    cy.visit('http://localhost:3000/')
    cy.get(
      '*[class^="MuiListItemButton-root MuiListItemButton-gutters MuiButtonBase-root css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root"]',
    ).click({
      multiple: true,
    })
    cy.url().should('include', '/doctors')
  })
})
