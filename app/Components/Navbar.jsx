"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="mt-10 px-4 pt-4 sm:pt-6">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-15 w-full   container items-center justify-between rounded-md  px-4 shadow-[0_14px_34px_rgba(0,0,0,0.12)] backdrop-blur md:px-5"
      >
        <Link
          href="/"
          aria-label="Blitz Pixel Media home"
          className="flex shrink-0 items-center"
          onClick={closeMenu}
        >
          <Image
            src="/logos/logo white-06.svg"
            alt="Blitz Pixel Media"
            width={140}
            height={100}
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 font-bricolage md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors duration-400 hover:text-orangish-red uppercase ${isActive ? "text-orangish-red" : "text-neutral-500"
                  }`}
              >
                {item.label}

              </Link>
            );
          })}
        </div>



        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-5 font-bricolage text-black text-sm font-semibold transition-colors hover:bg-orangish-red hover:text-white"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-white text-black transition-colors hover:bg-almond-cream md:hidden"
        >
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      <div
        className={`mx-auto mt-2 w-full max-w-5xl overflow-hidden rounded-md border border-black/10 bg-white/95 shadow-[0_14px_34px_rgba(0,0,0,0.12)] backdrop-blur transition-all duration-200 md:hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
          }`}
      >
        <div className="flex flex-col p-3 font-bricolage">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={closeMenu}
                className={`rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-almond-cream ${isActive ? "text-orangish-red" : "text-neutral-500"
                  }`}
              >
                {item.label}
              </Link>

            );
          })}

          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-2 inline-flex h-12 items-center justify-center rounded-md bg-black px-5 font-bricolage text-sm font-semibold text-orangish-red transition-colors hover:bg-orangish-red hover:text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
