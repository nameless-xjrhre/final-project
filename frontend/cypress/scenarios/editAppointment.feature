Feature: Edit Appointment

   Scenario: As a staff, I want to edit a patient's appointment and check if the appointment was really edited
   Given that I am on the appointment page
   When I click on the edit appointment button of a patient
   Then I will change the patient's <visitType>
   And I will change the patient's <doctor>
   And I will change the patient's <appointmentDate>
   And I will change the patient's <appointmentTime>
   And I will change the patient's <note> for the appointment 
   Then I will click the Save Changes button
   And check the appointment list to see if the appointment is really edited