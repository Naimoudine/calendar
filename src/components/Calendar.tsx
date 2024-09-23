import {
  subDays,
  addDays,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Subscription } from "../App";
import netflix from "../assets/images/netflix.svg";
import openai from "../assets/images/openai.svg";
import prime from "../assets/images/prime.svg";

interface CalendarProps {
  currentMonth: number;
  currentYear: number;
  days: string[];
  isModalOpen: boolean;
  subscriptions: Subscription[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function Calendar({
  currentMonth,
  days,
  currentYear,
  isModalOpen,
  subscriptions,
  setIsModalOpen,
  setSelectedDate,
}: CalendarProps) {
  const [interval, setInterval] = useState<Date[]>();

  useEffect(() => {
    setInterval(
      eachDayOfInterval({
        start: subDays(
          startOfMonth(new Date(currentYear, currentMonth)),
          startOfMonth(new Date(currentYear, currentMonth)).getDay()
        ),
        end: addDays(
          endOfMonth(new Date(currentYear, currentMonth)),
          6 - endOfMonth(new Date(currentYear, currentMonth)).getDay()
        ),
      })
    );
  }, [currentMonth]);

  const handleSub = (date: Date) => {
    setIsModalOpen(!isModalOpen);
    setSelectedDate(date);
  };

  const displayImg = (img: string) => {
    if (img === "netflix") {
      return netflix;
    } else if (img === "openai") {
      return openai;
    } else if (img === "prime") {
      return prime;
    }
  };

  return (
    <motion.div className="grid grid-cols-7 gap-2 mt-2 overflow-hidden">
      {interval?.map((date, i) => (
        <button
          type="button"
          className={
            date.getMonth() === currentMonth
              ? `justify-self-center w-full min-h-14 rounded-xl text-zinc-400 bg-zinc-800/30 flex flex-col justify-end items-center`
              : `justify-self-center w-full min-h-14 rounded-xl text-zinc-400 bg-zinc-900 flex flex-col justify-end items-center`
          }
          key={i}
          style={{ gridColumnStart: `${date.getDay() + 1}` }}
          onClick={() => handleSub(date)}
        >
          {subscriptions
            .filter((subscription) => subscription.date === date)
            .map((subscription) => (
              <img
                className="w-6 h-6"
                key={subscription.company}
                src={displayImg(subscription.company)}
                alt={subscription.company}
              />
            ))}
          <p>{date.getDate()}</p>
        </button>
      ))}
    </motion.div>
  );
}
