import {
  subDays,
  addDays,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
} from "date-fns";
import { useEffect, useState } from "react";

interface CalendarProps {
  currentMonth: number;
  currentYear: number;
  days: string[];
}

export default function Calendar({
  currentMonth,
  days,
  currentYear,
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

  return (
    <div className="grid grid-cols-7 grid-rows-auto gap-2 mt-2">
      {interval?.map((date, i) => (
        <div
          className={`justify-self-center w-full min-h-14 rounded-xl text-zinc-400 bg-zinc-800/30 flex justify-center items-center`}
          key={i}
          style={{ gridColumnStart: `${date.getDay() + 1}` }}
        >
          {date.getDate()}
        </div>
      ))}
    </div>
  );
}
