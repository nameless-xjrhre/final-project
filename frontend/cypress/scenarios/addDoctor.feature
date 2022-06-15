Feature: Add Doctor

    Scenario: I am a new doctor and I want to add and check my name in the list of doctors

    Given that I am in the doctor page
    When I press the add doctor button
    Then I enter my <firstName>
    And I enter my <lastName>
    And I enter my <contactNumber>
    And I enter my <address>
    Then I submit the form
    And I should see my self in the list of doctors