import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Ticket } from "../../types/ticket";
import { Edit } from "@mui/icons-material";
import { useAppDispatch } from "../../app/hook";
import { removeTicket } from "../../features/ticket/ticketSlice";
import { useNavigate } from "react-router";
import { FORM_MODE } from "../../constants/ticket";

const Ticket = ({ id, title, description, priority, status }: Ticket) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/tickets/${id}`, {
      state: {
        mode: FORM_MODE.UPDATE,
        id,
        title,
        description,
        priority,
        status,
      },
    });
  };

  const handleDelete = () => {
    dispatch(removeTicket({ id }));
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
          <Chip
            label={priority}
            color="primary"
            sx={{ marginTop: 2, textTransform: "capitalize" }}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton aria-label="edit" color="primary" onClick={handleUpdate}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default Ticket;
