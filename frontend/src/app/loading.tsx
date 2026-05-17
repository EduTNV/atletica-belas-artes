export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] content-wrapper">
      <div 
        className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mb-4"
        style={{ borderColor: "var(--crimson)", borderRightColor: "transparent", borderLeftColor: "transparent" }}
      />
      <p 
        className="text-[15px] md:text-[16px] font-medium tracking-wide" 
        style={{ color: "var(--text3)", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
      >
        Carregando...
      </p>
    </div>
  );
}
