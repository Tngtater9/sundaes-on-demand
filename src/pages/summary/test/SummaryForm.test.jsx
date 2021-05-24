/** @format */

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

afterEach(cleanup);
/* button Confirm order
  checkbox I agree to Terms and Comditions*/
describe("initial conditions are met", () => {
  test("By default the checkbox is unchecked", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    expect(checkbox).not.toBeChecked();
  });
  test("By default button is disabled", () => {
    render(<SummaryForm />);

    const button = screen.getByRole("button", { name: "Confirm order" });

    expect(button).toBeDisabled();
  });
});

describe("user flow", () => {
  test("button is enabled when checkbox is checked", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: "Confirm order" });

    fireEvent.click(checkbox);

    expect(button).toBeEnabled();

    fireEvent.click(checkbox);

    expect(button).toBeDisabled();
  });
});
