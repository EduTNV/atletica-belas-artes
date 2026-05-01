"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/eventos", label: "Eventos" },
  { href: "/times", label: "Times" },
];

const secondaryLinks = [
  { href: "/entidades", label: "Entidades" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const pathname = usePathname();
  const [linkSocio, setLinkSocio] = useState<string | null>(null);

  // Busca o link dinâmico de "Seja Sócio" do ConfigHome
  useEffect(() => {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    fetch(`${STRAPI_URL}/api/config-home`)
      .then((r) => r.json())
      .then((res) => {
        if (res?.data?.link_seja_socio) {
          setLinkSocio(res.data.link_seja_socio);
        }
      })
      .catch(() => {});
  }, []);

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

      {/* CTA — link dinâmico do Strapi ou fallback */}
      {linkSocio ? (
        <a
          href={linkSocio}
          target="_blank"
          rel="noopener noreferrer"
          className="header-cta"
          id="header-cta-socio"
        >
          Seja Sócio
        </a>
      ) : (
        <button className="header-cta" id="header-cta-socio" disabled style={{ opacity: 0.5 }}>
          Seja Sócio
        </button>
      )}
    </header>
  );
}
