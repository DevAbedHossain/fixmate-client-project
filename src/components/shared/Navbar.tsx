"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User2, Wrench, X } from "lucide-react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
] as const;

function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

const authLinkClass = cn(
  buttonVariants({ variant: "outline" }),
  "h-10 border-brand/30 px-5 text-brand hover:bg-brand/5 hover:text-brand",
);

const signUpLinkClass = cn(
  buttonVariants(),
  "h-10 bg-brand px-5 text-brand-foreground hover:bg-brand/90",
);

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          href="/"
          className="flex w-fit items-center gap-2.5"
          aria-label="FixMate home"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm">
            <Wrench className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span className="text-2xl font-bold tracking-tight">FixMate</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const isActive = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex h-16 items-center text-sm font-medium transition-colors hover:text-brand",
                  isActive ? "text-brand" : "text-muted-foreground",
                )}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center justify-end gap-3 md:flex">
          {
            user ? <>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button className="border-none border-transparent" variant="outline">
                  <Avatar>
                    <AvatarImage src={user.image as string} alt={user.name} />
                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                  </Avatar>
                  {user.name}
                </Button>} />
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <Link href={`/dashboard/${user.role}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        <User2 />
                        {user.name}
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOutIcon />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </> : <>
              <Link href="/sign-in" className={authLinkClass}>
                Sign In
              </Link>
              <Link href="/sign-up" className={signUpLinkClass}>
                Sign Up
              </Link>
            </>
          }

        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 justify-self-end md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navbar-menu"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navbar-menu"
          className="border-t border-border/60 bg-background md:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile"
          >
            {navLinks.map((link) => {
              const isActive = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                    isActive ? "bg-brand/10 text-brand" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border/60 pt-4">
              {
                user ? <>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button className="border-none border-transparent" variant="outline">
                      <Avatar>
                        <AvatarImage src={user.image as string} alt={user.name} />
                        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                      </Avatar>
                      {user.name}
                    </Button>} />
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <Link href={`/dashboard/${user.role}`} onClick={closeMenu}>
                          <DropdownMenuItem className="cursor-pointer">
                            <User2 />
                            {user.name}
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                        <LogOutIcon />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                </> : <>
                  <Link
                    href="/sign-in"
                    onClick={closeMenu}
                    className={authLinkClass}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={closeMenu}
                    className={signUpLinkClass}
                  >
                    Sign Up
                  </Link>
                </>
              }

            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
