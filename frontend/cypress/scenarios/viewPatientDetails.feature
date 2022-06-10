Feature: View Patient Details

    Scenario: I want to view the patient's details and check if the records exists
        Given that I am on the patient page
        When I click the kebab menu on a patient
        And I click the view patient details button
        Then the page will redirect to the records of the patient
        And will check if the records exist