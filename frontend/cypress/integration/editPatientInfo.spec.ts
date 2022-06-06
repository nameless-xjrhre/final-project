import { fakeDataRandomizer, patientRandomizer, genderStringRandomizer} from "../fixtures/randomizer"
const fakeData = require('../fixtures/fakeData.json')
const fakeDataProps = fakeData.listOfObjects

describe('Patient Page - Edit Patient Info Test', () => {
  before(() => {
    cy.visit('http://localhost:3000/patients')
  })

  it('should edit name of patient', () => {
    cy.get('[id="basic-button"]')
      .wait(3000)
      .eq(patientRandomizer())
      .click()
      .get('[role="menuitem"]')
      .contains('Edit')
      .click({ force: true })
      .get('[name=firstName]')
      .last()
      .click()
      .type(fakeDataProps[fakeDataRandomizer()].firstName)
      .get('[name=lastName]')
      .last()
      .click()
      .type(fakeDataProps[fakeDataRandomizer()].lastName)
  })

  it('should input contact number', () => {
    cy.get('[name=contactNum]').last().click().type(fakeDataProps[fakeDataRandomizer()].contactNum)
  })

  it('should select gender', () => {
    cy.get('[class="MuiRadio-root MuiRadio-colorPrimary MuiButtonBase-root MuiRadio-root MuiRadio-colorPrimary PrivateSwitchBase-root css-vqmohf-MuiButtonBase-root-MuiRadio-root"]')
    .get('[value='+ genderStringRandomizer() + ']')
    .last()
    .click()
  })

  it('should input address', () => {
    cy.get('[name=address]').last().click().type(fakeDataProps[fakeDataRandomizer()].address)
  })

  it('should input date of birth', () => {
    cy.get('[name=dateOfBirth]')
      .last()
      .click()
      .type(fakeDataProps[fakeDataRandomizer()].dateOfBirth)
      .clear()
      .type(fakeDataProps[fakeDataRandomizer()].dateOfBirth)
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
