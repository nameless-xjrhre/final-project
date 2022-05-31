describe('Appointment Page - Create Appointment With Patient Test', () => {
    it('should input patient name', () => {
        cy.visit('http://localhost:3000/appointments')
        .get('[data-testid=AddIcon]').last().trigger('mouseover')
        .get('[data-testid=AddBoxSharpIcon]').click()
        .get('[name=firstName]').click().type('Edmel John')
        .get('[name=lastName]').click().type('Linaugo')
    }) 

    it('should input contact info', ()=>{
        cy.get('[name=contactNum]').click().type('09273877110')
    })

    it('should select gender',()=>{
        cy.get('[value=MALE]').click()
    })

    //Test fails if clearing the date field
    it('should input date of birth',()=>{
        cy.get('[name=dateOfBirth]').click().type('10/06/2000')
    })

    it('should input address', ()=>{
        cy.get('[name=address]').click().type('Lambunao, Iloilo')
    })

    it('should click next button', ()=>{
        cy.get('[type=submit]').contains('Next').click()
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
        cy.get('[name=appointmentDate]').click().type('10/06/2022').clear().type('10/30/2022')
    })

    it('should input appointment time',()=>{
        cy.get('[name=appointmentTime]').click().type('08:30')
    })

    it('should input note',()=>{
        cy.get('[name=note]').click().type('Sore throat, red eyes')
    })

     it('should book appointment',()=>{
        cy.get('[type=button]').contains('Book Now').click()
    })
    
})