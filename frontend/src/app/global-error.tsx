"use client";

import { Bebas_Neue, DM_Sans } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro crítico capturado:", error);
  }, [error]);

  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen content-wrapper text-center" style={{ background: "var(--bg)" }}>
          <div 
            className="w-20 h-20 mb-6 flex items-center justify-center rounded-full"
            style={{ background: "rgba(224, 44, 44, 0.1)", color: "var(--crimson)" }}
          >
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="font-heading text-[32px] md:text-[40px] mb-4" style={{ color: "var(--text)" }}>
            Erro Crítico
          </h2>
          
          <p className="text-[15px] md:text-[16px] mb-8 max-w-[500px] mx-auto" style={{ color: "var(--text2)" }}>
            Um erro inesperado e irrecuperável ocorreu na aplicação.
          </p>
          
          <button
            onClick={() => reset()}
            className="font-bold transition-opacity hover:opacity-85"
            style={{
              background: "var(--crimson)",
              color: "#f4f4f4",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "15px",
            }}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
