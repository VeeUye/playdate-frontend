import React from "react";
import { render, screen, within } from "@testing-library/react";
import CreateEvent from "../../../components/pages/CreateEvent/index";
import { UserContext } from "../../../contexts/AuthContext";

describe("CreateEvent", () => {
  const loggedInProviderProps = {
    user: {
      uid: 1234,
    },
    token: "Im-a-little-token",
  };

  const loggedOutProviderProps = {
    user: {},
    token: "",
  };

  it("renders the Create Event page when a user is logged in", () => {
    render(
      <UserContext.Provider value={loggedInProviderProps}>
        <CreateEvent />
      </UserContext.Provider>
    );

    const outer = screen.getByTestId("create-event-outer");
    const form = within(outer).getByLabelText("Event Name");
    const spinner = screen.queryByTestId("spinner");

    expect(form).toBeVisible();
    expect(spinner).not.toBeInTheDocument();
  });

  it("displays a loading spinner when a user is not logged in", () => {
    render(
      <UserContext.Provider value={loggedOutProviderProps}>
        <CreateEvent />
      </UserContext.Provider>
    );

    const spinner = screen.getByTestId("spinner");
    const outer = screen.queryByTestId("create-event-outer");

    expect(spinner).toBeVisible();
    expect(outer).not.toBeInTheDocument();
  });
});
