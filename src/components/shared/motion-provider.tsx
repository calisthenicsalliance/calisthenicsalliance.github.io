"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// every animation in the app defers to the visitor's reduced-motion setting
export function MotionProvider({ children }: { children: ReactNode }) {
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
