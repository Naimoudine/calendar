import { XMarkIcon } from "@heroicons/react/16/solid";
import type React from "react";
import { Subscription } from "../App";
import { useState } from "react";

type ModalProps = {
  isModalOpen: boolean;
  selectedDate: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

export default function Modal({
  isModalOpen,
  selectedDate,
  setIsModalOpen,
  setSubscriptions,
}: ModalProps) {
  const [showError, setShowError] = useState<boolean>(false);

  const regex = /^\d+(\.\d+)?$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const price = formData.get("price");
    const company = formData.get("company");

    if (price && regex.test(price as string)) {
      setSubscriptions((prev) => [
        ...prev,
        {
          date: selectedDate,
          company: String(company),
          price: Number(price),
        },
      ]);

      form.reset();
      setIsModalOpen(!isModalOpen);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div
      className={
        isModalOpen
          ? "absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/70 z-[1000]"
          : "hidden"
      }
    >
      <form
        className="relative flex flex-col gap-6 p-8 text-white rounded-lg bg-zinc-800"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          aria-label="close modal"
          className="absolute p-0 border-none top-4 right-4"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <XMarkIcon className="size-6" />
        </button>
        <label className="flex flex-col gap-2" htmlFor="price">
          price*
          <input type="text" name="price" id="price" required />
          <p
            className={
              showError ? "block text-sm font-semibold text-red-600" : "hidden"
            }
          >
            Please, enter only numbers.
          </p>
        </label>
        <label className="flex flex-col gap-2" htmlFor="company">
          company*
          <select name="company" id="company" required>
            <option className="text-white bg-zinc-800" value="">
              --
            </option>
            <option className="text-white bg-zinc-800" value="netflix">
              Netflix
            </option>
            <option className="text-white bg-zinc-800" value="prime">
              Prime
            </option>
            <option className="text-white bg-zinc-800" value="openai">
              Open Ai
            </option>
          </select>
        </label>
        <div className="flex items-center justify-center gap-4">
          <button
            className="text-white bg-red-600 hover:bg-red-600/70"
            type="button"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            cancel
          </button>
          <button
            className="text-black bg-white hover:bg-white/70"
            type="submit"
          >
            save
          </button>
        </div>
      </form>
    </div>
  );
}
