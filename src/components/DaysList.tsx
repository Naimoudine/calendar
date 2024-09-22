interface DaysListProps {
  days: string[];
}

export default function DaysList({ days }: DaysListProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <p
          className="w-full px-4 text-center rounded-full bg-zinc-800 text-zinc-400 justify-self-center"
          key={day}
        >
          {day.toUpperCase().charAt(0)}
        </p>
      ))}
    </div>
  );
}
