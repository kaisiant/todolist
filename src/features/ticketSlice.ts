import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TicketStatus } from "@/constants";
import { isDarkMode } from "@/utils";

type SetTicketsPayload = Ticket[];

type CreateTicketStatusPayload = {
  title: string;
};

type UpdateTicketDetailsPayload = {
  id: number;
  title: string;
  desc: string;
  status: TicketStatus;
};

type UpdateTicketStatusPayload = {
  id: number;
  newStatus: TicketStatus;
};

export type Ticket = {
  id: number;
  title: string;
  desc?: string;
  status: TicketStatus;
};

const initialState = {
  tickets: [] as Ticket[],
  isDark: isDarkMode,
  counter: 1,
};

export const playerSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<SetTicketsPayload>) => {
      state.tickets = action.payload;
    },
    createTicket: (state, action: PayloadAction<CreateTicketStatusPayload>) => {
      state.tickets.push({
        id: state.counter,
        title: action.payload.title,
        status: TicketStatus.InProgress,
      });
      state.counter++;
    },
    updateTicketDetails: (
      state,
      action: PayloadAction<UpdateTicketDetailsPayload>,
    ) => {
      const ticketIdx = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id,
      );
      if (ticketIdx > -1) {
        state.tickets[ticketIdx] = action.payload;
      }
    },
    updateTicketStatus: (
      state,
      action: PayloadAction<UpdateTicketStatusPayload>,
    ) => {
      const ticket = state.tickets.find(
        (ticket) => ticket.id === action.payload.id,
      );
      if (ticket) {
        ticket.status = action.payload.newStatus;
      }
    },
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const {
  setTickets,
  createTicket,
  updateTicketDetails,
  updateTicketStatus,
  toggleDarkMode,
} = playerSlice.actions;

export default playerSlice.reducer;
