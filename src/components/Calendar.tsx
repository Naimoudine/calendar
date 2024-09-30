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
import type { Bill } from "../App";
import HoverModal from "./HoverModal";

export const displayImg = (img: string) => {
  if (img === "netflix") {
    return netflix;
  } else if (img === "openai") {
    return openai;
  } else if (img === "prime") {
    return prime;
  }
};

interface CalendarProps {
  currentMonth: number;
  currentYear: number;
  isModalOpen: boolean;
  subscriptions: Subscription[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
  setBill: React.Dispatch<React.SetStateAction<Bill[]>>;
}

export default function Calendar({
  currentMonth,
  currentYear,
  isModalOpen,
  subscriptions,
  setIsModalOpen,
  setSelectedDate,
  setSubscriptions,
  setBill,
}: CalendarProps) {
  const [interval, setInterval] = useState<Date[]>();
  const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);

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
  }, [currentMonth, currentYear, subscriptions]);

  useEffect(() => {
    const savedSubscriptions = localStorage.getItem("subscriptions");
    if (savedSubscriptions) {
      setSubscriptions(JSON.parse(savedSubscriptions));
    }
  }, [currentMonth]);

  useEffect(() => {
    setBill((oldBills) => {
      // Créer une copie du tableau original pour éviter les mutations
      const newBills = [...oldBills];

      // Trouver la facture du mois en cours
      const currBillIndex = newBills.findIndex((b) => b.month === currentMonth);

      if (currBillIndex !== -1) {
        // Créer une copie de l'objet facture pour éviter les mutations directes
        const updatedBill = { ...newBills[currBillIndex] };
        updatedBill.sum = 0;
        // Ajouter le prix des abonnements à la facture
        for (let sub of subscriptions) {
          const subMonth = new Date(sub.date).getMonth();
          if (subMonth === updatedBill.month) {
            updatedBill.sum += sub.price;
          }
        }

        // Remplacer l'ancienne facture par la nouvelle dans le tableau
        newBills[currBillIndex] = updatedBill;
      }
      // Retourner la nouvelle version des factures
      return newBills;
    });
  }, [interval, currentMonth, subscriptions]);

  const handleSub = (date: Date) => {
    setIsModalOpen(!isModalOpen);
    setSelectedDate(date.toISOString());
  };

  const handleHover = (subscription: Subscription) => {
    if (subscription) {
      setHoverIndex(subscriptions.indexOf(subscription));
    }
  };

  return (
    <motion.div className="grid grid-cols-7 gap-2 mt-2" layout>
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
            ?.filter((subscription) => subscription.date === date.toISOString())
            ?.map((subscription) => (
              <div
                className="relative"
                key={subscription.company}
                onMouseEnter={() => handleHover(subscription)}
                onMouseLeave={() => setHoverIndex(undefined)}
              >
                <img
                  className="w-6 h-6"
                  src={displayImg(subscription.company)}
                  alt={subscription.company}
                />
                <HoverModal
                  subscription={subscription}
                  id={subscriptions.indexOf(subscription)}
                  hoverIndex={hoverIndex}
                />
              </div>
            ))}
          <p>{date.getDate()}</p>
        </button>
      ))}
    </motion.div>
  );
}
