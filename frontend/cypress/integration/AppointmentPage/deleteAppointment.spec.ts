
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
                cy.get('ul li button')
                    .its('length')
                    .then((len) => {
                        if (len >= 4) {
                            cy.get('ul li button')
                                .eq(len - 2)
                                .click()
                                .get('td button')
                                .get('[id="basic-button"]')
                                .its('length')
                                .then((len) => {
                                    totalNumOfAppointments = totalNumOfAppointments + len
                                })
                        }
                        cy.get('td button')
                            .get('[id="basic-button"]')
                            .first()
                            .click()
                            .get('ul li')
                            .contains('Delete')
                            .click({ force: true })
                            .get('[type=button]')
                            .contains('Yes')
                            .click({ force: true })
                    })

            })

    })

    it('should check if an appointment has been deleted', () => {
        cy.visit('http://localhost:3000/appointments')
            .get('ul li button')
            .its('length')
            .then((len) => {
                if (len >= 4) {
                    cy.get('ul li button')
                        .eq(len - 2)
                        .click()
                }
                cy.get('td button')
                    .get('[id="basic-button"]')
                    .should('be.visible')
                    .its('length')
                    .should('be.lessThan', totalNumOfAppointments)
            })
    })
})