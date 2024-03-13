import { Name } from "@/services/randomUserApi.types";
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";


export interface UserCardProps {
  profileImage: string;
  name: Name;
  age: number;
  city: string;
  id: string;
  onClick: () => void
};

export const UserCard = (props: UserCardProps) => {
  const fullName = [props.name.title, props.name.first, props.name.last].join(
    " "
  );

  return (
    <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={props.onClick}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.profileImage}
        title={fullName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {props.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          City: {props.city}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};