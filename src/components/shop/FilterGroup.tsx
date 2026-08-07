export default function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (options.length === 0) return null;
  
  return (
    <div>
      <h3 className="text-sm tracking-[0.18em] text-muted-foreground">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}