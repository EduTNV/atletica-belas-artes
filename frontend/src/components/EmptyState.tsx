export function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-[14px]" style={{ color: "var(--text3)" }}>{text}</p>
    </div>
  );
}
