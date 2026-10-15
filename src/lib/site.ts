export function getSiteOrigin(): string {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mslegacy.vercel.app");
    if (url.protocol !== "https:" || url.username || url.password) throw new Error("Invalid public origin");
    return url.origin;
  } catch { return "https://mslegacy.vercel.app"; }
}
