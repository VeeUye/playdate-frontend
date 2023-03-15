import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useHistory, MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
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
    name: "Crabbo",
    description: "I'm a little crabbo",
    children: ["Maggie", "Lisa", "Bart"],
    location: "Springfield",
    friends: ["firstFriend"],
    userId: 123,
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

  const nameField = () => screen.getByLabelText("Your Name");
  const aboutField = () => screen.getByLabelText("About You");
  const childrenField = () => screen.getByLabelText("Child/Children's name");
  const locationField = () => screen.getByLabelText("Location");

  it("updates the name field with the correct user input", () => {
    setup();

    fireEvent.change(nameField(), { target: { value: "Crabbo" } });

    expect(nameField().value).toContain("Crabbo");
  });

  it("updates the description field with the correct user input", () => {
    setup();

    fireEvent.change(aboutField(), {
      target: { value: "I'm a little crabbo" },
    });

    expect(aboutField().value).toContain("I'm a little crabbo");
  });

  it("updates the children field with the correct user input", () => {
    setup();

    fireEvent.change(childrenField(), {
      target: { value: "Maggie, Lisa, Bart" },
    });

    expect(childrenField().value).toContain("Maggie, Lisa, Bart");
  });

  it("updates the location field with the correct user input", () => {
    setup();

    fireEvent.change(locationField(), { target: { value: "Springfield" } });

    expect(locationField().value).toContain("Springfield");
  });

  it("submits the form when the the Create Profile button is clicked and redirects to the profile page", async () => {
    setup();

    fireEvent.change(nameField(), { target: { value: "Crabbo" } });
    fireEvent.change(aboutField(), {
      target: { value: "I'm a little crabbo" },
    });
    fireEvent.change(childrenField(), {
      target: { value: "Maggie, Lisa, Bart" },
    });
    fireEvent.change(locationField(), { target: { value: "Springfield" } });

    const button = screen.getByRole("button", { name: "Create Profile" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(historyMock.push).toHaveBeenCalledWith("/my-profile");
    });
  });

  it("it calls the post event endpoint with the correct payload", async () => {
    setup();

    const button = screen.getByRole("button", { name: "Create Profile" });

    fireEvent.change(nameField(), { target: { value: "Crabbo" } });
    fireEvent.change(aboutField(), {
      target: { value: "I'm a little crabbo" },
    });
    fireEvent.change(childrenField(), {
      target: { value: "Maggie, Lisa, Bart" },
    });
    fireEvent.change(locationField(), { target: { value: "Springfield" } });

    fireEvent.click(button);

    expect(mock.history.post.length).toEqual(1);

    expect(mock.history.post[0].data).toEqual(JSON.stringify(stubbedFields));
  });
});
