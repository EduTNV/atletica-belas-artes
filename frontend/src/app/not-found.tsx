import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] content-wrapper text-center">
      <h1 
        className="font-heading tracking-wide mb-2" 
        style={{ fontSize: "clamp(80px, 15vw, 120px)", color: "var(--crimson)", lineHeight: 1 }}
      >
        404
      </h1>
      
      <h2 className="font-heading text-[32px] md:text-[40px] mb-4" style={{ color: "var(--text)" }}>
        Página não encontrada
      </h2>
      
      <p className="text-[15px] md:text-[16px] mb-8 max-w-[400px] mx-auto" style={{ color: "var(--text2)" }}>
        A página que você está procurando não existe, foi removida ou está temporariamente indisponível.
      </p>
      
      <Link
        href="/"
        className="font-bold transition-opacity hover:opacity-85 inline-block"
        style={{
          background: "var(--crimson)",
          color: "#f4f4f4",
          borderRadius: "8px",
          padding: "12px 32px",
          fontSize: "15px",
        }}
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
