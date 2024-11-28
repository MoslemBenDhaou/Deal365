import { CampaignsList } from "@/components/admin/campaigns-list"

export default async function CampaignsPage() {
  // In a real app, fetch this data from your database
  const campaigns = [
    {
      id: "1",
      name: "Premium Home Theater Bundle",
      startPrice: 399.99,
      currentPrice: 249.99,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      totalStock: 200,
      remainingStock: 58,
      status: "active",
    },
    {
      id: "2",
      name: "Smart Home Security System",
      startPrice: 299.99,
      currentPrice: 299.99,
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      totalStock: 150,
      remainingStock: 150,
      status: "draft",
    },
  ] as const

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Campaigns</h1>
      <CampaignsList campaigns={campaigns} />
    </div>
  )
}

