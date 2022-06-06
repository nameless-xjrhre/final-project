import {patientRandomizer} from '../fixtures/randomizer'

describe('Dashboard Page - Cancel Appointment Test', () =>{
    before(()=>{
        cy.visit('http://localhost:3000/dashboard')
        
    })

    it('should cancel appointment',()=>{
        cy.get('[id="basic-button"]')
        .eq(patientRandomizer())
        .wait(3000)
        .click()
    })

    it('should check if status changed', ()=>{
        cy.get('[class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButtonBase-root button-text css-1xnvccj-MuiButtonBase-root-MuiButton-root"]')
        .should('have.attr','status', 'CANCELED')
    })

    it('should display confirmation message', () => {
        cy.get('[class="swal-title"]')
            .should('contain', 'Success')
            .get('[class="swal-button swal-button--confirm"]')
            .contains('OK')
            .click()
    })
})