Feature: Search Functionality
    Background:
        Given User navigates to the Home Page of Reed
    @search
    Scenario Outline: Validate the keyword Engineer is appearing in search listings headings
        When  User enters '<jobtitle>' and '<location>' and hit the Search button
        Then  User should see Engineer Keyword in the search result page headings
        Examples:
            | jobtitle          | location          |
            | Engineer          | South West London |
            | Software Engineer | Central London    |
    @searchwithfilter
    Scenario: Verify the Job Count Number should be equal to the total jobs count after the filter is applied.
        When  User enters jobtitle and location and hit the Search button
            | jobtitle | location          |
            | Engineer | South West London |
        When  User applies the job filter
        Then  User should see the Financial Services Job Count Filter same as of Total Jobs Count