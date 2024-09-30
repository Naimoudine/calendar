import { Subscription } from "../App";
import { displayImg } from "./Calendar";

type HoverModalProps = {
  subscription: Subscription;
  id: number;
  hoverIndex: number | undefined;
};

export default function HoverModal({
  subscription,
  id,
  hoverIndex,
}: HoverModalProps) {
  return (
    <div
      className={
        id === hoverIndex
          ? "absolute -left-3 flex items-center justify-between gap-4 p-2 text-xs rounded-lg bg-black/50 backdrop-blur-sm top-14 w-[140px] z-60"
          : "hidden"
      }
    >
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
  );
}
