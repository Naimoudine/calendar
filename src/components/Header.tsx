import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import type React from "react";

interface HeaderProps {
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: number;
  months: string[];
}

export default function Header({
  currentMonth,
  setCurrentMonth,
  currentYear,
  months,
}: HeaderProps) {
  const addMonth = () => {
    if (currentMonth) {
      setCurrentMonth((old) => old + 1);
    }
  };

  const subMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((old) => old - 1);
    }
  };

  return (
    <div className="flex items-center justify-start gap-4">
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="change month"
          onClick={() => subMonth()}
        >
          <ChevronLeftIcon className="size-4 text-white" />
        </button>
        <button
          type="button"
          aria-label=" change month"
          onClick={() => addMonth()}
        >
          <ChevronRightIcon className="size-4 text-white" />
        </button>
      </div>
      <h1 className="text-3xl font-semibold">
        {months.find((month) => months.indexOf(month) === currentMonth)}{" "}
        <span className="font-light">{currentYear}</span>
      </h1>
    </div>
  );
}
