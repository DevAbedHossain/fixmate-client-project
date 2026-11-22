"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

function prettySegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/** "/dashboard/customer/bookings" → "Bookings", "/dashboard/customer" → "Overview" */
function getPageTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  const last = segments[segments.length - 1] ?? "dashboard"
  if (["customer", "technician", "admin", "dashboard"].includes(last)) return "Overview"
  if (segments.includes("edit-service")) return "Edit Service"
  return prettySegment(last)
}

/** Dashboard top bar: sidebar toggle, page title, link home, and the user's avatar/name/role. */
const DashboardHeader = () => {
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-5">
      <SidebarTrigger className="shrink-0" />
      <Separator orientation="vertical" className="h-5" />

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold sm:text-base">{getPageTitle(pathname)}</h1>
        <p className="hidden truncate text-xs text-muted-foreground sm:block">FixMate Dashboard</p>
      </div>

      <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm", className: "gap-1.5" })}>
        <Home className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {user && (
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            {user.image && <AvatarImage src={user.image} alt={user.name} />}
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="hidden leading-tight md:block">
            <p className="max-w-36 truncate text-sm font-medium">{user.name}</p>
            <Badge variant="secondary" className="h-4 px-1.5 text-[10px] capitalize">
              {user.role}
            </Badge>
          </div>
        </div>
      )}
    </header>
  )
}

export default DashboardHeader
