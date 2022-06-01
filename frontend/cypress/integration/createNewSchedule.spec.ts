describe('Doctor Page - Create New Schedule Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/doctors')
  })

  it('should select doctor', () => {
    cy.get('[aria-label="SpeedDial basic example"]')
      .trigger('mouseover')
      .get('[aria-label="Create New Schedule"]')
      .click()
      .get('[id=mui-component-select-medicalStaff]')
      .click()
      .get('[data-value=7]')
      .click()
  })

  it('should select days', () => {
    cy.get('[class=" css-1kwwvb1-ValueContainer2"]')
      .click()
      .type('Mon{enter}')
      .get('[aria-label="Remove Mon"]')
      .click()
      .get('[class=" css-1kwwvb1-ValueContainer2"]')
      .click()
      .type('Wed{enter}')
      .type('Fri{enter}')
      .click()
  })

  it('should input start and end time', () => {
    cy.get('[name=startTime]')
      .click()
      .type('10:30')
      .get('[name=endTime]')
      .click()
      .type('12:00')
  })

  it('should press add schedule button', () => {
    cy.get('[type=submit]').contains('Create Schedule').click().wait(5000)
  })

  it('should display confirmation message', () => {
    cy.get('[class="swal-title"]')
      .should('contain', 'Success')
      .get('[class="swal-button swal-button--confirm"]')
      .contains('OK')
      .click()
  })
})
