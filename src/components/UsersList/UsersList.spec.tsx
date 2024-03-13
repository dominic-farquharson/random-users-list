import "@testing-library/jest-dom";
import { UsersList, UsersListProps } from "./UsersList";
import { cleanup, render, screen } from "@testing-library/react";
import { mockUsers } from "../__mocks__/mockUsers";

const mockProps: UsersListProps = {
  handlePageChange: jest.fn(),
  setUserDetail: jest.fn(),
  users: mockUsers,
};

const setup = (props = mockProps) => render(<UsersList {...props} />);

describe(UsersList, () => {
  it("renders page heading", () => {
    setup();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("renders list of users", () => {
    setup();

    mockUsers.forEach((user) => {
      const fullName = [user.name.title, user.name.first, user.name.last].join(
        " "
      );

      expect(screen.getByText(fullName)).toBeInTheDocument();
      expect(screen.getByTitle(fullName)).toBeInTheDocument();
      expect(screen.getByText(`Age: ${user.dob.age}`)).toBeInTheDocument();
    });
  });

  it("renders pagination section when users are present", () => {
    setup();

    expect(screen.getByTestId("pagination")).toBeInTheDocument();

    cleanup();

    setup({
      ...mockProps,
      users: [],
    });
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });
});
