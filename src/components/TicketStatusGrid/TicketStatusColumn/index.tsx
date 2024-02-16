import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableStateSnapshot,
  DroppableProvided,
  Droppable,
} from "@hello-pangea/dnd";

import { ReactNode, memo } from "react";

import { TicketStatus, TicketStatusColor } from "@/constants";
import { Ticket } from "@/features/ticketSlice";
import { cn } from "@/utils";

import TicketItem, { TicketItemProps } from "../TicketItem";

export type TicketStatusColumnProps = {
  label: string;
  labelClassName?: string;
  icon?: ReactNode;
  status: TicketStatus;
  tickets: Ticket[];
  itemProps?: Partial<TicketItemProps>;
};

const TicketStatusColumn = ({
  label,
  labelClassName,
  icon,
  status,
  tickets,
  itemProps,
}: TicketStatusColumnProps) => {
  const currentStatusTickets = tickets.filter(
    (ticket) => ticket.status === status,
  );

  return (
    <div className="min-w-full flex-1 self-baseline rounded bg-white shadow-sm dark:bg-gray-900 lg:min-w-0">
      <div
        className={cn(
          "flex justify-center space-x-2 border-b-2 border-gray-100 p-4 font-semibold uppercase dark:border-gray-800",
          labelClassName,
        )}
      >
        {icon}
        <span>
          {label} ({currentStatusTickets.length})
        </span>
      </div>
      <Droppable droppableId={status}>
        {(
          dropProvided: DroppableProvided,
          dropSnapshot: DroppableStateSnapshot,
        ) => (
          <ul
            className={cn("space-y-2 px-4 py-2 pb-6 lg:min-h-40 lg:space-y-4", {
              [TicketStatusColor[status].dropContainerBgClassName]:
                dropSnapshot.isDraggingOver &&
                !dropSnapshot.draggingFromThisWith,
            })}
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {/* ---- */}
            {/* IMPORTANT: Below empty div is to solve the flickering when dnd to first
            position */}
            <div />
            {/* ---- */}
            {currentStatusTickets.map((ticket, index) => (
              <Draggable
                key={ticket.id}
                draggableId={ticket.id.toString()}
                index={index}
              >
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot,
                ) => {
                  return (
                    <TicketItem
                      key={ticket.id}
                      ticket={ticket}
                      draggableProvided={provided}
                      draggableSnapshot={snapshot}
                      {...itemProps}
                    />
                  );
                }}
              </Draggable>
            ))}

            {dropProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

const MemorizedTicketStatusColumn = memo(TicketStatusColumn);
export default MemorizedTicketStatusColumn;
