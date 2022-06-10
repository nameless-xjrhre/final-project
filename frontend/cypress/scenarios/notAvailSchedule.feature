Feature: Change Schedule Status to Not Available

    Scenario: A doctor cannot accommodate patients
        at a certain schedule. Therefore, he/she is not available on that schedule.
        As a staff, I will check the schedule if it changed color to signify that the schedule is not available

        Given that I am on the doctors page
        When I click a schedule
        And click the not available button
        Then the schedule will change color into gray which means that the schedule becomes unavailable