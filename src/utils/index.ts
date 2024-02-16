import type { DraggableLocation } from "@hello-pangea/dnd";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { TicketStatus } from "@/constants";
import { Ticket } from "@/features/ticketSlice";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type ReorderQuoteMapArgs = {
  tickets: Ticket[];
  source: DraggableLocation;
  destination: DraggableLocation;
};
export const reorderQuoteMap = ({
  tickets,
  source,
  destination,
}: ReorderQuoteMapArgs): Ticket[] => {
  const current: Ticket[] = tickets.filter(
    (ticket) => ticket.status === source.droppableId,
  );
  const next: Ticket[] = tickets.filter(
    (ticket) => ticket.status === destination.droppableId,
  );
  const others: Ticket[] = tickets.filter(
    (ticket) =>
      ticket.status !== destination.droppableId &&
      ticket.status !== source.droppableId,
  );

  const target: Ticket = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Ticket[] = reorder(
      current,
      source.index,
      destination.index,
    );

    return [...reordered, ...others];
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, {
    ...target,
    status: destination.droppableId as TicketStatus,
  });

  return [...current, ...next, ...others];
};
