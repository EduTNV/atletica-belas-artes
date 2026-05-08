"use client";

import { useState, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import BottomTabBar from "@/components/BottomTabBar";
import BottomSheet from "@/components/BottomSheet";

/** Componente de layout principal que controla o menu de navegação e as travas de scroll (iOS) */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (sheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const handleMenuToggle = useCallback(() => {
    setSheetOpen((prev) => !prev);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setSheetOpen(false);
  }, []);

  return (
    <>
      <Header />

      <main className="main-content">
        <div className="page-enter">{children}</div>
      </main>

      <BottomSheet isOpen={sheetOpen} onClose={handleCloseSheet} />

      <BottomTabBar onMenuToggle={handleMenuToggle} menuOpen={sheetOpen} />
    </>
  );
}
