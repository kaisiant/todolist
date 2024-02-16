import { useEffect } from "react";

import { MoonIcon, SunIcon } from "@/assets/icons";
import { toggleDarkMode } from "@/features/ticketSlice";
import { useTypedDispatch, useTypedSelector } from "@/hooks";

const LightDarkToggleButton = () => {
  const isDark = useTypedSelector((state) => state.ticket.isDark);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    isDark
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <div
      className="inline-block cursor-pointer"
      onClick={() => dispatch(toggleDarkMode())}
    >
      {isDark ? <SunIcon /> : <MoonIcon className="text-gray-400" />}
    </div>
  );
};

export default LightDarkToggleButton;
