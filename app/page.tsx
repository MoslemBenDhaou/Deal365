import Image from "next/image"
import Link from "next/link"
import { Info, Sparkles, Package2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CountdownTimer } from "@/components/countdown-timer"
import { PriceLevels } from "@/components/price-levels"
import { StockIndicator } from "@/components/stock-indicator"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import { UserNav } from "@/components/auth/user-nav"
import { CopyButton } from "@/components/copy-button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Page() {
  // This would come from your backend
  const currentOrders = 42
  const endTime = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
  const totalStock = 200
  const remainingStock = 58
  const isLowStock = remainingStock < 20
  const isSoldOut = remainingStock === 0
  const affiliateLink = "https://deal365.com/ref/user123"
  const priceLevels = [
    { price: 299.99, orders: 25, isCompleted: true, isActive: false },
    { price: 249.99, orders: 50, isCompleted: false, isActive: true },
    { price: 199.99, orders: 100, isCompleted: false, isActive: false },
    { price: 149.99, orders: 200, isCompleted: false, isActive: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Package2 className="h-8 w-8" />
            <span className="text-xl font-bold">Deal365</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>

        <div className="mb-8 text-center">
          <Badge variant="secondary" className="mb-4 animate-float">
            <Sparkles className="mr-1 h-3 w-3" />
            Weekly Deal
          </Badge>
          <h1 className="mb-2 bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Premium Home Theater Bundle
          </h1>
          <p className="text-lg text-muted-foreground">
            The more people order, the lower the price gets!
          </p>
        </div>

        <Alert className="mb-8 bg-secondary/50">
          <Info className="h-4 w-4" />
          <AlertTitle>How it works</AlertTitle>
          <AlertDescription>
            Orders are confirmed when the campaign ends. The final price depends on the total number of orders. 
            Share your affiliate link to invite others and potentially reduce the price further!
          </AlertDescription>
        </Alert>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="group aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src="/placeholder.svg"
                alt="Product bundle"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="group aspect-square overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src="/placeholder.svg"
                    alt={`Product image ${i + 1}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <Card className="overflow-hidden border-2">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="text-sm font-medium text-muted-foreground">
                    Deal ends in
                  </div>
                  <CountdownTimer endTime={endTime} />
                </div>
                <div className="mb-6">
                  <div className="mb-2 text-sm font-medium text-muted-foreground">
                    Current price
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-bold text-primary">$249.99</div>
                    <div className="text-sm text-muted-foreground line-through">
                      $399.99
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <StockIndicator
                    total={totalStock}
                    remaining={remainingStock}
                    isLowStock={isLowStock}
                  />
                </div>
                {!isSoldOut ? (
                  <Button className="w-full bg-primary/90 hover:bg-primary" size="lg" asChild>
                    <Link href="/order">Order Now ({currentOrders} orders)</Link>
                  </Button>
                ) : (
                  <WaitlistDialog />
                )}
                {currentOrders > 0 && (
                  <div className="mt-6 space-y-3">
                    <div className="text-sm font-medium">Your affiliate link</div>
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-2">
                      <div className="truncate text-sm text-muted-foreground">
                        {affiliateLink}
                      </div>
                      <CopyButton value={affiliateLink} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <div>
              <h2 className="mb-4 text-lg font-semibold">Price Levels</h2>
              <PriceLevels levels={priceLevels} currentOrders={currentOrders} />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Bundle Details</h2>
          <div className="prose max-w-none">
            <p>
              Experience cinema-quality entertainment at home with our Premium Home
              Theater Bundle. This carefully curated package includes:
            </p>
            <ul>
              <li>4K Ultra HD Smart Projector with HDR</li>
              <li>100" Motorized Projection Screen</li>
              <li>7.1 Channel Surround Sound System</li>
              <li>Professional Installation Service</li>
            </ul>
            <p>
              This exclusive bundle brings together top-of-the-line components to
              transform your living space into an immersive entertainment
              sanctuary. The more people who join this group buy, the lower the
              price becomes for everyone!
            </p>
            <div className="not-prose mt-8 rounded-xl border-2 bg-secondary/20 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold">Affiliate Program</h3>
              <p className="mb-4 text-muted-foreground">
                After placing your order, you'll receive a unique affiliate link. Share it with others to:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary" />
                  Help reduce the final price for everyone (including yourself)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary" />
                  Track how many people ordered through your link
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary" />
                  Earn rewards when people use your affiliate link
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

