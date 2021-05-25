/** @format */

import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  test("button is enabled when checkbox is checked and disabled when unchecked", () => {
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
  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    //popover starts hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    //popover is revealed when mouse enters checkbox label and is hovered over
    const termsAndConditions = screen.getByText(/terms and conditions/i);

    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );

    expect(popover).toBeInTheDocument();

    //popover disappears when mouse out
    userEvent.unhover(termsAndConditions);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
