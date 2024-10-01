/* eslint-disable import/first */
import LoginScreen from "./loginScreen";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DBService from "../../services/DBService";
import { MemoryRouter as Router } from "react-router-dom";

jest.mock("../../services/DBService.ts", () => ({
  getUser: () => ({
    email: "dmhb17@gmail.com",
    password: "1234",
    name: "Diego Martin",
    __v: 0,
    _id: "66faad92e892e3db934f4fba",
  }),
}));

const mockedUsedNavigate = jest.fn();

jest.doMock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

it("Should call getUser with the correct credentials", async () => {
  
  const credentials = { email: "dmhb17@gmail.com", password: "1234" };


  render (
    <Router>
      <LoginScreen />
    </Router>
    )

  const emailInput = screen.getByLabelText(/Email/);
  const passwordInput = screen.getByLabelText(/Password/);
  const submitBtn = screen.getByRole("button", { name: /Login/ });

  console.log("Email Input:--------------", emailInput);
  console.log("Password Input:--------------", passwordInput);
  console.log("Submit Button:--------------", submitBtn);

  await userEvent.type(emailInput, credentials.email);
  await userEvent.type(passwordInput, credentials.password);
  await userEvent.click(submitBtn);

  expect(DBService.getUser).toHaveBeenCalledWith(credentials);
});
