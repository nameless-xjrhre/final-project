Feature: Create Appointment With New Patient

    Scenario: A new patient comes in and wants to create an appointment and as a staff, I want to check the patient's appointment in the appointment list

    Given that I am on the appointment page
    When I click the create new appointment
    Then I will enter the patient's <firstName>
    And I will enter the patient's <lastName>
    And I will enter the patient's <gender>
    And I will enter the patient's <contactNumber>
    And I will enter the patient's <dateOfBirth>
    And I will enter the patient's <address>
    Then I will click the next button
    And I will choose the patient's <visitType>
    And I will select the patient's <doctor>
    And I will select the patient's <appointmentDate>
    And I will select the patient's <appointmentTime>
    And I will enter the patient's <note> or reason for the appointment
    Then I will click the Book Now button
    And I will check the patient's appointment in the appointment list