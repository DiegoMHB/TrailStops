/* eslint-disable import/first */
import LoginScreen from "./loginScreen";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";

const mockGetUser = jest.fn().mockImplementation(() => ({
  _id: "abcd",
  email: "dmhb17@gmail.com",
}));

jest.doMock("../../services/DBService", () => ({
  getUser: mockGetUser,
}));
const mockedUsedNavigate = jest.fn();
jest.doMock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login Screen", () => {
  it("Should create an element with a form, and a link to Register", async () => {
    render(
      <Router>
        <LoginScreen />
      </Router>
    );

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitBtn = screen.getByRole("button", { name: /Login/ });
    const Register = screen.getByText(/Don't have an account\? Register/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(Register).toBeInTheDocument();
  });
});
