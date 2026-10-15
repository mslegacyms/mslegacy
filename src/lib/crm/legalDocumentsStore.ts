import { LegalDocumentDraft } from "../types/legalDocuments";
import { isUuid } from "../validation/intake";

export const initialMockDrafts: LegalDocumentDraft[] = [];
function storageKey(ownerId: string) {
  if (!isUuid(ownerId)) throw new Error("An authenticated draft owner is required.");
  return `mslegacy_working_drafts_v2:${ownerId}`;
}
export function getStoredDrafts(ownerId: string): LegalDocumentDraft[] {
  const key = storageKey(ownerId);
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(key) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((draft): draft is LegalDocumentDraft => !!draft && typeof draft === "object" && draft.createdById === ownerId && typeof draft.id === "string")
      .map(draft => ({ ...draft, status: draft.status === "approved_for_print" ? "draft" : draft.status }));
  } catch { return []; }
}
export function saveStoredDrafts(drafts: LegalDocumentDraft[], ownerId: string): void {
  const key = storageKey(ownerId);
  if (drafts.some(draft => draft.createdById !== ownerId || draft.status === "approved_for_print")) throw new Error("Only your working drafts can be saved. Official approval is unavailable.");
  if (typeof window !== "undefined") sessionStorage.setItem(key, JSON.stringify(drafts));
}
export function getStoredDraftById(id: string, ownerId: string): LegalDocumentDraft | null {
  return getStoredDrafts(ownerId).find(draft => draft.id === id) || null;
}
export function upsertStoredDraft(draft: LegalDocumentDraft, ownerId: string): void {
  if (draft.createdById !== ownerId || draft.status === "approved_for_print") throw new Error("Working drafts cannot be approved for execution in this browser.");
  const drafts = getStoredDrafts(ownerId), index = drafts.findIndex(item => item.id === draft.id);
  const updated = { ...draft, updatedAt: new Date().toISOString() };
  if (index >= 0) drafts[index] = updated; else drafts.push(updated);
  saveStoredDrafts(drafts, ownerId);
}
export function deleteStoredDraft(id: string, ownerId: string): void {
  saveStoredDrafts(getStoredDrafts(ownerId).filter(draft => draft.id !== id), ownerId);
}
