import { Subscription } from "../App";
import { displayImg } from "./Calendar";

type HoverModalProps = {
  date: Date;
  subscriptions: Subscription[];
  id: number;
  hoverIndex: number | undefined;
};

export default function HoverModal({
  date,
  subscriptions,
  id,
  hoverIndex,
}: HoverModalProps) {
  console.log(date);
  return (
    <div
      className={
        subscriptions.filter((s) => s.date === date.toISOString()).length &&
        id === hoverIndex
          ? "absolute -left-3 flex flex-col items-center justify-between gap-4 p-2 text-xs rounded-lg bg-black/50 backdrop-blur-sm top-14 w-[140px] z-[100]"
          : "hidden"
      }
    >
      {subscriptions
        .filter((s) => s.date === date.toISOString())
        .map((subscription) => (
          <div className="flex items-center justify-between gap-4">
            <div className="contents">
              <img
                className="w-4 h-4"
                src={displayImg(subscription.company)}
                alt="logo"
              />
              <p className="whitespace-nowrap">{subscription.company}</p>
            </div>
            <p className="whitespace-nowrap">{subscription.price} €</p>
          </div>
        ))}
    </div>
  );
}
