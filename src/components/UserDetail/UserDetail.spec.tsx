import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockUsers } from "../__mocks__/mockUsers";
import { UserDetail, UserDetailProps } from "./UserDetail";
import userEvent from "@testing-library/user-event";

const mockUser = mockUsers[0];
const mockProps: UserDetailProps = {
  handleBackBtnClick: jest.fn(),
  user: mockUser
};

const setup = (props = mockProps) => render(<UserDetail {...props} />);

describe(UserDetail, () => {
  it("renders user details", () => {
    setup();

    expect(screen.getByText("Mrs Fabiola Armas")).toBeInTheDocument();
    expect(screen.getByText("67 years old")).toBeInTheDocument();
    expect(screen.getByText("447 Peatonal Jalisco")).toBeInTheDocument();
    expect(screen.getByText("11/15/1956")).toBeInTheDocument();
  });

  it("calls handler when back button is clicked", async () => {
    setup();

    expect(mockProps.handleBackBtnClick).toHaveBeenCalledTimes(0);

    const btn = screen.getByText(/view all users/i);
    await userEvent.click(btn);

    expect(mockProps.handleBackBtnClick).toHaveBeenCalledTimes(1);
  });
});
