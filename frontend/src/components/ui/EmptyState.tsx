import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  text: string;
}

// Estado vacío reutilizable para listados sin resultados.
export function EmptyState({ icon: Icon, text }: EmptyStateProps) {
  return (
    <div className="surface rounded-[10px] py-12 px-6 text-center text-secondary">
      <Icon size={34} className="mx-auto" style={{ color: "var(--line-strong)" }} />
      <div className="mt-3 text-sm">{text}</div>
    </div>
  );
}
