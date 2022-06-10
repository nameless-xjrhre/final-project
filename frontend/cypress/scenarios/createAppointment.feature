Feature: Create Appointment

    Scenario: An existing patient wants to create an appointment
    
    Given that I am in the appointment page
    When I click the create appointment button
    Then I will find the patient's <name> 
    And I will input what kind of <visitType> they are
    And I will select their doctor's <name>
    And I will select or type the <appointmentData>
    And i will select or type the <appointmentTime>
    And I will enter their <note> or reason for the appointment
    Then i will submit the form 
    And I will check if the patient's <name> is on the appointment list