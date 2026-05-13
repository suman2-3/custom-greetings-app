import { render, screen } from "@testing-library/react";
import App from "./App";
import UserProvider from "./context/UserContext";

test("renders the login screen", () => {
  render(
    <UserProvider>
      <App />
    </UserProvider>,
  );

  expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /email/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /guest/i })).toBeInTheDocument();
});
