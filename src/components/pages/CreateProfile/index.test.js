import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../../contexts/AuthContext";
import CreateProfile from "../../../components/pages/CreateProfile/index";

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
    <MemoryRouter>
      <UserContext.Provider value={loggedInProviderProps}>
        <CreateProfile />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

it("renders with the create profile form when a user is logged in", () => {
  setup();

  const outer = screen.getByTestId("create-profile");
  const form = within(outer).getByLabelText("Your Name");
  const spinner = screen.queryByTestId("spinner");

  expect(form).toBeVisible();
  expect(spinner).not.toBeInTheDocument();
});

it("displays a loading spinner when a user is not logged in", () => {
  render(
    <UserContext.Provider value={loggedOutProviderProps}>
      <CreateProfile />
    </UserContext.Provider>
  );

  const spinner = screen.getByTestId("spinner");
  const outer = screen.queryByTestId("create-profile");

  expect(spinner).toBeVisible();
  expect(outer).not.toBeInTheDocument();
});
