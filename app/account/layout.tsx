import { Package2 } from 'lucide-react'
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold text-primary"
            >
              <Package2 className="h-6 w-6" />
              <span>Deal365</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b">
        <div className="mx-auto max-w-6xl px-4">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b-0 pl-0">
              <TabsTrigger value="profile" asChild>
                <Link href="/account">Profile</Link>
              </TabsTrigger>
              <TabsTrigger value="orders" asChild>
                <Link href="/account/orders">Orders</Link>
              </TabsTrigger>
              <TabsTrigger value="addresses" asChild>
                <Link href="/account/addresses">Addresses</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <Toaster />
    </div>
  )
}

