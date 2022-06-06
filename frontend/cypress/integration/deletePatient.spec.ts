describe('Patient Page - Delete Patient Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/patients')
    })

    it('should delete patient', () => {
        cy.get('[id="basic-button"]').eq(0).click()
            .get('[role="menuitem"]').last().contains('Delete').click()
            .get('[type=button]').last().contains('Yes').click()
            .wait(5000)
    })
    
    it('should display confirmation message', () => {
    cy.get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })
})