import React from "react";
import { render, screen } from "@testing-library/react";
import Alert from "./index";

describe("Alert", () => {
  const setup = (props) => {
    const initialProps = {
      message: "",
      success: false,
    };

    const combinedProps = {
      ...initialProps,
      ...props,
    };

    render(<Alert {...combinedProps} />);
  };

  it("does not render where there is no message passed in ", () => {
    setup();

    expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
  });

  it("renders with the correct classname when success is truthy", () => {
    setup({ message: "some message", success: true });

    const alert = screen.getByTestId("alert");

    expect(alert).toBeVisible();
    expect(alert).toHaveClass("success");
  });

  it("renders with the correct classname when success is falsy", () => {
    setup({ message: "some message" });

    const alert = screen.getByTestId("alert");

    expect(alert).toBeVisible();
    expect(alert).toHaveClass("error");
  });
});
