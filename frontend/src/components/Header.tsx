"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/eventos", label: "Eventos" },
  { href: "/times", label: "Times" },
  { href: "/competicoes", label: "Competições" },
];

const secondaryLinks = [
  { href: "/entidades", label: "Entidades" },
  { href: "/contato", label: "Ajuda" },
];

/** Componente de cabeçalho (Header) principal exibido em telas de desktop */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="desktop-header" id="desktop-header">
      <Link href="/" className="header-logo" id="header-logo">
        <div className="header-logo-mark">BA</div>
        <div className="header-logo-text">Atlética Belas Artes</div>
      </Link>

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
            key={link.href}
            href={link.href}
            className={`header-nav-link ${
              pathname === link.href ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
