/* eslint-disable import/first */
import RegisterScreen from "./registerScreen";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";

const mockAddUser = jest.fn().mockImplementation(() => ({}));

jest.doMock("../../services/DBService", () => ({
  addUser: mockAddUser,
}));

const mockedUsedNavigate = jest.fn();
jest.doMock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

it("Should render a container with a form with name, email and password and a button to Register", async () => {
  render(
    <Router>
      <RegisterScreen />
    </Router>
  );

  const emailInput = screen.getByLabelText(/Email/);
  const passwordInput = screen.getByLabelText(/Password/);
  const nameInput = screen.getByLabelText(/Name/);
  const submitBtn = screen.getByRole("button", { name: /Register/ });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();
});

