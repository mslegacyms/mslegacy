import { PublicCTA } from "@/components/public/PublicComponents";

interface CTAStripProps {
  title?: string;
  subtitle?: string;
  primaryText?: string;
  primaryHref?: string;
}
export function CTAStrip({
  title,
  subtitle,
  primaryText,
  primaryHref,
}: CTAStripProps) {
  return (
    <PublicCTA
      title={title}
      text={subtitle}
      action={primaryText}
      href={primaryHref}
    />
  );
}
