Feature: Create New Schedule

    Scenario: A doctor wants to create a new schedule and check if the created schedule exists in the list of schedules
        Given that I am on the doctors page
        When I click the create new schedule button
        And I enter the <medicalStaff>
        And I enter the <days>
        And I enter the <startTime>
        And I enter the <endTime>
        And I submit the form
        Then a new schedule will reflect on the list of schedules in the doctors page