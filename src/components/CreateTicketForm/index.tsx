import { toast } from "sonner";

import { FormEvent, useRef, useState } from "react";

import { Button, TextInput } from "@/components/common";
import { createTicket } from "@/features/ticketSlice";
import { useTypedDispatch } from "@/hooks";
import { cn } from "@/utils";

type FormValues = {
  title: string;
};

type FormErrors = Partial<FormValues> & {
  GENERAL?: string;
};

const CreateTicketForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useTypedDispatch();

  const setError = (key: keyof FormErrors, errMsg: string) => {
    setFormErrors((prev) => ({ ...prev, [key]: errMsg }));
  };

  // const clearError = (key: keyof FormErrors) => {
  //   setFormErrors((prev) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { [key]: _, ...restErrors } = prev;
  //     return restErrors;
  //   });
  // };

  const resetError = () => setFormErrors({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(data.entries());
    if (!formValues.title) {
      setError("title", "Ticket title is required.");
      return;
    }

    resetError();

    setIsSubmitting(true);

    try {
      const isSuccess = await stimulateCreateTicket();
      if (isSuccess) {
        dispatch(createTicket({ title: formValues.title.toString() }));
        formRef.current?.reset();
        toast.success("Ticket created successfully");
      }
    } catch (error) {
      const errorStr = error as string;
      toast.error(errorStr);
      setError("GENERAL", errorStr);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stimulateCreateTicket = () => {
    return new Promise((resolve, reject) => {
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      setTimeout(() => {
        // 1sec: SUCCESS, 2secs: FAIL
        if (randomNumber % 2) resolve(true);
        else reject("Something went wrong, try again.");
      }, randomNumber * 1000);
    });
  };

  return (
    <div className="w-full  space-y-4">
      {/* {!!formErrors.GENERAL && (
        <div className="border-2 border-red-500 text-red-500 bg-red-50 rounded p-4">
          {formErrors.GENERAL}
        </div>
      )} */}
      <form className="w-full  space-y-4" onSubmit={handleSubmit} ref={formRef}>
        <div className="flex w-full items-end space-x-4">
          <TextInput
            label="Ticket Title"
            name="title"
            isRequired
            className="w-full"
            containerClassName="w-full"
            errorMsg={formErrors.title}
          />
          <Button
            className={cn({ "mb-5": formErrors.title })}
            isLoading={isSubmitting}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicketForm;
