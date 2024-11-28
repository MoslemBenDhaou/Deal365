import Link from "next/link"
import { CheckCircle2, Package2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-lg font-semibold text-primary"
      >
        <Package2 className="h-6 w-6" />
        <span>Deal365</span>
      </Link>
      
      <div className="rounded-lg border-2 border-primary/10 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="mb-2 text-2xl font-bold">Order Successfully Placed!</h1>
        <p className="mb-6 text-muted-foreground">
          Thank you for your order. We've sent a confirmation email with your order details and affiliate link.
        </p>
        <div className="mx-auto max-w-md space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="mb-2 text-sm font-medium">Your affiliate link</div>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-muted px-2 py-1 text-sm">
                https://deal365.com/ref/abc123
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText('https://deal365.com/ref/abc123')}
              >
                Copy
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Share your affiliate link with others to potentially reduce the final price!
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/dashboard">View Order Status</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 rounded-lg border p-6">
        <h2 className="text-lg font-semibold">What happens next?</h2>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <div className="font-medium">1. Campaign End</div>
            <div className="text-sm text-muted-foreground">
              The campaign will end in 5 days. The final price will be determined based on the total number of orders.
            </div>
          </div>
          <div className="grid gap-1">
            <div className="font-medium">2. Price Confirmation</div>
            <div className="text-sm text-muted-foreground">
              You'll receive an email with the final price once the campaign ends.
            </div>
          </div>
          <div className="grid gap-1">
            <div className="font-medium">3. Shipping</div>
            <div className="text-sm text-muted-foreground">
              Your order will be shipped within 5-7 business days after the campaign ends.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Need help?{" "}
        <Link href="/support" className="text-primary underline-offset-4 hover:underline">
          Contact our support team
        </Link>
      </div>
    </div>
  )
}

