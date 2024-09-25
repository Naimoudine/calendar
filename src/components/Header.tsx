import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import type React from "react";
import { Bill } from "../App";
import { useEffect, useState } from "react";

interface HeaderProps {
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  months: string[];
  bill: Bill[];
}

export default function Header({
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  months,
  bill,
}: HeaderProps) {
  const [currentSum, setCurrentSum] = useState<number>(0);

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

  useEffect(() => {
    const curr = bill.find((el) => el.month === currentMonth);
    if (curr) {
      setCurrentSum(Number(curr.sum.toFixed(2)));
    }
  }, [currentMonth, bill]);

  return (
    <div className="flex items-center justify-between gap-4">
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
      <p className="text-xl text-white">{currentSum} €</p>
    </div>
  );
}
