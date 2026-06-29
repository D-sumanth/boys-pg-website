import {
  BarChart3,
  BedDouble,
  CalendarDays,
  CreditCard,
  FileText,
  Home,
  Inbox,
  LogOut,
  ReceiptIndianRupee,
  Settings,
  UserRound,
  WalletCards,
} from "lucide-react"
import { logoutAction } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import type { AdminUser } from "@/lib/admin/auth"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/today", label: "Today", icon: CalendarDays },
  { href: "/admin/rooms", label: "Rooms", icon: BedDouble },
  { href: "/admin/residents", label: "Residents", icon: UserRound },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/rent", label: "Rent", icon: ReceiptIndianRupee },
  { href: "/admin/deposits", label: "Deposits", icon: WalletCards },
  { href: "/admin/expenses", label: "Expenses", icon: FileText },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminShell({ admin, children }: { admin: AdminUser; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-background p-4 lg:block">
        <a href="/admin/dashboard" className="flex items-center gap-3 rounded-2xl bg-primary p-4 text-primary-foreground">
          <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-foreground/15">
            <Home className="size-6" />
          </span>
          <span>
            <span className="block font-heading text-lg font-bold">Prince Deluxe PG</span>
            <span className="text-xs text-primary-foreground/70">Admin System</span>
          </span>
        </a>

        <nav className="mt-5 grid gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/78 transition-colors hover:bg-secondary hover:text-primary"
            >
              <item.icon className="size-4 text-accent" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-heading text-base font-bold text-primary sm:text-lg">Admin Dashboard</p>
              <p className="text-xs text-muted-foreground">
                {admin.fullName} • {admin.role}
              </p>
            </div>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm" className="gap-2">
                <LogOut className="size-4" />
                Logout
              </Button>
            </form>
          </div>

          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Admin mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-sm"
              >
                <item.icon className="size-4 text-accent" />
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
