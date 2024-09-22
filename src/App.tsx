import { useEffect, useState } from "react";
import Header from "./components/Header";
import DaysList from "./components/DaysList";
import Calendar from "./components/Calendar";

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="max-w-[600px]">
        <Header
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          months={months}
        />
        <div className="mt-4">
          <DaysList days={days} />
          <Calendar
            currentMonth={currentMonth}
            currentYear={currentYear}
            days={days}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
