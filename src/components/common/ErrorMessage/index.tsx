import { ExclamationCircleIcon } from "@/assets/icons";

type Props = {
  text: string;
};

const ErrorMessage = ({ text }: Props) => {
  return (
    <div className="mt-1 flex items-center space-x-0.5 text-xs text-red-500">
      <ExclamationCircleIcon className="h-4 w-4" />
      <span>{text}</span>
    </div>
  );
};

export default ErrorMessage;
