import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Mail, MessageSquare } from "lucide-react";
import { UpdateInquiryStatusButton } from "./status-button";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900">Inquiries</h1>
        <p className="text-sm text-ink-500 mt-1">Messages submitted via the contact form</p>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink-200 p-12 text-center text-ink-500">
          No inquiries yet.
        </div>
      ) : (
        <div className="space-y-3">
          {(inquiries as any[]).map((inq: any) => (
            <div key={inq.id} className="bg-white rounded-2xl border border-ink-200 p-5 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="h-9 w-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary-700">{inq.name[0]?.toUpperCase()}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink-900 truncate">{inq.name}</p>
                    <a href={`mailto:${inq.email}`} className="text-xs text-primary-600 hover:underline flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {inq.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <UpdateInquiryStatusButton id={inq.id} currentStatus={inq.status} />
                  <StatusBadge status={inq.status} />
                </div>
              </div>
              <p className="text-sm text-ink-700 mt-3 leading-relaxed">{inq.message}</p>
              <div className="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between text-xs text-ink-500">
                <span>{formatDate(inq.createdAt)}</span>
                {inq.reason && <span className="text-[10px] font-bold tracking-widest uppercase">Reason: {inq.reason}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
