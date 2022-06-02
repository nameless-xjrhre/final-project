describe('Appointment Page - Create Appointment With Patient Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/appointments')
  })

  it('should input patient name', () => {
    cy.get('[data-testid=AddIcon]')
      .last()
      .trigger('mouseover')
      .get('[data-testid=AddBoxSharpIcon]')
      .click()
      .get('[name=firstName]')
      .click()
      .type('Ayato')
      .get('[name=lastName]')
      .click()
      .type('Kamisato')
  })

  it('should input contact info', () => {
    cy.get('[name=contactNum]').click().type('09273877110')
  })

  it('should select gender', () => {
    cy.get('[value=MALE]').click()
  })

  it('should input date of birth', () => {
    cy.get('[name=dateOfBirth]')
      .click()
      .type('10/06/2000')
      .clear()
      .type('09/28/2000')
  })

  it('should input address', () => {
    cy.get('[name=address]').click().type('Narukami, Inazuma')
  })

  it('should click next button', () => {
    cy.get('[type=submit]').contains('Next').click()
  })

  it('should click back button', () => {
    cy.get('[type=button]').contains('Back').click().wait(5000)
  })

  it('should click next button again', () => {
    cy.get('[type=submit]').contains('Next').click()
  })

  it('should select visit type', () => {
    cy.get('[id=mui-component-select-visitType]')
      .click()
      .get('[data-value=ROUTINE]')
      .click()
  })

  it('should select medical staff', () => {
    cy.get('[id=mui-component-select-medicalStaff]')
      .click()
      .get('[data-value=6]')
      .click()
  })

  it('should input date', () => {
    cy.get('[name=appointmentDate]')
      .click()
      .type('10/06/2022')
      .clear()
      .type('10/30/2022')
  })

  it('should input appointment time', () => {
    cy.get('[name=appointmentTime]').click().type('10:30')
  })

  it('should input note', () => {
    cy.get('[name=note]').click().type('Sleep deprived')
  })

  it('should book appointment', () => {
    cy.get('[type=submit]').contains('Book Now').click().wait(5000)
  })

  it('should display confirmation message', () => {
    cy.get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })

})
