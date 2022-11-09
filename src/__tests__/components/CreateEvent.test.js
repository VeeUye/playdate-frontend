import React from "react";
import { render, screen } from "@testing-library/react";
import CreateEvent from "../../components/create-event/CreateEvent";
import { UserContext } from "../../contexts/AuthContext";

describe("CreateEvent", () => {
  it("renders the Create Event page when a user is logged in", () => {
    const providerProps = {
      user: {
        uid: 1234,
      },
      token: "Im-a-little-token",
    };

    render(
      <UserContext.Provider value={providerProps}>
        <CreateEvent />
      </UserContext.Provider>
    );
    expect(screen.getByText(/Description/)).toBeVisible();
  });
});
