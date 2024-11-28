import { OrdersList } from "@/components/account/orders-list"

export default async function OrdersPage() {
  // In a real app, fetch this data from your database
  const orders = [
    {
      id: "1",
      date: new Date(),
      status: "active",
      quantity: 1,
      total: 249.99,
      campaign: {
        name: "Premium Home Theater Bundle",
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        currentPrice: 249.99,
      },
    },
    {
      id: "2",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      status: "shipped",
      quantity: 2,
      total: 399.98,
      campaign: {
        name: "Smart Home Security System",
        endDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        currentPrice: 199.99,
      },
    },
  ] as const

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Your Orders</h1>
      <OrdersList orders={orders} />
    </div>
  )
}

