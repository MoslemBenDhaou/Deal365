"use client"

import { format } from "date-fns"
import Link from "next/link"
import { ArrowLeft, Package2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrderStatusSelect } from "@/components/admin/order-status-select"

interface OrderViewProps {
  order: {
    id: string
    date: string // Pass as ISO string instead of Date object
    customer: {
      name: string
      email: string
      phone: string
    }
    campaign: {
      id: string
      name: string
      currentPrice: number
    }
    quantity: number
    total: number
    status: string
    shippingAddress: {
      line1: string
      line2?: string
      city: string
      state: string
      postalCode: string
      country: string
    }
  }
}

export function OrderView({ order }: OrderViewProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "confirmed":
        return <Badge>Confirmed</Badge>
      case "shipped":
        return <Badge variant="default">Shipped</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Placed on {format(new Date(order.date), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                <dd className="text-sm">{order.customer.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="text-sm">{order.customer.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                <dd className="text-sm">{order.customer.phone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                <dd className="text-sm">
                  {order.shippingAddress.line1}
                  {order.shippingAddress.line2 && <br />}
                  {order.shippingAddress.line2}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">City, State, ZIP</dt>
                <dd className="text-sm">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Country</dt>
                <dd className="text-sm">{order.shippingAddress.country}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">{order.campaign.name}</div>
                <div className="text-sm text-muted-foreground">
                  Quantity: {order.quantity} × ${order.campaign.currentPrice}
                </div>
              </div>
              <div className="text-sm font-medium">
                ${order.total.toFixed(2)}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="text-base font-medium">Total</div>
              <div className="text-base font-medium">${order.total.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/admin/campaigns/${order.campaign.id}`}>
            <Package2 className="mr-2 h-4 w-4" />
            View Campaign
          </Link>
        </Button>
      </div>
    </div>
  )
}

