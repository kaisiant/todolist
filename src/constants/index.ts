export enum TicketStatus {
  InProgress = "In-Progress",
  Done = "Done",
  Close = "Close",
}

export const TicketStatusColor = {
  [TicketStatus.InProgress]: {
    labelColorClassName: "text-orange-500",
    dropContainerBgClassName: "bg-orange-50 dark:bg-orange-950",
    color: "#f97316",
  },
  [TicketStatus.Done]: {
    labelColorClassName: "text-green-500",
    dropContainerBgClassName: "bg-green-50 dark:bg-green-950",
    color: "#22c55e",
  },
  [TicketStatus.Close]: {
    labelColorClassName: "text-gray-400",
    dropContainerBgClassName: "bg-gray-100 dark:bg-gray-700",
    color: "#9ca3af",
  },
};

export const AUTO_MOVE_DELAY = 5;
export const AUTO_REDIRECT_DELAY = 5;
