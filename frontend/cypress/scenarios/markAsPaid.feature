Feature: Mark As Paid

    Scenario: I want to mark a bill as paid and check if a bill is changed into paid status
        Given that I am on the bills page
        When I click the kebab menu
        Then I click the <markAsPaid> button
        And check if the bill was changed into paid status