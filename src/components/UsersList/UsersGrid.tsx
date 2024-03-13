import { GetUsersResponse } from "@/services/randomUserApi.types";
import {
  Grid,
} from "@mui/material";
import { UserCard } from "./UserCard";
import React from "react";

export interface UsersGridProps {
  users: GetUsersResponse["results"];
  setUserDetail: React.Dispatch<React.SetStateAction<GetUsersResponse["results"][0] | null>>
}

export const UsersGrid: React.FC<UsersGridProps> = (props) => {
  return (
    <Grid container spacing={3}>
      {props.users.map((el) => {
        return (
          <Grid item xs={12} md={6} lg={4} key={el.login.uuid}>
            <UserCard
              age={el.dob.age}
              profileImage={el.picture.large}
              city={el.location.city}
              name={el.name}
              id={el.login.uuid}
              onClick={() => props.setUserDetail(el)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
