import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]")}>
      <h1 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">Component Example</h1>
      <h2 className="text-xl font-semibold text-[var(--color-accent-light)]">{count}</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className="px-3 py-1 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded hover:bg-[var(--color-bg-hover)] text-sm font-bold"
        >
          -
        </button>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-3 py-1 bg-[var(--color-accent)] text-white rounded hover:opacity-90 text-sm font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
};
