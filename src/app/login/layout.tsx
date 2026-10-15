import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = {"title": "Private portal sign-in | MS LEGACY", "description": "Sign in to an authorized MS LEGACY account.", "alternates": {"canonical": "/login"}, "robots": {"index": false, "follow": false}};
export default function Layout({ children }: { children: ReactNode }) { return children; }
