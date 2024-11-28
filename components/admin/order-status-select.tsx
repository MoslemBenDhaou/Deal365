"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateOrderStatus } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

interface OrderStatusSelectProps {
  orderId: string
  initialStatus: string
}

export function OrderStatusSelect({ orderId, initialStatus }: OrderStatusSelectProps) {
  const [status, setStatus] = useState(initialStatus)
  const { toast } = useToast()

  const handleStatusChange = async (newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus)
    
    if (result.success) {
      setStatus(newStatus)
      toast({
        title: "Status updated",
        description: "The order status has been updated successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="confirmed">Confirmed</SelectItem>
        <SelectItem value="shipped">Shipped</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  )
}

