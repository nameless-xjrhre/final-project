Feature: Delete Appointment

    Scenario: As a staff, I want to delete an appointment and check if an appointment is deleted

    Given that I am in the appointments page
    When I click an appointment
    And click the delete button
    Then the appointment will be deleted
    And an appointment will be removed in the appointment list