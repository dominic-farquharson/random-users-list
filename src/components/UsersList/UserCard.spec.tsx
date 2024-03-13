import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockUsers } from "../__mocks__/mockUsers";
import { UserCard, UserCardProps } from "./UserCard";
import userEvent from "@testing-library/user-event";

const mockUser = mockUsers[0];
const mockProps: UserCardProps = {
  profileImage: mockUser.picture.large,
  age: mockUser.dob.age,
  city: mockUser.location.city,
  id: mockUser.id.value,
  name: mockUser.name,
  onClick: jest.fn(),
};

const setup = (props = mockProps) => render(<UserCard {...props} />);

describe(UserCard, () => {
  it("renders user details", () => {
    setup();

    expect(screen.getByText("Mrs Fabiola Armas")).toBeInTheDocument();
    expect(screen.getByText("Age: 67")).toBeInTheDocument();
    expect(screen.getByText("City: San Pedro")).toBeInTheDocument();
  });

  it("calls handler when Learn more button is clicked", async () => {
    setup();

    expect(mockProps.onClick).toHaveBeenCalledTimes(0);

    const btn = screen.getByText(/Learn more/i);
    await userEvent.click(btn);

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
