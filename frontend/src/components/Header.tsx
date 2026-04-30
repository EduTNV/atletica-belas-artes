"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/eventos", label: "Eventos" },
  { href: "/times", label: "Times" },
];

const secondaryLinks = [
  { href: "#", label: "Entidades" },
  { href: "#", label: "Contato" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="desktop-header" id="desktop-header">
      {/* Logo */}
      <Link href="/" className="header-logo" id="header-logo">
        <div className="header-logo-mark">BA</div>
        <div className="header-logo-text">Atlética Belas Artes</div>
      </Link>

      {/* Nav principal */}
      <nav className="header-nav" id="header-nav">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`header-nav-link ${
              pathname === link.href ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}

        <div className="header-divider" />

        {secondaryLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="header-nav-link"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <button className="header-cta" id="header-cta-socio">
        Seja Sócio
      </button>
    </header>
  );
}
