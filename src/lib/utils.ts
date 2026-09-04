import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// joins class names; twMerge makes a later Tailwind class win over an earlier one
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
