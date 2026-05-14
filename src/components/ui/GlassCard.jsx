import { cn } from "../../lib/utils";

export function GlassCard({ children, className, hoverable = false }) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        hoverable && "hover:shadow-xl hover:-translate-y-1 hover:bg-opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
}
