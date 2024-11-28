"use client"

import { Check } from 'lucide-react'

interface PriceLevel {
  price: number
  orders: number
  isActive: boolean
  isCompleted: boolean
}

interface PriceLevelsProps {
  levels: PriceLevel[]
  currentOrders: number
}

export function PriceLevels({ levels, currentOrders }: PriceLevelsProps) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-4 h-full w-0.5 bg-muted" />
      <div className="space-y-8">
        {levels.map((level, index) => (
          <div key={index} className="relative flex items-center gap-4">
            <div
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border ${
                level.isCompleted
                  ? "border-primary bg-primary text-primary-foreground"
                  : level.isActive
                  ? "border-primary bg-background text-primary"
                  : "border-muted bg-background text-muted-foreground"
              }`}
            >
              {level.isCompleted ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <div className="text-xl font-bold">${level.price}</div>
                <div className="text-sm text-muted-foreground">
                  {level.orders} orders needed
                </div>
              </div>
              {level.isActive && (
                <div className="mt-1 text-sm text-muted-foreground">
                  {level.orders - currentOrders} more orders needed for this price
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

