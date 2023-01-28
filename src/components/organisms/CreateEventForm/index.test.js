import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import { UserContext } from "../../../contexts/AuthContext";
import CreateEvent from "../../../components/pages/CreateEvent/index";
import { postEvent, BASE_URL } from "../../../requests/events/postEvent";

const axios = require("axios");

// const mock = new MockAdapter(axios);

describe("CreateEvent", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

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

  const stubbedFields = {
    date_end: "2024-02-02T12:00",
    date_start: "2024-02-01T11:00",
    description: "A lovely description",
    friends_accepted: ["w4mYUJ2A3BLdmfnMctXVx6EDAQQE"],
    friends_invited: ["Mrs Muntz"],
    location: "A lovely location",
    name: "A lovely event name",
    owner: "w4mYUJ2A3BLdmfnMctXVx6EDAQQE",
  };

  const stubbedToken =
    "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiIi…N1YiI6Inc0bVlVSjJBM0JMZG1mbk1jdFhWeDZFREFRUUUifQ.";

  const setup = (props) => {
    const initialProps = {
      history: {},
      initialState: {
        fields: {
          name: "",
          description: "",
          date_start: "",
          date_end: "",
          location: "",
          friends_invited: [],
          owner: "",
        },
        dates: {
          date_start: "",
          date_end: "",
        },
      },
      postEvent: () => {},
      setAlert: () => {},
    };

    const combinedProps = {
      ...initialProps,
      ...props,
    };

    render(
      <MemoryRouter>
        <UserContext.Provider value={loggedInProviderProps}>
          <CreateEvent {...combinedProps} />
        </UserContext.Provider>
      </MemoryRouter>
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

  it("calls the api with the correct body", async () => {
    const setAlert = jest.fn();

    setup();

    mock
      .onPost(`${BASE_URL}/events`, {
        stubbedFields,
        headers: { Authorization: `Bearer ${stubbedToken}` },
      })
      .reply(201);

    await postEvent(stubbedFields, stubbedToken, setAlert);

    expect(mock.history.post.length).toEqual(1);

    expect(JSON.parse(mock.history.post[0].data)).toEqual(stubbedFields);
  });

  xit("returns 'record created successfully' when an event is created", async () => {
    const setAlert = jest.fn();

    setup();

    mock
      .onPost(`${BASE_URL}/events`, {
        stubbedFields,
        headers: { Authorization: `Bearer ${stubbedToken}` },
      })
      .reply(201);

    await postEvent(stubbedFields, stubbedToken, setAlert);

    expect(mock.history.post.length).toEqual(1);

    const result = await postEvent(stubbedFields, stubbedToken, setAlert);
  });
});
