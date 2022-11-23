import React from "react";
import MultiSelectInput from "./MultiSelectInput";
import { render, screen } from "@testing-library/react";

describe("MultiSelectInput", () => {
  it("displays the user's current friends", () => {
    render(<MultiSelectInput />);
  });
});
