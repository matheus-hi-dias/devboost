"use client";

import { SECTIONS } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import {
  SunIcon,
  MoonIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenu) {
      const onKey = (e: KeyboardEvent) =>
        e.key === "Escape" && setMobileMenu(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [mobileMenu]);

  function scrollToSection(id: string): void {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    section?.focus();
  }

  return (
    <header
      className={`fixed z-30 top-0 left-0 w-full transition backdrop-blur ${
        scrolled
          ? "shadow-card bg-background/80 border-primary"
          : "bg-gradient-to-r from-[hsl(var(--primary)/0.1)] to-[hsl(var(--background)/0.5)]"
      }`}
      aria-label="Menu principal"
    >
      <nav className="container flex items-center justify-between px-3 md:px-4 py-3 md:py-4">
        <a
          href="#hero"
          className="text-2xl font-bold text-primary hover:underline focus:outline"
        >
          DevBoost
        </a>

        <ul className="hidden md:flex gap-5 text-base md:gap-7">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={`Ir para seção ${label}`}
                className="px-2 py-1 font-medium text-muted-foreground hover:text-primary focus:ring-2 focus:ring-primary rounded transition outline-none"
                onClick={e => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 items-center">
          <button
            onClick={toggle}
            className="rounded-md p-2 transition hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-md transition hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu(prev => !prev)}
          >
            {mobileMenu ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
      {mobileMenu && (
        <nav
          className="md:hidden bg-[hsl(var(--background)/0.95)] absolute left-0 top-full w-full shadow-card border-b z-40 animate-fade-in"
          aria-label="Menu de navegação mobile"
        >
          <ul className="flex flex-col gap-3 px-6 py-4">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block py-2.5 px-2 font-semibold text-muted-foreground hover:text-primary focus:text-primary"
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection(id);
                    setMobileMenu(false);
                  }}
                  aria-label={`Ir para seção ${label}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
