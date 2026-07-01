"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

/**
 * Premium Empty State placeholder component.
 */
export function EmptyState({
  title = "No Records Found",
  description = "No data matched the current filters or directory search.",
  actionLabel,
  onActionClick
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}) {
  return (
    <Card className="py-12 px-6 text-center max-w-md mx-auto space-y-4 bg-white border border-slate-100 shadow-xs">
      <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-[#8b6e3a]">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" />
        </svg>
      </div>
      <div className="space-y-1">
        <h4 className="font-serif text-base font-bold text-[#10291f]">{title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed px-4">{description}</p>
      </div>
      {actionLabel && onActionClick && (
        <Button variant="outline" size="sm" onClick={onActionClick} className="font-semibold text-xs mt-2">
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}

/**
 * Premium Loading Spinner component.
 */
export function LoadingState({
  message = "Retrieving secure files..."
}: {
  message?: string;
}) {
  return (
    <div className="py-16 text-center space-y-3">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-[#8b6e3a] rounded-full animate-spin mx-auto" />
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{message}</p>
    </div>
  );
}

/**
 * Premium Error Banner component.
 */
export function ErrorState({
  title = "System Request Failed",
  description = "A database connection timeout or validation check failed.",
  actionLabel = "Retry Action",
  onActionClick
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}) {
  return (
    <Card className="p-6 text-center max-w-md mx-auto space-y-4 bg-rose-500/5 border border-rose-500/10">
      <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto text-rose-600">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="space-y-1">
        <h4 className="font-serif text-base font-bold text-rose-800">{title}</h4>
        <p className="text-xs text-rose-600 leading-relaxed px-4">{description}</p>
      </div>
      {onActionClick && (
        <Button variant="outline" size="sm" onClick={onActionClick} className="font-semibold text-xs text-rose-700 border-rose-200 hover:bg-rose-500/5 mt-2">
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
