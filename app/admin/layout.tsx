import { Package2 } from 'lucide-react'
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-semibold text-primary"
            >
              <Package2 className="h-6 w-6" />
              <span>Deal365 Admin</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4">
          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b-0 pl-0">
              <TabsTrigger value="campaigns" asChild>
                <Link href="/admin/campaigns">Campaigns</Link>
              </TabsTrigger>
              <TabsTrigger value="orders" asChild>
                <Link href="/admin/orders">Orders</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
      <Toaster />
    </div>
  )
}

