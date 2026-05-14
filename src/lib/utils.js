import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function selectColor(color) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("color-selected", { detail: color }));
  }
}
