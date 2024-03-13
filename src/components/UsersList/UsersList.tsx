import { UsersGrid, UsersGridProps } from "@/components/UsersList/UsersGrid";
import {
  Box,
  Pagination,
  PaginationProps,
  Typography,
} from "@mui/material";
import { TOTAL_PAGES } from "@/constants/constants";
import React from "react";

export interface UsersListProps extends UsersGridProps {
  handlePageChange: PaginationProps["onChange"];
  defaultPage?: PaginationProps["defaultPage"];
}

export const UsersList: React.FC<UsersListProps> = (props) => {
  return (
    <>
      <Typography
        sx={{
          my: 2,
        }}
        variant="h4"
        component={"h1"}
      >
        Users
      </Typography>
      <UsersGrid users={props.users} setUserDetail={props.setUserDetail} />
      {!!props.users.length && (
        <Box
          data-testid="pagination"
          sx={{
            my: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={TOTAL_PAGES}
            variant="outlined"
            shape="rounded"
            onChange={props.handlePageChange}
            page={props.defaultPage}
          />
        </Box>
      )}
    </>
  );
};
