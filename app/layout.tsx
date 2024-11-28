import { Quicksand } from "next/font/google"
import { getServerSession } from "next-auth/next"
import { SessionProvider } from "@/components/providers/session-provider"
import { authOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const quicksand = Quicksand({ subsets: ["latin"] })

export const metadata = {
  title: "Deal365 - Group Buying Platform",
  description: "Join group purchases and get better prices together",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en">
      <body className={cn(quicksand.className, "min-h-screen antialiased")}>
        <ThemeProvider defaultTheme="light">
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

