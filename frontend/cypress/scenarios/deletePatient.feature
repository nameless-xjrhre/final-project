Feature: Delete Patient

    Scenario: I want to delete the records of a patient and check if the records do not exist anymore
    Given that I am on the patient page
    When I click the kebab menu
    And I click the delete button
    Then the records of the patient will be deleted
    And the total number of patients in the list will be reduced