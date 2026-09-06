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
  DRAFT: "bg-[#232330] text-[#9CA3AF] border-[#3A3A50]",
  PUBLISHED: "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20",
  CLOSED: "bg-[#232330] text-[#6B7280] border-[#3A3A50]",
  PENDING: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
  APPROVED: "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20",
  REJECTED: "bg-[#F87171]/10 text-[#F87171] border-[#F87171]/20",
  NEW: "bg-[#6366F1]/10 text-[#818CF8] border-[#6366F1]/20",
  READ: "bg-[#232330] text-[#9CA3AF] border-[#3A3A50]",
  RESOLVED: "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20",
  CONFIRMED: "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20",
  WAITLISTED: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
  CANCELLED: "bg-[#232330] text-[#6B7280] border-[#3A3A50]",
  SUCCEEDED: "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20",
  FAILED: "bg-[#F87171]/10 text-[#F87171] border-[#F87171]/20",
};

const DOT_COLORS: Record<Status, string> = {
  DRAFT: "bg-[#6B7280]",
  PUBLISHED: "bg-[#34D399]",
  CLOSED: "bg-[#6B7280]",
  PENDING: "bg-[#F59E0B]",
  APPROVED: "bg-[#34D399]",
  REJECTED: "bg-[#F87171]",
  NEW: "bg-[#818CF8]",
  READ: "bg-[#6B7280]",
  RESOLVED: "bg-[#34D399]",
  CONFIRMED: "bg-[#34D399]",
  WAITLISTED: "bg-[#F59E0B]",
  CANCELLED: "bg-[#6B7280]",
  SUCCEEDED: "bg-[#34D399]",
  FAILED: "bg-[#F87171]",
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
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT_COLORS[status] ?? "bg-[#6B7280]")} />
      {status.toLowerCase()}
    </span>
  );
}
