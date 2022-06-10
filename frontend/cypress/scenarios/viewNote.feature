Feature: View Note

    Scenario: As a staff, I want to see the note made by the patient before creating the appointment
    Given that I am on the appointment page
    When I click the kebab menu
    And when I hover my pointer on the <viewNote> option
    Then I can see the note made by the patient