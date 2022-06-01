describe('Patient Page - Edit Patient Info Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/patients')
  })

  it('should edit name of patient', () => {
    cy.get('[id="basic-button"]')
      .eq(3)
      .click()
      .get('[role="menuitem"]')
      .contains('Edit')
      .click({ force: true })
      .get('[name=firstName]')
      .last()
      .click()
      .type('Remcon')
      .get('[name=lastName]')
      .last()
      .click()
      .type('Baizhu')
  })

  it('should input contact number', () => {
    cy.get('[name=contactNum]').last().click().type('09273877110')
  })

  it('should select gender', () => {
    cy.get('[value="MALE"]').last().click()
  })

  it('should input address', () => {
    cy.get('[name=address]').last().click().type('Qingce, Liyue')
  })

  it('should input date of birth', () => {
    cy.get('[name=dateOfBirth]')
      .last()
      .click()
      .type('10/06/2000')
      .clear()
      .type('01/17/2000')
  })

  it('should save changes', () => {
    cy.get('[type=button]').last().contains('Save Changes').click().wait(5000)
  })

  it('should display confirmation message', () => {
    cy.get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })
})
