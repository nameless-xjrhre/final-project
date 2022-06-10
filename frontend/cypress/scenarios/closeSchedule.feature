Feature: Close A Schedule

    Scenario: A doctor wants to close his/her schedule and check if the schedule was indeed closed
        Given that I am on the doctors page
        When I click a schedule
        And click the close button
        Then the schedule will change into a red color to signify that the schedule is indeed closed