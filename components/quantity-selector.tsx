"use client"

import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

interface QuantitySelectorProps {
  initialQuantity?: number
  max?: number
  onChange?: (quantity: number) => void
}

export function QuantitySelector({ 
  initialQuantity = 1, 
  max = 999,
  onChange 
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const updateQuantity = (newQuantity: number) => {
    const validQuantity = Math.max(1, Math.min(max, newQuantity))
    setQuantity(validQuantity)
    onChange?.(validQuantity)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      updateQuantity(value)
    }
  }

  useEffect(() => {
    setQuantity(initialQuantity)
  }, [initialQuantity])

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <Input
        type="number"
        min={1}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        className="h-8 w-20 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => updateQuantity(quantity + 1)}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  )
}
