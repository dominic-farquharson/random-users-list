import { GetUsersResponse } from "@/services/randomUserApi.types";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export interface UserDetailProps {
  user: GetUsersResponse["results"][0];
  handleBackBtnClick: () => void;
}

export const UserDetail: React.FC<UserDetailProps> = (props) => {
  const fullName = [
    props.user.name.title,
    props.user.name.first,
    props.user.name.last,
  ].join(" ");

  return (
    <>
      <Button
        sx={{
          my: 2,
        }}
        variant="text"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={props.handleBackBtnClick}
      >
        View all users
      </Button>
      <Card
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          width: {
            _: '100%',
            md: 'max-content'
          },
          p: 5,
        }}
      >
        <Avatar
          alt={fullName}
          src={props.user.picture.large}
          sx={{
            width: 200,
            height: 200,
            mr: 4,
          }}
        />
        <Box
          sx={{
            flexDirection: "column",
          }}
        >
          <Typography component={"h1"} variant="h4">
            {fullName}
          </Typography>
          <Typography>
            {new Date(props.user.dob.date).toLocaleDateString()}
          </Typography>
          <Typography>{props.user.dob.age} years old</Typography>
          <Divider />
          <Box flexDirection={"column"}>
            <Typography fontWeight={"bold"}>Address:</Typography>
            <Typography>
              {props.user.location.street.number}&nbsp;
              {props.user.location.street.name}
            </Typography>
            <Typography>
              {`${props.user.location.city}, ${props.user.location.state} ${props.user.location.postcode}`}
            </Typography>
            <Typography>{props.user.location.country}</Typography>
          </Box>
          <Divider />
          <Box flexDirection={"column"}>
            <Typography fontWeight={"bold"}>Contact info:</Typography>
            <a href={`mailto:${props.user.email}`}>
              <Typography>{props.user.email}</Typography>
            </a>
            <a href={`tel:${props.user.phone}`}>
              <Typography>{props.user.phone}</Typography>
            </a>
          </Box>
        </Box>
      </Card>
    </>
  );
};
