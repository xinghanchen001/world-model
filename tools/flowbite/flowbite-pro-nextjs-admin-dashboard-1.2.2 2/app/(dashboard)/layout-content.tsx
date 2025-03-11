"use client";

import { useSidebarContext } from "@/contexts/sidebar-context";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export function LayoutContent({ children }: PropsWithChildren) {
  const sidebar = useSidebarContext();

  return (
    <div
      id="main-content"
      className={twMerge(
        "relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900",
        sidebar.desktop.isCollapsed ? "lg:ml-16" : "lg:ml-64",
      )}
    >
      {children}
    </div>
  );
}
