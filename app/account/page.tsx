import { ProfileForm } from "@/components/account/profile-form"

export default async function ProfilePage() {
  // In a real app, fetch this data from your database
  const profile = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-8 text-2xl font-bold">Account Settings</h1>
      <ProfileForm initialData={profile} />
    </div>
  )
}

