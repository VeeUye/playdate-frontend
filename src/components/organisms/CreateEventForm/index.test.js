import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { UserContext } from "../../../contexts/AuthContext";
import CreateEvent from "../../../components/pages/CreateEvent/index";

describe("CreateEvent", () => {
  const nameField = () => screen.getByLabelText("Event Name");
  const descriptionField = () => screen.getByLabelText("Description");
  const startDateField = () => screen.getByLabelText("Start");
  const endDateField = () => screen.getByLabelText("End");
  const locationField = () => screen.getByLabelText("Location");
  const inviteField = () => screen.getByTestId("invite-friends");

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

  const setup = () => {
    render(
      <UserContext.Provider value={loggedInProviderProps}>
        <CreateEvent />
      </UserContext.Provider>
    );
  };

  it("renders with the create event form with the correct fields when a user is logged in", () => {
    setup();

    const outer = screen.getByTestId("create-event-outer");
    const form = within(outer).getByLabelText("Event Name");
    const spinner = screen.queryByTestId("spinner");

    expect(form).toBeVisible();
    expect(spinner).not.toBeInTheDocument();

    expect(nameField()).toBeVisible();
    expect(descriptionField()).toBeVisible();
    expect(startDateField()).toBeVisible();
    expect(endDateField()).toBeVisible();
    expect(locationField()).toBeVisible();
    expect(inviteField()).toBeVisible();
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

  it("updates the name field with the correct user input", () => {
    setup();

    const nameField = screen.getByPlaceholderText("Event name");

    fireEvent.change(nameField, { target: { value: "Mr Burns" } });

    expect(nameField.value).toContain("Mr Burns");
  });

  it("updates the description field with the correct user input", () => {
    setup();

    const descriptionField = screen.getByPlaceholderText("Event name");

    fireEvent.change(descriptionField, {
      target: { value: "A jaunt by the power station" },
    });

    expect(descriptionField.value).toContain("A jaunt by the power station");
  });

  it("updates the location field with the correct user input", () => {
    setup();

    const locationField = screen.getByPlaceholderText("Event name");

    fireEvent.change(locationField, { target: { value: "Springfield" } });

    expect(locationField.value).toContain("Springfield");
  });

  xit("updates the start and end fields with the correct user input", () => {});

  xit("submits the form with the correct event data", () => {});
});
