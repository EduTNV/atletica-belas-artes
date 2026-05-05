"use client";

import Link from "next/link";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`sheet-overlay ${isOpen ? "open" : ""}`}
        onClick={handleOverlayClick}
        id="sheet-overlay"
      />

      <div
        className={`bottom-sheet ${isOpen ? "open" : ""}`}
        id="bottom-sheet"
      >
        <div className="sheet-handle" />

        <div id="menu-main">
          <div
            className="font-heading text-[24px] tracking-[1px] text-center mb-6 mt-2"
            style={{ color: "var(--text)" }}
          >
            Menu
          </div>

          <Link 
            href="/" 
            className="sheet-item" 
            id="menu-sobre"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <div className="text-[14px]">Sobre a Atlética</div>
              <span className="text-[12px] block mt-[1px]" style={{ color: "var(--text3)" }}>
                História, missão e valores
              </span>
            </div>
          </Link>

          <Link
            href="/entidades"
            className="sheet-item"
            id="menu-entidades"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            <div className="flex-1">
              <div className="text-[14px]">Entidades</div>
              <span className="text-[12px] block mt-[1px]" style={{ color: "var(--text3)" }}>
                Diretoria, Bateria e representações
              </span>
            </div>
          </Link>

          <div className="divider !mx-5 !my-[6px]" />

          <Link 
            href="/contato" 
            className="sheet-item" 
            id="menu-contato"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <div>
              <div className="text-[14px]">Ajuda & FAQ</div>
              <span className="text-[12px] block mt-[1px]" style={{ color: "var(--text3)" }}>
                Dúvidas frequentes e canais
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
