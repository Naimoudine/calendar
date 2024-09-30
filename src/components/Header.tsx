import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import type React from "react";
import { Bill } from "../App";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  months: string[];
  bill: Bill[];
  setBill: React.Dispatch<React.SetStateAction<Bill[]>>;
}

export default function Header({
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  months,
  bill,
  setBill,
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
    } else {
      setCurrentSum(0);
    }
  }, [currentMonth, bill]);

  useEffect(() => {
    const billExists = bill.some(
      (el) => el.month === currentMonth && el.year === currentYear
    );

    if (!billExists) {
      setBill((old) => [
        ...old,
        {
          sum: 0,
          month: currentMonth,
          year: currentYear,
        },
      ]);
    }
  }, [currentMonth, currentYear, bill]);

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
        <motion.h1
          key={currentMonth}
          className="text-3xl font-semibold text-white"
          variants={headerVariants}
          animate={"show"}
          initial="hide"
        >
          {months.find((month) => months.indexOf(month) === currentMonth)}{" "}
          <span className="font-light text-white/30">{currentYear}</span>
        </motion.h1>
      </div>
      <motion.p
        key={currentMonth}
        className="text-xl text-white"
        initial="hide"
        animate="show"
        transition={{ staggerChildren: 0.5, duration: 0.6 }}
      >
        {String(currentSum)
          .split("")
          .map((char, i) => (
            <motion.span key={i} variants={defaultAnimation}>
              {char}
            </motion.span>
          ))}{" "}
        €
      </motion.p>
    </div>
  );
}

const headerVariants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
  hide: {
    y: -20,
    opacity: 0,
  },
};

const defaultAnimation = {
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
};
