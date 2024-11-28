"use client"

import { useState } from "react"
import { Check, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

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

interface SavedAddressesProps {
  addresses: Address[]
  onAddNew: () => void
  onSelect: (address: Address) => void
}

export function SavedAddresses({ addresses, onAddNew, onSelect }: SavedAddressesProps) {
  const [selectedId, setSelectedId] = useState<string>(
    addresses.find(a => a.isDefault)?.id || addresses[0]?.id
  )

  const handleChange = (value: string) => {
    setSelectedId(value)
    const selectedAddress = addresses.find(a => a.id === value)
    if (selectedAddress) {
      onSelect(selectedAddress)
    }
  }

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedId} onValueChange={handleChange}>
        <div className="grid gap-4">
          {addresses.map((address) => (
            <Label
              key={address.id}
              className="cursor-pointer"
              htmlFor={address.id}
            >
              <Card className="border-2 transition-colors hover:bg-accent [&:has(:checked)]:border-primary">
                <CardContent className="flex items-center gap-4 p-4">
                  <RadioGroupItem
                    value={address.id}
                    id={address.id}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{address.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {address.city}, {address.state} {address.postalCode}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {address.country}
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-primary opacity-0 [&:has(:checked)+&]:opacity-100" />
                </CardContent>
              </Card>
            </Label>
          ))}
        </div>
      </RadioGroup>
      <Button
        variant="outline"
        className="w-full"
        onClick={onAddNew}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add new address
      </Button>
    </div>
  )
}

