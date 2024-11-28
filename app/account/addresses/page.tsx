import { AddressesList } from "@/components/account/addresses-list"

export default async function AddressesPage() {
  // In a real app, fetch this data from your database
  const addresses = [
    {
      id: "1",
      fullName: "John Doe",
      addressLine1: "123 Main St",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: "2",
      fullName: "John Doe",
      addressLine1: "456 Park Ave",
      addressLine2: "",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11201",
      country: "United States",
    },
  ]

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Shipping Addresses</h1>
      <AddressesList addresses={addresses} />
    </div>
  )
}

