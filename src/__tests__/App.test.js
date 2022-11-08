import React from 'react'
import { render, screen } from "@testing-library/react";
import App from "../components/App";
import { AuthContextProvider } from "../contexts/AuthContext";



it("displays the playdate header", () => {
  render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
  expect(screen.getByText('Playdate')).toBeVisible();
});
