Feature: Project creation

Scenario: I initialize a project in an empty directory
    Given I have a working directory
    When I create a project
    Then I should be able to build the project
    Then I should be able to info the project
