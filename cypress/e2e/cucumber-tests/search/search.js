import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
cy.on("uncaught:exception", (err, runnable) => {
  return false;
});
Given("User navigates to the Home Page of Reed", () => {
  cy.visit(Cypress.env("prodURL"));
  cy.contains("I Accept", { matchCase: false }).click();
});

When(
  "User enters {string} and {string} and hit the Search button",
  (jobtitle, location) => {
    cy.get('input[id*="keywords"]').eq(1).type(jobtitle);
    cy.get('input[id*="location"]').eq(1).type(location);
    cy.get("#homepageSearchButton", { timeout: 4000 }).click();
  }
);

Then(
  "User should see Engineer Keyword in the search result page headings",
  () => {
    cy.get("#server-results").each(($el) => {
      const searchHeadingResultsText = $el
        .find("h2.job-result-heading__title")
        .text();
      const locationText = $el
        .find("ul > li.job-metadata__item--location")
        .text();
      expect(searchHeadingResultsText).to.contain("Engineer");
      expect(locationText).to.contain("London");
    });
  }
);

When("User enters jobtitle and location and hit the Search button", (table) => {
  table.hashes().forEach((row) => {
    cy.get('input[id*="keywords"]').eq(1).type(row.jobtitle);
    cy.get('input[id*="location"]').eq(1).type(row.location);
    cy.get("#homepageSearchButton", { timeout: 4000 }).click();
  });
});
When("User applies the job filter", () => {
  cy.intercept(
    "https://www.reed.co.uk/jobs/engineer-jobs-in-south-west-london?parentsector=financial-services&format=json"
  ).as("Apicall");
  cy.get(
    'a[href="/jobs/engineer-jobs-in-south-west-london?parentsector=financial-services"]',
    { timeout: 2000 }
  ).click();
  cy.wait("@Apicall");
});
Then(
  "User should see the Financial Services Job Count Filter same as of Total Jobs Count",
  () => {
    cy.get('[data-card="search"]').each(($el) => {
      var financialServicesJobCount = $el.find(".selected > .count").text();
      var totalJobCount = $el.find(".col-sm-11 > .count").text();
      var financialServicesCount = financialServicesJobCount.substring(1, 3);
      expect(financialServicesCount).to.eql(totalJobCount);
    });
  }
);
