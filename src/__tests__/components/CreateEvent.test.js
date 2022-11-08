import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CreateEvent from "../../components/create-event/CreateEvent";
import { AuthContextProvider } from "../../contexts/AuthContext";

describe("CreateEvent", () =>  {


  it.only("displays the correct title", async () => {
    const setUp = (props) => {

      const initialProps = {
        token: 'im-a-little-token',
        friends: ['john', 'sue'],
        user: {
          uid: 'LZIMMnxKuoQbktQbs82ZsrZProq1',
        },
      }

      const mergedProps = {
        props,
        ...initialProps,
      }

      render(
        <AuthContextProvider>
          <CreateEvent {...mergedProps} />
        </AuthContextProvider>
      );
    }



await waitFor(()=> {

const title = screen.getByTestId('title')

})

  });
});

describe("Create Event Form", () => {
  xit("displays the Event Name field ", () => {
    render(<CreateEvent />);

    expect(screen.getByLabelText("Event Name")).toBeVisible();

    expect(screen.getByLabelText("Date")).toBeVisible();

    expect(screen.getByLabelText("Time")).toBeVisible();

    expect(screen.getByLabelText("Location")).toBeVisible();

    expect(screen.getByLabelText("Invite")).toBeVisible();
  });
});

describe("Create Event Button", () => {
  xit("displays a sign in button", () => {
    render(<CreateEvent />);

    const signInButton = screen.getByRole("button", { name: /create event/i });

    expect(signInButton).toHaveTextContent(/create event/i);
  });



});




