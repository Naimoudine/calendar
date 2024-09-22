interface DaysListProps {
  days: string[];
}

export default function DaysList({ days }: DaysListProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <p
          className="px-4 bg-zinc-800 text-zinc-400 rounded-full w-full text-center justify-self-center"
          key={day}
        >
          {day.toUpperCase().charAt(0)}
        </p>
      ))}
    </div>
  );
}
