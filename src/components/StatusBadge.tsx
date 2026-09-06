import { cn } from "@/lib/cn";

type Status =
  | "DRAFT"
  | "PUBLISHED"
  | "CLOSED"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "NEW"
  | "READ"
  | "RESOLVED"
  | "CONFIRMED"
  | "WAITLISTED"
  | "CANCELLED"
  | "SUCCEEDED"
  | "FAILED";

const STYLES: Record<Status, string> = {
  DRAFT: "bg-ink-100 text-ink-700 border-ink-200",
  PUBLISHED: "bg-success/10 text-success border-success/20",
  CLOSED: "bg-ink-100 text-ink-500 border-ink-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-success/10 text-success border-success/20",
  REJECTED: "bg-error/10 text-error border-error/20",
  NEW: "bg-primary-50 text-primary-700 border-primary-200",
  READ: "bg-ink-100 text-ink-700 border-ink-200",
  RESOLVED: "bg-success/10 text-success border-success/20",
  CONFIRMED: "bg-success/10 text-success border-success/20",
  WAITLISTED: "bg-amber-50 text-amber-700 border-amber-200",
  CANCELLED: "bg-ink-100 text-ink-500 border-ink-200",
  SUCCEEDED: "bg-success/10 text-success border-success/20",
  FAILED: "bg-error/10 text-error border-error/20",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        STYLES[status] ?? STYLES.DRAFT,
        className
      )}
    >
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        status === "PUBLISHED" || status === "APPROVED" || status === "SUCCEEDED" || status === "RESOLVED" || status === "CONFIRMED"
          ? "bg-success"
          : status === "FAILED" || status === "REJECTED"
          ? "bg-error"
          : status === "WAITLISTED" || status === "PENDING"
          ? "bg-amber-500"
          : "bg-ink-400"
      )} />
      {status.toLowerCase()}
    </span>
  );
}
