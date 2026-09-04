import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// locale-aware Link and usePathname, used everywhere instead of next/link
export const { Link, usePathname } = createNavigation(routing);
