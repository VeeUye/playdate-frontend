import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MultiSelect from "./index";

describe("MultiSelect", () => {
  const stubbedOptions = [
    { value: "FaoLwxoE2ub6qYMZRACNiNEth9OH", label: "Chief Wiggum" },
    { value: "t0fvq3bA77Z7X3F1a7LkeCOBipne", label: "Ned Flanders" },
    { value: "5B7vtdeoWXWtjdE69cNZoMM35tDz", label: "Mrs Muntz" },
    { value: "IjGY7FYdqX6KbJ0yaje1qfPQLAJX", label: "Luann Van Houten" },
    { value: "hUt11WDzxEYMvT3Tyh9kGm1JVaHw", label: "Mrs Powell" },
  ];

  const stubbedInputValue = [
    "Chief Wiggum",
    "Ned Flanders",
    "Luann Van Houten",
  ];

  const setUp = () => {
    const initialProps = {
      friends: stubbedOptions,
      onChange: jest.fn,
      value: stubbedInputValue,
    };

    render(<MultiSelect {...initialProps} />);
  };

  it("renders with the dropdown list initially closed", () => {
    setUp();

    expect(
      screen.getByRole("combobox", { name: "Invite friends:", expanded: false })
    ).toBeTruthy();
  });

  it("opens the dropdown list when the arrow icon is clicked", () => {
    setUp();

    const arrowIcon = screen.getByTestId("arrow-icon");

    fireEvent.click(arrowIcon);

    expect(
      screen.getByRole("combobox", { name: "Invite friends:", expanded: true })
    ).toBeTruthy();
  });
});
