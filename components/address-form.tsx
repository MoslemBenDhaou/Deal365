"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AddressFormProps {
  defaultValues?: {
    fullName?: string
    addressLine1?: string
    addressLine2?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
}

export function AddressForm({ defaultValues }: AddressFormProps) {
  const [selectedCountry, setSelectedCountry] = useState(defaultValues?.country || "US")

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          name="fullName"
          defaultValue={defaultValues?.fullName}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="addressLine1">Address line 1</Label>
        <Input
          id="addressLine1"
          name="addressLine1"
          defaultValue={defaultValues?.addressLine1}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="addressLine2">
          Address line 2 <span className="text-muted-foreground">(Optional)</span>
        </Label>
        <Input
          id="addressLine2"
          name="addressLine2"
          defaultValue={defaultValues?.addressLine2}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            defaultValue={defaultValues?.city}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            defaultValue={defaultValues?.state}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="postalCode">ZIP / Postal code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            defaultValue={defaultValues?.postalCode}
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <Select name="country" defaultValue={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="US">United States</SelectItem>
            <SelectItem value="CA">Canada</SelectItem>
            <SelectItem value="GB">United Kingdom</SelectItem>
            <SelectItem value="AU">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

