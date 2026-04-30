"use client";

import { useState } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const [showEntities, setShowEntities] = useState(false);

  const handleOverlayClick = () => {
    setShowEntities(false);
    onClose();
  };

  return (
    <>
      {/* Overlay escuro atrás do sheet */}
      <div
        className={`sheet-overlay ${isOpen ? "open" : ""}`}
        onClick={handleOverlayClick}
        id="sheet-overlay"
      />

      {/* Bottom Sheet */}
      <div
        className={`bottom-sheet ${isOpen ? "open" : ""}`}
        id="bottom-sheet"
      >
        <div className="sheet-handle" />

        {!showEntities ? (
          /* Vista principal do Menu */
          <div id="menu-main">
            <div
              className="font-heading text-[20px] tracking-[0.5px] px-5 mb-2"
              style={{ color: "var(--text)" }}
            >
              Menu
            </div>

            {/* Sobre a Atlética */}
            <button className="sheet-item" id="menu-sobre">
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
            </button>

            {/* Outras Entidades */}
            <button
              className="sheet-item"
              onClick={() => setShowEntities(true)}
              id="menu-entidades"
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
                <div className="text-[14px]">Outras Entidades</div>
                <span className="text-[12px] block mt-[1px]" style={{ color: "var(--text3)" }}>
                  CA, Bateria, República
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "var(--text3)" }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="divider !mx-5 !my-[6px]" />

            {/* Contato */}
            <button className="sheet-item" id="menu-contato">
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <div>
                <div className="text-[14px]">Contato</div>
                <span className="text-[12px] block mt-[1px]" style={{ color: "var(--text3)" }}>
                  Fale conosco pelo WhatsApp
                </span>
              </div>
            </button>
          </div>
        ) : (
          /* Sub-view: Outras Entidades */
          <div id="menu-entities-list">
            <button
              className="flex items-center gap-[6px] py-[10px] px-5 text-[13px]"
              style={{ color: "var(--text2)" }}
              onClick={() => setShowEntities(false)}
              id="entities-back"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Voltar
            </button>

            <div
              className="font-heading text-[20px] tracking-[0.5px] px-5 mb-2"
              style={{ color: "var(--text)" }}
            >
              Outras Entidades
            </div>

            <button className="sheet-item" id="entity-ca">
              <span className="text-[18px]">🎓</span>
              <div>
                <div className="text-[14px]">Centro Acadêmico</div>
                <span className="text-[12px] block mt-[1px]" style={{ color: "var(--text3)" }}>
                  Representação estudantil
                </span>
              </div>
            </button>

            <button className="sheet-item" id="entity-bateria">
              <span className="text-[18px]">🥁</span>
              <div>
                <div className="text-[14px]">Bateria</div>
                <span className="text-[12px] block mt-[1px]" style={{ color: "var(--text3)" }}>
                  A bateria universitária da BA
                </span>
              </div>
            </button>

            <button className="sheet-item" id="entity-republica">
              <span className="text-[18px]">🏠</span>
              <div>
                <div className="text-[14px]">República BA</div>
                <span className="text-[12px] block mt-[1px]" style={{ color: "var(--text3)" }}>
                  A república oficial dos alunos
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
