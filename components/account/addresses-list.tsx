"use client"

import { useState } from "react"
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddressForm } from "@/components/address-form"
import { deleteAddress } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

interface Address {
  id: string
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault?: boolean
}

interface AddressesListProps {
  addresses: Address[]
}

export function AddressesList({ addresses }: AddressesListProps) {
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    setIsDeletingId(id)
    const result = await deleteAddress(id)
    setIsDeletingId(null)
    
    if (result.success) {
      toast({
        title: "Address deleted",
        description: "The address has been deleted successfully.",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button>Add new address</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new address</DialogTitle>
              <DialogDescription>
                Add a new shipping address to your account
              </DialogDescription>
            </DialogHeader>
            <AddressForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingAddress(false)}>
                Cancel
              </Button>
              <Button type="submit">Save address</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader>
              <CardTitle>{address.fullName}</CardTitle>
              {address.isDefault && (
                <CardDescription>Default address</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div>{address.addressLine1}</div>
                {address.addressLine2 && <div>{address.addressLine2}</div>}
                <div>
                  {address.city}, {address.state} {address.postalCode}
                </div>
                <div>{address.country}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                size="sm"
                className="ml-auto"
                onClick={() => handleDelete(address.id)}
                disabled={isDeletingId === address.id}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeletingId === address.id ? "Deleting..." : "Delete"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

