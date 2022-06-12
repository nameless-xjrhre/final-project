Feature: Edit Patient Information

    Scenario: A patient wants to fully update his/her information. As a staff, I will check if the details were indeed edited
        Given that I am on the patient page
        When I click the kebab menu on a patient
        And click the edit button
        Then i will update the <firstName>
        And I will update the <lastName>
        And I will update the <contactNumber>
        And i will update the <gender>
        And I will update the <dateOfBirth>
        And I will update the <address>
        Then I will save the changes
        And check in the patient list if the records were indeed updated
