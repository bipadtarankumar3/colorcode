import { cn } from "../../lib/utils";

export function GlassCard({ children, className, hoverable = false, style }) {
  return (
    <div
      style={style}
      className={cn(
        "glass rounded-2xl p-4 md:p-5 transition-all duration-500 relative group/card",
        hoverable && "hover:shadow-2xl hover:-translate-y-1.5 hover:bg-white/60 hover:border-white/60",
        className
      )}
    >
      {hoverable && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />
      )}
      {children}
    </div>
  );
}
