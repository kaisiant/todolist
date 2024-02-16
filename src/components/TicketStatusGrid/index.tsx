import {
  DragDropContext,
  DropResult,
  DraggableLocation,
} from "@hello-pangea/dnd";

import { BeakerIcon, CheckIcon, ThumbUpIcon } from "@/assets/icons";
import TicketStatusColumn, {
  TicketStatusColumnProps,
} from "@/components/TicketStatusGrid/TicketStatusColumn";
import { Button } from "@/components/common";
import { TicketStatus, TicketStatusColor } from "@/constants";
import { Ticket, setTickets, updateTicketStatus } from "@/features/ticketSlice";
import { useTypedDispatch, useTypedSelector } from "@/hooks";
import { reorderQuoteMap } from "@/utils";

import { TicketItemProps } from "./TicketItem";

const TicketStatusGrid = () => {
  const tickets = useTypedSelector((state) => state.ticket.tickets);
  const dispatch = useTypedDispatch();

  const updateTicketToNewStatus = (ticket: Ticket, status: TicketStatus) =>
    dispatch(
      updateTicketStatus({
        id: ticket.id,
        newStatus: status,
      }),
    );

  const onDragEnd = (result: DropResult) => {
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation | null = result.destination;

    // dropped nowhere
    if (!destination) {
      return;
    }

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const data = reorderQuoteMap({
      tickets,
      source,
      destination,
    });

    dispatch(setTickets(data));
  };

  const availableStatuses: {
    status: TicketStatus;
    columnProps: Partial<TicketStatusColumnProps>;
    itemProps: Partial<TicketItemProps>;
  }[] = [
    {
      status: TicketStatus.InProgress,
      columnProps: {
        labelClassName:
          TicketStatusColor[TicketStatus.InProgress].labelColorClassName,
        icon: <BeakerIcon />,
      },
      itemProps: {
        renderActionButtons: ({ ticket }) => (
          <>
            <Button
              className={"flex-1"}
              style={{
                color: TicketStatusColor[TicketStatus.Done].color,
                borderColor: TicketStatusColor[TicketStatus.Done].color,
              }}
              variant="outline"
              onClick={() => updateTicketToNewStatus(ticket, TicketStatus.Done)}
            >
              Done
            </Button>
            <Button
              className="flex-1"
              style={{
                color: TicketStatusColor[TicketStatus.Close].color,
                borderColor: TicketStatusColor[TicketStatus.Close].color,
              }}
              variant="outline"
              onClick={() =>
                updateTicketToNewStatus(ticket, TicketStatus.Close)
              }
            >
              Close
            </Button>
          </>
        ),
      },
    },
    {
      status: TicketStatus.Done,
      columnProps: {
        labelClassName:
          TicketStatusColor[TicketStatus.Done].labelColorClassName,
        icon: <CheckIcon />,
      },
      itemProps: {
        renderActionButtons: ({ ticket }) => (
          <>
            <Button
              className="flex-1"
              style={{
                color: TicketStatusColor[TicketStatus.InProgress].color,
                borderColor: TicketStatusColor[TicketStatus.InProgress].color,
              }}
              variant="outline"
              onClick={() =>
                updateTicketToNewStatus(ticket, TicketStatus.InProgress)
              }
            >
              Not Fix
            </Button>
            <Button
              className="flex-1"
              style={{
                color: TicketStatusColor[TicketStatus.Close].color,
                borderColor: TicketStatusColor[TicketStatus.Close].color,
              }}
              variant="outline"
              onClick={() =>
                updateTicketToNewStatus(ticket, TicketStatus.Close)
              }
            >
              Close
            </Button>
          </>
        ),
      },
    },
    {
      status: TicketStatus.Close,
      columnProps: {
        labelClassName:
          TicketStatusColor[TicketStatus.Close].labelColorClassName,
        icon: <ThumbUpIcon />,
      },
      itemProps: {
        itemClassName: ({ isDragging }) =>
          !isDragging ? "opacity-40 dark:opacity-30 line-through" : "",
      },
    },
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-8 flex flex-wrap gap-4">
        {availableStatuses.map((statusObj) => (
          <TicketStatusColumn
            key={statusObj.status}
            label={statusObj.status}
            status={statusObj.status}
            tickets={tickets}
            itemProps={statusObj.itemProps}
            {...statusObj.columnProps}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TicketStatusGrid;
