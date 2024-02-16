import { toast } from "sonner";

import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Select, TextInput, Textarea } from "@/components/common";
import { TicketStatus } from "@/constants";
import { Ticket, updateTicketDetails } from "@/features/ticketSlice";
import { useTypedDispatch } from "@/hooks";
import { cn } from "@/utils";

type FormValues = {
  title: string;
  desc: string;
  status: TicketStatus;
};

type FormErrors = Partial<FormValues> & {
  GENERAL?: string;
};

type EditTicketFormProps = {
  data: Ticket;
};

const EditTicketForm = ({ data: ticketData }: EditTicketFormProps) => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useTypedDispatch();

  const setError = (key: keyof FormErrors, errMsg: string) => {
    setFormErrors((prev) => ({ ...prev, [key]: errMsg }));
  };

  const resetError = () => setFormErrors({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(data.entries()) as FormValues;
    if (!formValues.title) {
      setError("title", "Ticket title is required.");
      return;
    }

    resetError();

    setIsSubmitting(true);

    try {
      const isSuccess = await stimulateUpdateTicket();
      if (isSuccess) {
        dispatch(
          updateTicketDetails({
            id: ticketData.id,
            title: formValues.title,
            desc: formValues.desc,
            status: formValues.status,
          }),
        );
        formRef.current?.reset();
        toast.success("Ticket updated successfully");
        navigate("/");
      }
    } catch (error) {
      const errorStr = error as string;
      toast.error(errorStr);
      setError("GENERAL", errorStr);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stimulateUpdateTicket = () => {
    return new Promise((resolve, _) => {
      const randomNumber = 1;
      setTimeout(() => {
        resolve(true);
      }, randomNumber * 1000);
    });
  };
  console.log({ ticketData });
  return (
    <div className="space-y-4">
      {/* {!!formErrors.GENERAL && (
        <div className="border-2 border-red-500 text-red-500 bg-red-50 rounded p-4">
          {formErrors.GENERAL}
        </div>
      )} */}
      <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
        <div className="space-y-4">
          <TextInput
            label="Ticket Title"
            name="title"
            isRequired
            className="w-full"
            defaultValue={ticketData.title}
            errorMsg={formErrors.title}
          />
          <Textarea
            label="Ticket Description"
            name="desc"
            className="w-full"
            rows={5}
            defaultValue={ticketData.desc}
            errorMsg={formErrors.desc}
          />
          <Select
            label="Ticket Status"
            name="status"
            className="w-full"
            defaultValue={ticketData.status}
            options={Object.values(TicketStatus)}
            errorMsg={formErrors.desc}
          />
          <Button
            className={cn({ "mb-5": formErrors.title })}
            isLoading={isSubmitting}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTicketForm;
