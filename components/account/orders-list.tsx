"use client"

import { useState } from "react"
import { format } from "date-fns"
import { AlertCircle, Package } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { QuantitySelector } from "@/components/quantity-selector"
import { updateOrderQuantity, cancelOrder } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

interface Order {
  id: string
  date: Date
  status: "active" | "completed" | "cancelled" | "shipped"
  quantity: number
  total: number
  campaign: {
    name: string
    endDate: Date
    currentPrice: number
  }
}

interface OrdersListProps {
  orders: Order[]
}

export function OrdersList({ orders }: OrdersListProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const { toast } = useToast()

  const handleUpdateQuantity = async (quantity: number) => {
    if (!selectedOrder) return
    
    setIsUpdating(true)
    const result = await updateOrderQuantity(selectedOrder.id, quantity)
    setIsUpdating(false)
    
    if (result.success) {
      setSelectedOrder(null)
      toast({
        title: "Order updated",
        description: "Your order quantity has been updated successfully.",
      })
    }
  }

  const handleCancel = async (orderId: string) => {
    setIsCancelling(true)
    const result = await cancelOrder(orderId)
    setIsCancelling(false)
    
    if (result.success) {
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully.",
      })
    }
  }

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary">Active Campaign</Badge>
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      case "shipped":
        return <Badge variant="default">Shipped</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Date</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                {format(order.date, "MMM d, yyyy")}
              </TableCell>
              <TableCell>{order.campaign.name}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell className="text-right">
                ${order.total.toFixed(2)}
              </TableCell>
              <TableCell>
                {order.status === "active" && (
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Order</DialogTitle>
                          <DialogDescription>
                            Change the quantity for your order
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <div className="font-medium">Campaign</div>
                            <div className="text-sm text-muted-foreground">
                              {order.campaign.name}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="font-medium">Quantity</div>
                            <QuantitySelector
                              initialQuantity={order.quantity}
                              onChange={handleUpdateQuantity}
                            />
                          </div>
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Note</AlertTitle>
                            <AlertDescription>
                              The final price will be determined when the campaign ends on{" "}
                              {format(order.campaign.endDate, "MMM d, yyyy")}
                            </AlertDescription>
                          </Alert>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancel(order.id)}
                      disabled={isCancelling}
                    >
                      {isCancelling ? "Cancelling..." : "Cancel"}
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Package className="mx-auto h-8 w-8 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold">No orders found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            You haven't placed any orders yet.
          </p>
        </div>
      )}
    </div>
  )
}

