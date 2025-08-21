import { Box, Button, Typography } from "@mui/material";
import TicketComponent from "../Ticket";
import type { Ticket } from "../../types/ticket";
import { useNavigate } from "react-router";
import { FORM_MODE } from "../../constants/ticket";

interface BoardProps {
  label: string;
  tickets: Ticket[];
}

const Board = ({ label, tickets }: BoardProps) => {
  const navigate = useNavigate();

  const handleAddTicket = () => {
    navigate("/add-ticket", {
      state: { board: label, mode: FORM_MODE.CREATE },
    });
  };

  return (
    <Box
      component="section"
      sx={{
        border: 1,
        width: "30%",
        height: "97vh",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "grey.100",
          zIndex: 1,
          padding: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          textTransform="capitalize"
          margin={0}
        >
          {label}
        </Typography>
        <Button size="small" color="primary" onClick={handleAddTicket}>
          Add
        </Button>
      </Box>
      {tickets.map((ticket) => (
        <TicketComponent key={ticket.id} {...ticket} />
      ))}
    </Box>
  );
};

export default Board;
