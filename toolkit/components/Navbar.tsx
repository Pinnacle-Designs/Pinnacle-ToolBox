"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { CATEGORY_ORDER } from "@/lib/types";
import { tools } from "@/lib/tools";
import { ToolSearch } from "./Sidebar";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [pathname]);

  const closeMenus = () => {
    setMobileOpen(false);
    setCatOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-black/90 backdrop-blur-md">
      <div className="nav-accent-line" aria-hidden />
      <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-brand-navy-light/40 px-4 py-2 sm:py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Pinnacle Toolbox home"
        >
          <img
            src="/logo.png"
            alt="Pinnacle Toolbox"
            className="h-14 w-14 object-contain drop-shadow-[0_4px_20px_rgba(229,48,15,0.2)] sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
            width={72}
            height={72}
          />
        </Link>

        <div className="hidden flex-1 md:block">
          <ToolSearch onNavigate={closeMenus} variant="dark" />
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          <div className="relative">
            <button
              type="button"
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-1 text-sm font-medium text-brand-silver transition hover:text-brand-yellow"
              aria-expanded={catOpen}
            >
              Categories
              <ChevronDown className={cn("h-4 w-4 transition", catOpen && "rotate-180")} />
            </button>
            {catOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setCatOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-brand-navy-light/60 bg-brand-navy shadow-2xl shadow-brand-black/60">
                  {CATEGORY_ORDER.map((cat) => (
                    <Link
                      key={cat}
                      href={`/#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      onClick={() => setCatOpen(false)}
                      className="block px-4 py-2.5 text-sm text-brand-silver transition hover:bg-brand-navy-light/50 hover:text-brand-yellow"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          <Link href="/about" onClick={closeMenus} className="text-sm font-medium text-brand-silver transition hover:text-brand-orange">About</Link>
          <Link href="/contact" onClick={closeMenus} className="text-sm font-medium text-brand-silver transition hover:text-brand-orange">Contact</Link>
        </nav>

        <button
          type="button"
          className="ml-auto text-brand-silver lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-b border-brand-navy-light/40 bg-brand-navy/80 px-4 py-4 backdrop-blur lg:hidden">
          <ToolSearch onNavigate={closeMenus} variant="dark" />
          <nav className="mt-4 space-y-1" aria-label="Mobile navigation">
            {CATEGORY_ORDER.map((cat) => {
              const count = tools.filter((t) => t.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  onClick={closeMenus}
                  className="block rounded-lg px-3 py-2 text-sm text-brand-silver transition hover:bg-brand-navy-light/40 hover:text-brand-orange"
                >
                  {cat} ({count})
                </Link>
              );
            })}
            <Link href="/about" onClick={closeMenus} className="block rounded-lg px-3 py-2 text-sm text-brand-silver hover:text-brand-orange">About</Link>
            <Link href="/contact" onClick={closeMenus} className="block rounded-lg px-3 py-2 text-sm text-brand-silver hover:text-brand-orange">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
