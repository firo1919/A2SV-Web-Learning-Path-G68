import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../app/page";

describe("Home", () => {
	it("renders the welcome message", () => {
		const HomeComponent = Home();
		render(HomeComponent as React.ReactElement);

		expect(screen.getByText(/Wellcome Home/i)).toBeInTheDocument();
	});

	it("applies the correct classes", () => {
		render(<Home />);

		const div = screen.getByText(/Wellcome Home/i);
		expect(div).toHaveClass("text-center");
		expect(div).toHaveClass("font-extrabold");
		expect(div).toHaveClass("text-2xl");
		expect(div).toHaveClass("pt-20");
	});
});
