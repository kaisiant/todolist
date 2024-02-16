import { Link, useParams } from "react-router-dom";

import { ArrowLeftIcon } from "@/assets/icons";
import { EditTicketForm } from "@/components";
import { useTypedSelector } from "@/hooks";

const TicketDetailsPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const tickets = useTypedSelector((state) => state.ticket.tickets);
  const ticket = tickets.find((ticket) => ticket.id === Number(ticketId));

  return (
    <div>
      <Link
        to="/"
        className="flex items-center space-x-2 text-gray-600 hover:underline dark:text-gray-500"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back</span>
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Edit Ticket Details</h1>
      <div className="mt-4">
        {ticket ? (
          <div>
            <EditTicketForm data={ticket} />
          </div>
        ) : (
          <div className="italic">Ticket not found.</div>
        )}
      </div>
    </div>
  );
};

export default TicketDetailsPage;
