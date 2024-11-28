"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateOrderStatus } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

interface Order {
  id: string
  date: Date
  customer: {
    name: string
    email: string
  }
  campaign: {
    name: string
    currentPrice: number
  }
  quantity: number
  total: number
  status: "pending" | "confirmed" | "shipped" | "cancelled"
}

interface OrdersListProps {
  orders: Order[]
}

export function OrdersList({ orders: initialOrders }: OrdersListProps) {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState("")
  const { toast } = useToast()

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus)
    
    if (result.success) {
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus as Order["status"] }
          : order
      ))
      
      toast({
        title: "Order updated",
        description: "The order status has been updated successfully.",
      })
    }
  }

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "confirmed":
        return <Badge>Confirmed</Badge>
      case "shipped":
        return <Badge variant="default">Shipped</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
    }
  }

  const filteredOrders = orders.filter(order => 
    order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.email.toLowerCase().includes(search.toLowerCase()) ||
    order.campaign.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setSearch("")
            setOrders(initialOrders)
          }}
        >
          Reset
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                {format(order.date, "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div className="font-medium">{order.customer.name}</div>
                <div className="text-sm text-muted-foreground">
                  {order.customer.email}
                </div>
              </TableCell>
              <TableCell>{order.campaign.name}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-right">
                <Select
                  defaultValue={order.status}
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No orders found.
        </div>
      )}
    </div>
  )
}

