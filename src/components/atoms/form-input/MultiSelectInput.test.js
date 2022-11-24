import React from "react";
import { render, screen } from "@testing-library/react";
import selectEvent from "react-select-event";
import Select from "react-select";

describe("MultiSelectInput", () => {
  it("displays the users current invitable friends", async () => {
    // setUp();

    const mockOptions = [
      { value: "FaoLwxoE2ub6qYMZRACNiNEth9OH", label: "Chief Wiggum" },
      { value: "t0fvq3bA77Z7X3F1a7LkeCOBipne", label: "Ned Flanders" },
      { value: "5B7vtdeoWXWtjdE69cNZoMM35tDz", label: "Mrs Muntz" },
      { value: "IjGY7FYdqX6KbJ0yaje1qfPQLAJX", label: "Luann Van Houten" },
      { value: "hUt11WDzxEYMvT3Tyh9kGm1JVaHw", label: "Mrs Powell" },
    ];

    render(
      <form data-testid="form">
        <label htmlFor="invite">Invite</label>
        <Select options={mockOptions} name="invite" inputId="invite" isMulti />
      </form>
    );

    expect(screen.getByTestId("form")).toHaveFormValues({}); // empty select

    await selectEvent.select(screen.getByLabelText("Invite"), [
      "Chief Wiggum",
      "Ned Flanders",
    ]);
    expect(screen.getByTestId("form")).toHaveFormValues({
      invite: ["FaoLwxoE2ub6qYMZRACNiNEth9OH", "t0fvq3bA77Z7X3F1a7LkeCOBipne"],
    });
  });
});
