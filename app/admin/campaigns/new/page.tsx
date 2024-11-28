import { CampaignForm } from "@/components/admin/campaign-form"

export default function NewCampaignPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Create Campaign</h1>
      <div className="max-w-2xl">
        <CampaignForm />
      </div>
    </div>
  )
}

