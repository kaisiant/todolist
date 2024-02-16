import { CreateTicketForm, TicketStatusGrid } from "@/components";

const HomePage = () => {
  return (
    <div>
      <div className="flex lg:justify-center">
        <CreateTicketForm />
      </div>
      <TicketStatusGrid />
    </div>
  );
};

export default HomePage;
