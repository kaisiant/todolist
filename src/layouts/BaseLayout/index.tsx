import { Toaster } from "sonner";

import { PropsWithChildren } from "react";

import LightDarkToggleButton from "@/components/LightDarkToggleButton";
import { useTypedSelector } from "@/hooks";

const BaseLayout = ({ children }: PropsWithChildren) => {
  const isDark = useTypedSelector((state) => state.ticket.isDark);
  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      <div className="mb-4 text-right">
        <LightDarkToggleButton />
      </div>
      {children}
      <Toaster
        theme={isDark ? "dark" : "light"}
        position="top-right"
        richColors
      />
    </div>
  );
};

export default BaseLayout;
