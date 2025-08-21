import { Box } from "@mui/material";
import { useAppSelector } from "../../app/hook";
import type { Ticket } from "../../types/ticket";
import type { RootState } from "../../app/store";
import Board from "../Board";
import { STATUS } from "../../constants/ticket";

const HomePage = () => {
  const tickets = useAppSelector((state: RootState) => state.tickets.value);

  const filteredTickets = tickets.reduce(
    (acc, ticket) => {
      acc[ticket.status].push(ticket);
      return acc;
    },
    { todo: [], doing: [], done: [] } as Record<string, Ticket[]>
  );

  return (
    <Box display="flex" justifyContent="space-around">
      <Board label={STATUS.TODO} tickets={filteredTickets.todo} />
      <Board label={STATUS.DOING} tickets={filteredTickets.doing} />
      <Board label={STATUS.DONE} tickets={filteredTickets.done} />
    </Box>
  );
};

export default HomePage;
