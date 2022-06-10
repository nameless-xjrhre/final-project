Feature: Delete A Schedule

    Scenario: As a staff, I want to delete a schedule
        Given that I am on the doctors page
        When I click a schedule
        And I click the delete button
        Then a schedule will be deleted
        And the total number of schedules in the list will be reduced