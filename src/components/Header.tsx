import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import type React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  months: string[];
}

export default function Header({
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  months,
}: HeaderProps) {
  const addMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(-1);
      setCurrentYear((old) => old + 1);
    }
    setCurrentMonth((old) => old + 1);
  };

  const subMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(12);
      setCurrentYear((old) => old - 1);
    }
    setCurrentMonth((old) => old - 1);
  };

  return (
    <div className="flex items-center justify-start gap-4">
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="change month"
          onClick={() => subMonth()}
        >
          <ChevronLeftIcon className="text-white size-6" />
        </button>
        <button
          type="button"
          aria-label=" change month"
          onClick={() => addMonth()}
        >
          <ChevronRightIcon className="text-white size-6" />
        </button>
      </div>
      <h1 className="text-3xl font-semibold text-white">
        {months.find((month) => months.indexOf(month) === currentMonth)}{" "}
        <span className="font-light text-white/30">{currentYear}</span>
      </h1>
    </div>
  );
}
