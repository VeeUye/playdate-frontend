import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../../contexts/AuthContext";
import { BASE_URL } from "../../../requests/profile/getProfile/getMyProfile";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import EditProfile from "./index";

describe("EditProfile", () => {
  const mockAdapter = new MockAdapter(axios);

  beforeEach(() => {
    mockAdapter.reset();
  });

  const loggedInProviderProps = {
    user: {
      uid: 1234,
    },
    token: "Im-a-little-token",
  };

  const stubbedResponse = {
    imgUrl: "https://example.com/profile.jpg",
    children: ["Bart", "Lisa", "Maggie"],
    name: "Homer Simpson",
    description: "Homers description",
    location: "Springfield Power Plant",
    userId: "1234",
    friends: [
      "FaoLwxoE2ub6qYMZRACNiNEth9OH",
      "t0fvq3bA77Z7X3F1a7LkeCOBipne",
      "hUt11WDzxEYMvT3Tyh9kGm1JVaHw",
      "IjGY7FYdqX6KbJ0yaje1qfPQLAJX",
      "5B7vtdeoWXWtjdE69cNZoMM35tDz",
    ],
  };

  const setUp = () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={loggedInProviderProps}>
          <EditProfile />
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  it("renders the Edit Profile page when the user is logged in", async () => {
    mockAdapter
      .onGet(`${BASE_URL}/users/${loggedInProviderProps.user.uid}`)
      .reply(200, stubbedResponse);

    setUp();

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(screen.getByTestId("edit-profile-page")).toBeVisible();
    });
  });
});
