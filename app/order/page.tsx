import { Suspense } from "react"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Package2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AddressForm } from "@/components/address-form"
import { SavedAddresses } from "@/components/saved-addresses"
import { QuantitySelector } from "@/components/quantity-selector"
import { createOrder, getUserAddresses } from "@/lib/actions"
import { authOptions } from "@/lib/auth"

function OrderSummary({ 
  quantity, 
  currentPrice, 
  originalPrice 
}: { 
  quantity: number
  currentPrice: number
  originalPrice: number
}) {
  const total = currentPrice * quantity
  const originalTotal = originalPrice * quantity
  const savings = originalTotal - total

  return (
    <div className="rounded-lg border">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium">Premium Home Theater Bundle</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Quantity: {quantity}
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">${(currentPrice * quantity).toFixed(2)}</div>
            <div className="text-sm text-muted-foreground line-through">
              ${(originalPrice * quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-1.5 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">You save</span>
          <span className="text-green-600">${savings.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between font-medium">
          <div>Total</div>
          <div>${total.toFixed(2)}</div>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          Final price will be determined at campaign end
        </div>
      </div>
    </div>
  )
}

function OrderForm() {
  const currentPrice = 249.99
  const originalPrice = 399.99
  const maxQuantity = 5 // You might want to get this from your backend

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-lg font-semibold text-primary"
        >
          <Package2 className="h-6 w-6" />
          <span>Deal365</span>
        </Link>
        <h1 className="text-3xl font-bold">Complete your order</h1>
        <p className="text-muted-foreground">
          Fill in your details to place your order
        </p>
      </div>

      <form action={createOrder} className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
          <AddressForm />
        </div>

        <Separator />

        <div>
          <h2 className="mb-4 text-xl font-semibold">Order Details</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Quantity</Label>
              <QuantitySelector max={maxQuantity} />
              {maxQuantity > 1 && (
                <p className="text-sm text-muted-foreground">
                  Maximum {maxQuantity} units per order
                </p>
              )}
            </div>
            <OrderSummary 
              quantity={1} 
              currentPrice={currentPrice} 
              originalPrice={originalPrice} 
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Place Order
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          By placing this order, you agree to our{" "}
          <Link
            href="/terms"
            className="text-primary underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </form>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderForm />
    </Suspense>
  )
}

