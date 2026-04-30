"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

interface TabDef {
  href: string;
  label: string;
  icon: ReactNode;
}

const tabs: TabDef[] = [
  {
    href: "/",
    label: "Início",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    ),
  },
  {
    href: "/eventos",
    label: "Eventos",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/times",
    label: "Times",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 15l-3-3h6l-3 3z" />
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0113 0" />
      </svg>
    ),
  },
];

interface BottomTabBarProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export default function BottomTabBar({ onMenuToggle, menuOpen }: BottomTabBarProps) {
  const pathname = usePathname();

  return (
    <nav className="tab-bar" id="bottom-tab-bar">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`tab-bar-btn ${pathname === tab.href ? "active" : ""}`}
          id={`tab-${tab.label.toLowerCase()}`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </Link>
      ))}

      {/* Menu button (não é um link, abre o Bottom Sheet) */}
      <button
        className={`tab-bar-btn ${menuOpen ? "active" : ""}`}
        onClick={onMenuToggle}
        aria-label="Menu"
        id="tab-menu"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span>Menu</span>
      </button>
    </nav>
  );
}
