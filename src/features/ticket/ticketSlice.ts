import { createSlice } from "@reduxjs/toolkit";
import type { Ticket } from "../../types/ticket";

type TicketState = {
  value: Ticket[];
};

const initialState: TicketState = {
  value: JSON.parse(localStorage.getItem("tickets") || "[]") as Ticket[],
};

export const { actions, reducer } = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      state.value.push({
        id: Date.now(),
        ...action.payload,
      });

      localStorage.setItem("tickets", JSON.stringify(state.value));
    },
    updateTicket: (state, action) => {
      const index = state.value.findIndex(
        (ticket) => ticket.id === action.payload.id
      );
      if (index === -1) return;

      // Replace entire ticket with new data
      state.value[index] = action.payload;

      localStorage.setItem("tickets", JSON.stringify(state.value));
    },
    removeTicket: (state, action) => {
      state.value = state.value.filter(
        (ticket: Ticket) => ticket.id !== action.payload.id
      );
      localStorage.setItem("tickets", JSON.stringify(state.value));
    },
  },
});

export const { addTicket, updateTicket, removeTicket } = actions;

export default reducer;
