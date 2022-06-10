Feature: Open A Schedule

    Scenario: A doctor wants to open a schedule that is previously labeled as canceled or not available. As a staff, I want to check if the schedule indeed became open
        Given that I am on the doctors page
        When i click a schedule
        And I click the open button
        Then the schedule will change color into green which means that the schedule is open