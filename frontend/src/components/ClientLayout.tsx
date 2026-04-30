"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import BottomTabBar from "@/components/BottomTabBar";
import BottomSheet from "@/components/BottomSheet";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setSheetOpen((prev) => !prev);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setSheetOpen(false);
  }, []);

  return (
    <>
      {/* Header desktop — só aparece em md+ */}
      <Header />

      {/* Conteúdo da página */}
      <main className="main-content">
        <div className="page-enter">{children}</div>
      </main>

      {/* Bottom Sheet do Menu — só aparece em mobile */}
      <BottomSheet isOpen={sheetOpen} onClose={handleCloseSheet} />

      {/* Bottom Tab Bar — só aparece em mobile */}
      <BottomTabBar onMenuToggle={handleMenuToggle} menuOpen={sheetOpen} />
    </>
  );
}
