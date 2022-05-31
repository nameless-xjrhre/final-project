describe('Appointment Page - Create Appointment Test', () => {

    it('should select patient', () => {
        cy.visit('http://localhost:3000/appointments')
        .get('[data-testid=AddIcon]').last().trigger('mouseover')
        .get('[data-testid=CalendarMonthIcon]').click()
        .get('[id=mui-component-select-patient]').click()
        .get('[data-value=5]').click()
    }) 

    it('should select visit type', () => {
        cy.get('[id=mui-component-select-visitType]').click()
        .get('[data-value=ROUTINE]').click()
    })

    it('should select medical staff', () => {
        cy.get('[id=mui-component-select-medicalStaff]').click()
        .get('[data-value=5]').click()      
    })

    it('should input date', ()=>{
        cy.get('[name=appointmentDate]').click().type('10/06/2022').clear().type('10/01/2022')
    })

    it('should input time', ()=>{
        cy.get('[name=appointmentTime]').click().type('09:30')
    })

    it('should input note',()=>{
        cy.get('[name=note]').click().type('Sore throat, red eyes')
    })

    it('should book appointment',()=>{
        cy.get('[type=button]').contains('Book Now').click()
    })
})