Feature: Generate Bill


    Scenario: A patient wants to generate their bill and as a staff, I want to check if the bill has been generated
    Given that I am on the appointments page
    When i click the generate bill button
    Then I will enter <amount>
    And I will enter <paymentTerm>
    Then I will submit 
    And check in the bills page if the bill was indeed generated