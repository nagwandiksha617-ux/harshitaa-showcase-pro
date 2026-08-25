import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navLinks, profile } from "@/data/portfolio";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className={cn(
            "font-display text-sm font-semibold tracking-tight transition-colors sm:text-base",
            scrolled ? "text-foreground" : "text-white",
          )}
        >
          {profile.name}
          <span className="text-primary">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-muted-foreground hover:bg-accent hover:text-foreground"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
                active === link.href && (scrolled ? "text-primary" : "text-white"),
              )}
            >
              {link.label}
            </a>
          ))}
          <Button asChild size="sm" className="ml-2 rounded-full">
            {/* REPLACE: resumeUrl in src/data/portfolio.ts */}
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
            scrolled ? "text-foreground hover:bg-accent" : "text-white hover:bg-white/10",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background px-5 pb-5 pt-2 md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-3 w-full rounded-full">
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              View resume
            </a>
          </Button>
        </div>
      ) : null}
    </header>
  );
}
