import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../../contexts/AuthContext";
import CreateEvent from "../../../components/pages/CreateEvent/index";

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

it("renders with the create event form when a user is logged in", () => {
  setup();

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
