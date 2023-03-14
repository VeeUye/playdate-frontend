import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CreateEventForm from "./index";

const axios = require("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
}));

describe("CreateEventForm", () => {
  let mock;
  let historyMock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    historyMock = { push: jest.fn() };
    useHistory.mockReturnValue(historyMock);

    mock.reset();
  });

  afterEach(() => {
    mock.reset();
  });

  const stubbedOptions = [
    { value: "FaoLwxoE2ub6qYMZRACNiNEth9OH", label: "Chief Wiggum" },
    { value: "t0fvq3bA77Z7X3F1a7LkeCOBipne", label: "Ned Flanders" },
    { value: "5B7vtdeoWXWtjdE69cNZoMM35tDz", label: "Mrs Muntz" },
    { value: "IjGY7FYdqX6KbJ0yaje1qfPQLAJX", label: "Luann Van Houten" },
    { value: "hUt11WDzxEYMvT3Tyh9kGm1JVaHw", label: "Mrs Powell" },
  ];

  const stubbedFields = {
    name: "A lovely event name",
    description: "A lovely description",
    date_start: "2024-02-01T11:00",
    date_end: "2024-02-02T12:00",
    location: "A lovely location",
    friends_invited: ["Chief Wiggum", "Luann Van Houten"],
    owner: 123,
    friends_accepted: [123],
  };

  const setup = (props) => {
    const initialProps = {
      user: {
        uid: 123,
      },
      token: "im-a-little-token",
      friends: stubbedOptions,
      history: {},
    };

    const combinedProps = {
      ...initialProps,
      ...props,
    };
    render(
      <MemoryRouter>
        <CreateEventForm {...combinedProps} />
      </MemoryRouter>
    );
  };

  const nameField = () => screen.getByLabelText("Event Name");
  const descriptionField = () => screen.getByLabelText("Description");
  const startDateField = () => screen.getByLabelText("Start");
  const endDateField = () => screen.getByLabelText("End");
  const locationField = () => screen.getByLabelText("Location");

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

  it("it removes a friend from state when a friend option is unclicked", async () => {
    setup();

    const button = screen.getByRole("button", { name: "Create Event" });

    fireEvent.change(nameField(), { target: { value: stubbedFields.name } });
    fireEvent.change(descriptionField(), {
      target: { value: stubbedFields.description },
    });
    fireEvent.change(startDateField(), {
      target: { value: stubbedFields.date_start },
    });
    fireEvent.change(endDateField(), {
      target: { value: stubbedFields.date_end },
    });
    fireEvent.change(locationField(), {
      target: { value: stubbedFields.location },
    });

    const inviteSelect = screen.getByRole("combobox");

    fireEvent.click(inviteSelect);

    const options = screen.getAllByRole("option");

    fireEvent.click(options[0]);
    fireEvent.click(options[3]);
    fireEvent.click(options[0]);

    fireEvent.click(button);

    expect(mock.history.post.length).toEqual(1);

    expect(mock.history.post[0].data).toEqual(
      JSON.stringify({
        ...stubbedFields,
        friends_invited: ["Luann Van Houten"],
      })
    );
  });

  it("submits the form when the the Create Event button is clicked and redirects to the profile page", async () => {
    setup();

    const button = screen.getByRole("button", { name: "Create Event" });

    fireEvent.change(nameField(), { target: { value: stubbedFields.name } });
    fireEvent.change(descriptionField(), {
      target: { value: stubbedFields.description },
    });
    fireEvent.change(startDateField(), {
      target: { value: stubbedFields.date_start },
    });
    fireEvent.change(endDateField(), {
      target: { value: stubbedFields.date_end },
    });
    fireEvent.change(locationField(), {
      target: { value: stubbedFields.location },
    });

    const inviteSelect = screen.getByRole("combobox");

    fireEvent.click(inviteSelect);

    const options = screen.getAllByRole("option");

    fireEvent.click(options[0]);
    fireEvent.click(options[3]);

    fireEvent.click(button);

    await waitFor(() => {
      expect(historyMock.push).toHaveBeenCalledWith("/my-profile");
    });
  });

  it("it calls the post event endpoint with the correct payload", async () => {
    setup();

    const button = screen.getByRole("button", { name: "Create Event" });

    fireEvent.change(nameField(), { target: { value: stubbedFields.name } });
    fireEvent.change(descriptionField(), {
      target: { value: stubbedFields.description },
    });
    fireEvent.change(startDateField(), {
      target: { value: stubbedFields.date_start },
    });
    fireEvent.change(endDateField(), {
      target: { value: stubbedFields.date_end },
    });
    fireEvent.change(locationField(), {
      target: { value: stubbedFields.location },
    });

    const inviteSelect = screen.getByRole("combobox");

    fireEvent.click(inviteSelect);

    const options = screen.getAllByRole("option");

    fireEvent.click(options[0]);
    fireEvent.click(options[3]);

    fireEvent.click(button);

    expect(mock.history.post.length).toEqual(1);

    expect(mock.history.post[0].data).toEqual(JSON.stringify(stubbedFields));
  });
});
