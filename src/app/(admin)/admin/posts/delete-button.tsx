"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deletePostAction } from "@/actions/blog";

export function DeletePostButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const onDelete = () => {
    startTransition(async () => {
      await deletePostAction(id);
    });
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={onDelete}
          disabled={pending}
          className="px-2 py-1 text-xs font-semibold rounded bg-[#F87171] text-white hover:bg-[#EF4444] transition disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 text-xs font-semibold rounded bg-ink-100 text-ink-700 hover:bg-ink-200 transition"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 rounded hover:bg-[#F87171]/10 text-ink-600 hover:text-[#F87171]"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
