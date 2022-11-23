import React from "react";
import MultiSelectInput from "./MultiSelectInput";
import { render, screen } from "@testing-library/react";

describe("MultiSelectInput", () => {
  const setUp = (props) => {
    const initialProps = {
      name: "multi-select",
      label: "Invite",
      options: [
        { value: "FaoLwxoE2ub6qYMZRACNiNEth9OH", label: "Chief Wiggum" },
        { value: "t0fvq3bA77Z7X3F1a7LkeCOBipne", label: "Ned Flanders" },
      ],
      placeholder: "Select...",
      onChange: jest.fn(),
    };

    const combinedProps = {
      initialProps,
      ...props,
    };

    render(<MultiSelectInput {...combinedProps} />);
  };

  it("displays the users current invitable friends", () => {
    setUp();
  });
});
