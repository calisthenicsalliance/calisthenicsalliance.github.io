import "@/app/globals.css";
import type { ReactNode } from "react";

// only a parent for page.tsx and not-found.tsx; the real shell is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
	return children;
}
