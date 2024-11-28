import { OrderView } from "@/components/admin/order-view"

interface OrderViewPageProps {
  params: {
    id: string
  }
}

export default async function OrderViewPage({ params }: OrderViewPageProps) {
  // In a real app, fetch this data from your database
  const order = {
    id: params.id,
    date: new Date().toISOString(), // Pass as ISO string
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890"
    },
    campaign: {
      id: "1",
      name: "Premium Home Theater Bundle",
      currentPrice: 249.99
    },
    quantity: 2,
    total: 499.98,
    status: "pending",
    shippingAddress: {
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States"
    }
  } as const

  return <OrderView order={order} />
}

