
let totalNumOfAppointments;

describe('Appointment Page - Delete Appointment Test', () => {
    before(() => {
        cy.visit('http://localhost:3000/appointments')
    })

    it('should delete appointment', () => {
        cy.get('td button')
            .get('[id="basic-button"]')
            .its('length')
            .then((len) => {
                totalNumOfAppointments = len
                cy.get('td button')
                    .get('[id="basic-button"]')
                    .first()
                    .click()
                    .get('ul li')
                    .contains('Delete')
                    .click({ force: true })
                    .get('[type=button]')
                    .contains('Yes')
                    .click({force:true})
                    .get('[class="swal-title"]')
                    .should('contain', 'Success')
                    .get('[class="swal-button swal-button--confirm"]')
                    .contains('OK')
                    .click()
            })

    })

    it('should check if an appointment has been deleted', () => {
        cy.visit('http://localhost:3000/appointments')
        .get('td button')
        .get('[id="basic-button"]')
        .its('length')
        .should('not.equal', totalNumOfAppointments)
    })
})