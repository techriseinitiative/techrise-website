"use client";

import { useState, useTransition } from "react";
import { updateInquiryStatusAction } from "@/actions/inquiry";
import type { InquiryStatus } from "@prisma/client";

const NEXT_STATUS: Record<InquiryStatus, InquiryStatus | null> = {
  NEW: "READ",
  READ: "RESOLVED",
  RESOLVED: null,
};

const BUTTON_LABELS: Record<InquiryStatus, string> = {
  NEW: "Mark as read",
  READ: "Mark resolved",
  RESOLVED: "Resolved",
};

export function UpdateInquiryStatusButton({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: InquiryStatus;
}) {
  const [pending, startTransition] = useTransition();
  const next = NEXT_STATUS[currentStatus];

  if (!next) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        Resolved
      </span>
    );
  }

  const onUpdate = () => {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("id", id);
      fd.set("status", next);
      await updateInquiryStatusAction(fd);
    });
  };

  return (
    <button
      onClick={onUpdate}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-semibold text-ink-700 hover:border-ink-300 hover:bg-ink-50 transition disabled:opacity-50"
    >
      {pending ? "..." : BUTTON_LABELS[currentStatus]}
    </button>
  );
}
