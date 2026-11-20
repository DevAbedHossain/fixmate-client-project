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

      <div className="hidden h-6 w-px bg-border/60 md:block" aria-hidden="true" />

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold sm:text-base">{title}</h1>
        <p className="hidden truncate text-xs capitalize text-muted-foreground md:block">
          {role} Dashboard
        </p>
      </div>

      <Avatar>
        <AvatarImage src={user?.image as string | undefined} alt={user?.name ?? ""} />
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <span className="hidden max-w-28 truncate sm:inline">{user?.name}</span>

    </header>
  )
}

export default DashboardHeader
