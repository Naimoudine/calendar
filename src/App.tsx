import { useEffect, useState } from "react";
import Header from "./components/Header";
import DaysList from "./components/DaysList";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";

export interface Subscription {
  date: string;
  company: string;
  price: number;
}

export interface Bill {
  sum: number;
  month: number;
  year: number;
}

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [bill, setBill] = useState<Bill[]>([
    {
      sum: 0,
      month: currentMonth,
      year: currentYear,
    },
  ]);

  useEffect(() => {
    if (subscriptions.length > 0) {
      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
    }
  }, [subscriptions]);

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen">
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSubscriptions={setSubscriptions}
        selectedDate={selectedDate}
      />
      <div className="max-w-[600px]">
        <Header
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          months={months}
          bill={bill}
          setBill={setBill}
        />
        <div className="mt-4">
          <DaysList days={days} />
          <Calendar
            currentMonth={currentMonth}
            currentYear={currentYear}
            isModalOpen={isModalOpen}
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
            setIsModalOpen={setIsModalOpen}
            setSelectedDate={setSelectedDate}
            setBill={setBill}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
