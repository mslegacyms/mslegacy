"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "@/components/ui/Icons";

const navigation = [
  { label: "Properties", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Guides", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <Link
          href="/"
          aria-label="MS LEGACY home"
          className="site-brand-logo"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/mslegacy-logo-web.svg"
            alt="MS LEGACY"
            width={144}
            height={144}
            priority
          />
        </Link>
        <nav className="site-desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "page"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/project-enquiry" className="site-button site-header-cta">
          Discuss my requirement <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="site-menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="site-mobile-nav"
        hidden={!open}
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          className="site-button"
          href="/project-enquiry"
          onClick={() => setOpen(false)}
        >
          Discuss my requirement
        </Link>
      </nav>
    </header>
  );
}
