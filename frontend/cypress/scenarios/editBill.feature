Feature: Edit Bill

    Scenario: As a staff, I want to edit the bill of a patient and check if the updated amount and term is reflected in the bills page
        Given that I am in the bills page
        When I click the kebab menu
        And I clicked the edit button
        Then I will enter the <amount> that should be paid by the patient
        And I will enter the <paymentTerm> of the bill
        Then I will save the changes
        And I should be able to see the <amount> and the updated due date based on the <paymentTerm> in the bills page

    Scenario: As a staff, I want to edit the amount that should be paid by the patient and check if the updated amount exists in the bills page
        Given that I am in the bills page
        When I click the kebab menu
        And I clicked the edit button
        And I will enter the <amount> that should be paid by the patient
        Then I will save the changes
        And I should be able to see the updated <amount> in the bills page

    Scenario: As a staff, I want to edit the payment term that should be the basis of the due date of the bill and check if the updated due date is reflect on the bills page
        Given that I am in the bills page
        When I click the kebab menu
        And I clicked the edit button
        Then I will enter the <paymentTerm> of the bill
        And I will save the changes
        Then I should be able to see the updated due date of the bill in the bills page