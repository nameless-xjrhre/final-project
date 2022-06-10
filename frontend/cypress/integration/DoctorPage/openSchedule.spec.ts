describe('Doctors Page - Open A Schedule Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/doctors')
  })

  it('should open a schedule', () => {
    cy.get(
      '[class="MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-clickable MuiChip-clickableColorDefault MuiChip-filledDefault css-1n7jwnc-MuiButtonBase-root-MuiChip-root"]',
    )
      .last()
      .click()
      .get('[value="OPEN"]')
      .last()
      .click()
  })

  it('should check change in color', () => {
    cy.get('.css-j4zylg-MuiButtonBase-root-MuiChip-root').should(
      'have.css',
      'background-color',
      'rgb(87, 231, 153)',
    )
      .get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })
})
