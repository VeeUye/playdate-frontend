import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CreateEventForm from "./index";
import CreateProfileForm from "./index";

const axios = require("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
}));

describe("CreateProfileForm", () => {
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
      history: {},
    };

    const combinedProps = {
      ...initialProps,
      ...props,
    };
    render(
      <MemoryRouter>
        <CreateProfileForm {...combinedProps} />
      </MemoryRouter>
    );
  };

  it("updates the name field with the correct user input", () => {
    setup();
    const nameField = screen.getByLabelText("Your Name");

    fireEvent.change(nameField, { target: { value: "Crabbo" } });

    expect(nameField.value).toContain("Crabbo");
  });

  it("updates the description field with the correct user input", () => {
    setup();

    const aboutField = screen.getByLabelText("About You");

    fireEvent.change(aboutField, {
      target: { value: "I'm a little crabbo" },
    });

    expect(aboutField.value).toContain("I'm a little crabbo");
  });

  it("updates the location field with the correct user input", () => {
    setup();

    const locationField = screen.getByLabelText("Location");

    fireEvent.change(locationField, { target: { value: "Springfield" } });

    expect(locationField.value).toContain("Springfield");
  });

  it("submits the form when the the Create Profile button is clicked and redirects to the profile page", async () => {
    setup();

    const button = screen.getByRole("button", { name: "Create Profile" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(historyMock.push).toHaveBeenCalledWith("/my-profile");
    });
  });

  xit("it calls the post event endpoint with the correct payload", async () => {
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
