import { cn } from "../../lib/utils";

export function GlassCard({ children, className, hoverable = false, style }) {
  return (
    <div
      style={style}
      className={cn(
        "bg-white rounded-2xl p-4 md:p-6 border border-slate-200/90 shadow-sm transition-all duration-200 relative group/card",
        hoverable && "hover:shadow-md hover:border-slate-300",
        className
      )}
    >
      {children}
    </div>
  );
}
