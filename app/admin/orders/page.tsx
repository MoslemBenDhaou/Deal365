import { OrdersList } from "@/components/admin/orders-list"

export default async function OrdersPage() {
  // In a real app, fetch this data from your database
  const orders = [
    {
      id: "1",
      date: new Date(),
      customer: {
        name: "John Doe",
        email: "john@example.com",
      },
      campaign: {
        name: "Premium Home Theater Bundle",
        currentPrice: 249.99,
      },
      quantity: 1,
      total: 249.99,
      status: "pending",
    },
    {
      id: "2",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
      },
      campaign: {
        name: "Premium Home Theater Bundle",
        currentPrice: 249.99,
      },
      quantity: 2,
      total: 499.98,
      status: "confirmed",
    },
  ] as const

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Orders</h1>
      <OrdersList orders={orders} />
    </div>
  )
}

