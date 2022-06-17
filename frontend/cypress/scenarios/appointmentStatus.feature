Feature: Appointment Status

    Scenario: A patient wants to cancel their appointment and as a staff, i want to change the status of the appointment as canceled

    Given that I am in the dashboard page
    When I click the status button of a particular patient
    Then that patient's appointment will be canceled
    And a success alert will pop up

    Scenario: A patient's appointment was done and as a staff, I want to change the status of the appointment as done

    Given that I am in the dashboard page
    When I click the status button of a particular patient
    Then that patient's appointment will be marked done
    And a success alert will pop up

    Scenario: A patient's appointment was pending and as a staff, I want to change the status of the appointment as pending

    Given that I am in the dashboard page
    When I click the status button of a particular patient
    Then that patient's appointment will be marked pending
    And a success alert will pop up

    Scenario: A patient's appointment was expired and as a staff, I want to change the status of the appointment as expired

    Given that I am in the dashboard page
    When I click the status button of a particular patient
    Then that patient's appointment will be marked expired
    And a success alert will pop up