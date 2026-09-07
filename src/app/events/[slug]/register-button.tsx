"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight, CheckCircle, X, AlertCircle } from "lucide-react";
import { registerForEventAction } from "@/actions/events";

export function RegisterButton({
  eventId,
  mode,
  isFull = false,
}: {
  eventId: string;
  mode: "register" | "register-waitlist" | "cancel";
  isFull?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const onRegister = () => {
    setError("");
    const fd = new FormData();
    fd.set("eventId", eventId);

    startTransition(async () => {
      const result = await registerForEventAction(fd);
      if (result?.success) {
        router.refresh();
      } else if (result?.error?.includes("signed in")) {
        router.push("/login");
      } else {
        setError(result?.error ?? "Failed to register");
      }
    });
  };

  if (mode === "cancel") {
    return (
      <div className="space-y-2">
        {error && (
          <div className="rounded-lg bg-[#F87171]/10 border border-[#F87171]/20 p-2 text-xs text-[#F87171] flex items-center gap-1.5">
            <AlertCircle className="h-3 w-3" />
            {error}
          </div>
        )}
        <button
          onClick={onRegister}
          disabled={pending}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#F87171]/30 bg-[#F87171]/5 px-4 py-2.5 text-sm font-semibold text-[#F87171] hover:bg-[#F87171]/10 transition disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          Cancel registration
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <div className="rounded-lg bg-[#F87171]/10 border border-[#F87171]/20 p-2 text-xs text-[#F87171] flex items-center gap-1.5">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}
      <button
        onClick={onRegister}
        disabled={pending}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition disabled:opacity-50 ${
          isFull
            ? "bg-[#EAB308] text-white hover:bg-[#F59E0B]"
            : "btn-primary"
        }`}
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isFull ? (
          <>
            Join waitlist
            <ArrowRight className="h-4 w-4" />
          </>
        ) : (
          <>
            Register now
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}
