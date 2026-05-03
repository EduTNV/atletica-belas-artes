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
      <Header />

      <main className="main-content">
        <div className="page-enter">{children}</div>
      </main>

      <BottomSheet isOpen={sheetOpen} onClose={handleCloseSheet} />

      <BottomTabBar onMenuToggle={handleMenuToggle} menuOpen={sheetOpen} />
    </>
  );
}
