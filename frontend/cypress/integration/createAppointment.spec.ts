describe('Appointment Page - Create Appointment Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/appointments')
  })

  it('should select patient', () => {
    cy.get('[data-testid=AddIcon]')
      .last()
      .trigger('mouseover')
      .get('[data-testid=CalendarMonthIcon]')
      .click()
      .get('[id=mui-component-select-patient]')
      .click()
      .get('[name=patient]')
      .last()
      .click()
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
      .type('10/01/2022')
  })

  it('should input time', () => {
    cy.get('[name=appointmentTime]').click().type('09:30')
  })

  it('should input note', () => {
    cy.get('[name=note]').click().type('Sore throat, red eyes')
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
