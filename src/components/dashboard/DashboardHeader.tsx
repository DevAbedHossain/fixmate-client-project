"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BellIcon,
  LogOutIcon,
  User2,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "@/lib/auth-client"
import type { IRole } from "@/types/UserType"

function prettySegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function getPageTitle(pathname: string, role: IRole) {
  const segments = pathname.split("/").filter(Boolean) // e.g. ["dashboard", "customer", "bookings"]
  const rest = segments.slice(1)

  if (rest.length === 0) return "Dashboard"
  if (rest.length === 1 && rest[0] === role) return `${prettySegment(rest[0])} Dashboard`
  return prettySegment(rest[rest.length - 1])
}

const DashboardHeader = () => {
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user
  const role: IRole = (user?.role as IRole) || "customer"
  const title = getPageTitle(pathname, role)

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <SidebarTrigger className="shrink-0" />

      <Link
        href="/"
        className="flex w-fit items-center gap-2"
        aria-label="FixMate home"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
          <Wrench className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <span className="hidden text-lg font-bold tracking-tight sm:inline">
          FixMate
        </span>
      </Link>

      <div className="hidden h-6 w-px bg-border/60 md:block" aria-hidden="true" />

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold sm:text-base">{title}</h1>
        <p className="hidden truncate text-xs capitalize text-muted-foreground md:block">
          {role} Dashboard
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9 shrink-0"
        aria-label="Notifications"
      >
        <BellIcon className="size-5" aria-hidden="true" />
      </Button>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="border-none bg-transparent hover:bg-muted">
                <Avatar>
                  <AvatarImage src={user.image as string} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
                <span className="hidden max-w-28 truncate sm:inline">{user.name}</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <Link href="/dashboard/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User2 />
                  Update Profile
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
      ) : (
        <Link
          href="/sign-in"
          className="inline-flex h-9 items-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
        >
          Sign In
        </Link>
      )}
    </header>
  )
}

export default DashboardHeader
