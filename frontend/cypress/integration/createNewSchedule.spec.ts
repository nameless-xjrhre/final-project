describe('Doctor Page - Create New Schedule Test', () => {
  it('should select doctor', () => {
    cy.visit('http://localhost:3000/doctors')
      .get('[aria-label="SpeedDial basic example"]')
      .trigger('mouseover')
      .get('[aria-label="Create New Schedule"]')
      .click()
      .get('[id=mui-component-select-medicalStaff]')
      .click()
      .get('[data-value=5]')
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
      .type('07:30')
      .get('[name=endTime]')
      .click()
      .type('09:00')
  })

  it('should press add schedule button', () => {
    cy.get('[type=submit]').contains('Create Schedule').click()
  })
})
