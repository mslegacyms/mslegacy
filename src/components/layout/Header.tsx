"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Developers", href: "/developers" },
    { name: "Requirements", href: "/requirements" },
    { name: "Calculators", href: "/calculators" },
    { name: "News", href: "/news" },
    { name: "Govt Links", href: "/government-links" },
    { name: "Wealth Score", href: "/property-wealth-score" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-xs border-slate-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0 my-2">
            <Link href="/" className="flex items-center space-x-2 rounded-xl bg-white border border-[#d9c79f]/60 shadow-xs px-3 py-1.5 transition-transform hover:scale-102">
              <img 
                src="/brand/mslegacy-logo.svg" 
                alt="MS Legacy Logo" 
                className="h-12 sm:h-16 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-sans text-sm font-semibold tracking-wide transition-all duration-300 pb-1 hover:text-[#8b6e3a] focus-visible:ring-2 focus-visible:ring-[#8b6e3a]/40 focus:outline-none rounded border-b-2",
                    isActive
                      ? "text-[#8b6e3a] border-[#8b6e3a]"
                      : "text-[#10291f] border-transparent hover:text-[#8b6e3a] hover:border-[#8b6e3a]/40"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link href="/login">
              <Button variant="outline" size="sm" className="font-semibold text-xs tracking-wide">
                Client Login
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#10291f] hover:text-[#8b6e3a] p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-24 bg-white z-40 transition-all duration-300 transform",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="px-4 pt-4 pb-6 space-y-3 bg-white shadow-lg border-t border-slate-100">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-2.5 text-base font-semibold transition-all border-l-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6e3a]/40",
                  isActive
                    ? "border-[#8b6e3a] text-[#8b6e3a] bg-slate-50/50"
                    : "border-transparent text-[#10291f] hover:bg-slate-50 hover:text-[#8b6e3a]"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100 px-3">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="primary" fullWidth className="font-semibold tracking-wide">
                Client Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
