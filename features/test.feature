Feature: Test command

Scenario: Tests should pass
  Given I have a working directory
  Given I have the fixture app_with_passing_tests in the working directory
  Then I install the fixture dependencies
  Then I should be able to run test successfully in the working directory
