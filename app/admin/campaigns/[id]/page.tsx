import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CampaignOrdersList } from "@/components/admin/campaign-orders-list"

interface CampaignViewPageProps {
  params: {
    id: string
  }
}

export default async function CampaignViewPage({ params }: CampaignViewPageProps) {
  // In a real app, fetch this data from your database
  const campaign = {
    id: params.id,
    name: "Premium Home Theater Bundle",
    description: "Experience cinema-quality entertainment at home with our Premium Home Theater Bundle.",
    startPrice: 399.99,
    currentPrice: 249.99,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    totalStock: 200,
    remainingStock: 58,
    status: "active",
    totalOrders: 142,
    totalRevenue: 35497.58,
    nextPriceLevel: {
      price: 199.99,
      ordersNeeded: 100,
      ordersRemaining: 8
    },
    priceLevels: [
      { price: 299.99, orders: 25, achieved: true },
      { price: 249.99, orders: 50, achieved: true },
      { price: 199.99, orders: 100, achieved: false },
      { price: 149.99, orders: 200, achieved: false }
    ]
  } as const

  const percentageSold = ((campaign.totalStock - campaign.remainingStock) / campaign.totalStock) * 100
  const nextLevelProgress = ((campaign.totalOrders % campaign.nextPriceLevel.ordersNeeded) / campaign.nextPriceLevel.ordersNeeded) * 100

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/campaigns">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Campaign ends on {format(campaign.endDate, "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <Button asChild>
          <Link href={`/admin/campaigns/${campaign.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Campaign
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {campaign.remainingStock} units remaining
            </p>
            <Progress 
              value={percentageSold} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${campaign.currentPrice}
            </div>
            <p className="text-xs text-muted-foreground">
              Started from ${campaign.startPrice}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Price Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${campaign.nextPriceLevel.price}
            </div>
            <p className="text-xs text-muted-foreground">
              {campaign.nextPriceLevel.ordersRemaining} more orders needed
            </p>
            <Progress 
              value={nextLevelProgress} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${campaign.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              At current price level
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-0 left-4 h-full w-0.5 bg-muted" />
            <div className="space-y-8">
              {campaign.priceLevels.map((level, index) => (
                <div key={index} className="relative flex items-center gap-4">
                  <div
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border ${
                      level.achieved
                        ? "border-primary bg-primary text-primary-foreground"
                        : campaign.currentPrice === level.price
                        ? "border-primary bg-background text-primary"
                        : "border-muted bg-background text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <div className="text-xl font-bold">${level.price}</div>
                      <div className="text-sm text-muted-foreground">
                        {level.orders} orders needed
                      </div>
                    </div>
                    {campaign.currentPrice === level.price && (
                      <div className="mt-1 text-sm text-muted-foreground">
                        Current active level
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Campaign Orders</h2>
        <CampaignOrdersList campaignId={campaign.id} />
      </div>
    </div>
  )
}

