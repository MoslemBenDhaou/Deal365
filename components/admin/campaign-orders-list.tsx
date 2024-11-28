"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

interface Order {
  id: string
  date: string // Change to string
  customer: {
    name: string
    email: string
  }
  quantity: number
  total: number
  status: "pending" | "confirmed" | "shipped" | "cancelled"
}

interface CampaignOrdersListProps {
  campaignId: string
}

export function CampaignOrdersList({ campaignId }: CampaignOrdersListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const itemsPerPage = 10

  // Update the mock data to use ISO strings
  const orders: Order[] = Array.from({ length: 25 }, (_, i) => ({
    id: `order-${i + 1}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
    customer: {
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
    },
    quantity: Math.floor(Math.random() * 3) + 1,
    total: (Math.floor(Math.random() * 3) + 1) * 249.99,
    status: ["pending", "confirmed", "shipped", "cancelled"][Math.floor(Math.random() * 4)] as Order["status"],
  }))

  const filteredOrders = orders.filter(order =>
    order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

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
        <Select
          defaultValue="10"
          onValueChange={(value) => {
            setCurrentPage(1)
            // In a real app, update itemsPerPage here
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows per page</SelectItem>
            <SelectItem value="20">20 rows per page</SelectItem>
            <SelectItem value="50">50 rows per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {format(new Date(order.date), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.customer.email}
                  </div>
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href={`/admin/orders/${order.id}`}>
                      View Order
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
          {filteredOrders.length} results
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Page {currentPage}</span>
            <span className="text-sm text-muted-foreground">of {totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

