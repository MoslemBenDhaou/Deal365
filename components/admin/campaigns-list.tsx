"use client"

import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { Edit, Trash2, Package } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { deleteCampaign } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

interface Campaign {
  id: string
  name: string
  startPrice: number
  currentPrice: number
  endDate: Date
  totalStock: number
  remainingStock: number
  status: "draft" | "active" | "ended"
}

interface CampaignsListProps {
  campaigns: Campaign[]
}

export function CampaignsList({ campaigns: initialCampaigns }: CampaignsListProps) {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!deletingId) return

    const result = await deleteCampaign(deletingId)
    
    if (result.success) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== deletingId))
      toast({
        title: "Campaign deleted",
        description: "The campaign has been deleted successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to delete campaign. Please try again.",
        variant: "destructive",
      })
    }
    
    setDeletingId(null)
  }

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "active":
        return <Badge variant="default">Active</Badge>
      case "ended":
        return <Badge variant="outline">Ended</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/campaigns/new">Create Campaign</Link>
        </Button>
      </div>

      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Package className="mx-auto h-8 w-8 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold">No campaigns</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started by creating a new campaign.
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/campaigns/new">Create Campaign</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    ${campaign.currentPrice.toFixed(2)}{" "}
                    <span className="text-sm text-muted-foreground">
                      (from ${campaign.startPrice.toFixed(2)})
                    </span>
                  </TableCell>
                  <TableCell>
                    {format(campaign.endDate, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {campaign.remainingStock} / {campaign.totalStock}
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link href={`/admin/campaigns/${campaign.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeletingId(campaign.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the campaign
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Campaign
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

