/* eslint-disable testing-library/no-node-access */

describe("Navigation", () => {
	it("should navigate to the joblist page and add bookmark", () => {
		// Start from the index page
		cy.visit("http://localhost:3000/");

		// The new url should include "/login"
		cy.url().should("include", "/login");

		cy.get('input[name="email"]').type("kumaol.assefa-ug@aau.edu.et");
		cy.get('input[name="password"]').type("1234567");
		cy.get('button[type="submit"][name="login"]').click();

		cy.url().should("include", "/");

		// Find a link with an href attribute containing "joblist" and click it
		cy.get('a[href*="joblist"]').click();

		// The new url should include "/joblist"
		cy.url().should("include", "/joblist");

		// The new page should contain an h1 with "Opportunities"
		cy.get("h1").contains("Opportunities");

		cy.get('[data-testid="jobcontainer"]').should("exist");
		cy.get('[data-testid="jobcontainer"]').first().contains("Volunteer");
		cy.get('[data-testid="jobcontainer"]')
			.first()
			.find('[data-testid="bookmarkbtn"]')
			.should("exist")
			.should("have.class", "text-gray-400")
			.click()
			.should("have.class", "text-orange-300");
	});
	it("should navigate to the joblist page and remove a bookmark", () => {
		// Start from the index page
		cy.visit("http://localhost:3000/");

		// The new url should include "/login"
		cy.url().should("include", "/login");

		cy.get('input[name="email"]').type("kumaol.assefa-ug@aau.edu.et");
		cy.get('input[name="password"]').type("1234567");
		cy.get('button[type="submit"][name="login"]').click();

		cy.url().should("include", "/");

		// Find a link with an href attribute containing "joblist" and click it
		cy.get('a[href*="joblist"]').click();

		// The new url should include "/joblist"
		cy.url().should("include", "/joblist");

		// The new page should contain an h1 with "Opportunities"
		cy.get("h1").contains("Opportunities");

		cy.get('[data-testid="jobcontainer"]').should("exist");
		cy.get('[data-testid="jobcontainer"]').first().contains("Volunteer");
		cy.get('[data-testid="jobcontainer"]')
			.first()
			.find('[data-testid="bookmarkbtn"]')
			.should("exist")
			.should("have.class", "text-orange-300")
			.click()
			.should("have.class", "text-gray-400");
	});
});
