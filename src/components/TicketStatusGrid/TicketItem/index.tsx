import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";

import {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import { ExternalIcon } from "@/assets/icons";
import { AUTO_MOVE_DELAY, TicketStatus } from "@/constants";
import { Ticket, updateTicketStatus } from "@/features/ticketSlice";
import { useTypedDispatch } from "@/hooks";
import { cn } from "@/utils";

export type TicketItemProps = Omit<
  _TicketItemProps,
  "draggableProvided" | "draggableSnapshot"
>;

type _TicketItemProps = {
  draggableProvided: DraggableProvided;
  draggableSnapshot: DraggableStateSnapshot;
  itemClassName?:
    | string
    | (({ isDragging }: { isDragging: boolean }) => string);
  ticket: Ticket;
  renderActionButtons?: ({ ticket }: { ticket: Ticket }) => ReactNode;
};

const TicketItem = ({
  draggableProvided,
  draggableSnapshot,
  itemClassName,
  ticket,
  renderActionButtons,
}: _TicketItemProps) => {
  useState;
  const timeoutRef = useRef<number>();
  const dispatch = useTypedDispatch();

  const updateTicketToNewStatus = useCallback(
    (ticket: Ticket, status: TicketStatus) =>
      dispatch(
        updateTicketStatus({
          id: ticket.id,
          newStatus: status,
        }),
      ),
    [dispatch],
  );

  const checkIsNeededAutoMoveToClose = useCallback(() => {
    if (ticket.status === TicketStatus.Done) {
      timeoutRef.current = setTimeout(() => {
        updateTicketToNewStatus(ticket, TicketStatus.Close);
      }, AUTO_MOVE_DELAY * 1000);
    } else {
      clearTimeout(timeoutRef?.current);
    }
  }, [ticket, updateTicketToNewStatus]);

  useEffect(() => {
    if (draggableSnapshot.isDragging) {
      clearTimeout(timeoutRef.current);
      return;
    }
    checkIsNeededAutoMoveToClose();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [ticket, checkIsNeededAutoMoveToClose, draggableSnapshot.isDragging]);

  return (
    <li
      className={cn(
        "group rounded bg-gray-50 p-4 dark:bg-gray-800",
        {
          "bg-gray-200": draggableSnapshot.isDragging,
          "shadow-md": draggableSnapshot.isDragging,
        },
        typeof itemClassName === "function"
          ? itemClassName({ isDragging: draggableSnapshot.isDragging })
          : itemClassName,
      )}
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      <Link to={`/ticket/${ticket.id}`}>
        <div className="flex items-center space-x-2 hover:underline">
          <div>{ticket.title}</div>
          <ExternalIcon className="hidden h-5 w-5 text-gray-500 group-hover:block" />
        </div>
      </Link>
      <div
        className={cn(
          "mt-4 line-clamp-2 h-[38px] break-words text-sm text-gray-500 dark:text-gray-400",
          { italic: !ticket.desc, "group-hover:hidden": !!renderActionButtons },
        )}
      >
        {ticket.desc || "No description."}
      </div>
      {renderActionButtons && (
        <div className="mt-4 hidden space-x-2 group-hover:flex">
          {renderActionButtons({ ticket })}
        </div>
      )}
    </li>
  );
};

const MemorizedTicketItem = memo(TicketItem);
export default MemorizedTicketItem;
