"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { tools, searchTools } from "@/lib/tools";
import { CATEGORY_ORDER } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const content = (
    <nav aria-label="Tools navigation" className="space-y-4">
      {CATEGORY_ORDER.map((category) => {
        const categoryTools = tools.filter((t) => t.category === category);
        const isCollapsed = collapsed[category];
        return (
          <div key={category}>
            <button
              type="button"
              onClick={() => toggleCategory(category)}
              className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wide text-brand-silver-muted transition hover:text-brand-yellow"
            >
              {category}
              <ChevronDown className={cn("h-4 w-4 transition", isCollapsed && "-rotate-90")} />
            </button>
            {!isCollapsed && (
              <ul className="mt-2 space-y-0.5">
                {categoryTools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-sm transition",
                        pathname === `/tools/${tool.slug}`
                          ? "bg-brand-red/15 font-medium text-brand-orange ring-1 ring-brand-red/25"
                          : "text-brand-silver hover:bg-brand-navy-light/40 hover:text-brand-white"
                      )}
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        type="button"
        className="fixed bottom-4 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-orange text-brand-white shadow-lg shadow-brand-red/40 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close tools menu" : "Open tools menu"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-brand-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto border-r border-brand-navy-light/40 bg-brand-navy p-4 pt-20 transition-transform lg:static lg:z-auto lg:block lg:rounded-xl lg:pt-4",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {content}
      </aside>
    </>
  );
}

export function ToolSearch({
  onNavigate,
  variant = "dark",
}: {
  onNavigate?: () => void;
  variant?: "light" | "dark";
}) {
  const [query, setQuery] = useState("");
  const results = query ? searchTools(query).slice(0, 8) : [];

  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="tool-search" className="sr-only">
        Search tools
      </label>
      <input
        id="tool-search"
        type="search"
        placeholder="Search tools..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={cn(
          "w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2",
          variant === "dark"
            ? "border border-brand-navy-light/60 bg-brand-navy/60 text-brand-white placeholder:text-brand-silver-muted focus:border-brand-blue focus:ring-brand-blue/30"
            : "input-brand"
        )}
      />
      {results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-brand-navy-light/60 bg-brand-navy py-1 shadow-2xl shadow-brand-black/50">
          {results.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                onClick={() => { setQuery(""); onNavigate?.(); }}
                className="block px-4 py-2 text-sm text-brand-silver transition hover:bg-brand-navy-light/50 hover:text-brand-yellow"
              >
                <span className="font-medium">{tool.name}</span>
                <span className="ml-2 text-brand-silver-muted">{tool.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
