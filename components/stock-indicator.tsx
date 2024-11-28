"use client"

import { AlertCircle } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

interface StockIndicatorProps {
  total: number
  remaining: number
  isLowStock?: boolean
}

export function StockIndicator({ total, remaining, isLowStock }: StockIndicatorProps) {
  const percentageRemaining = (remaining / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {isLowStock && (
            <AlertCircle className="h-4 w-4 text-destructive" />
          )}
          <span className={isLowStock ? "text-destructive font-medium" : ""}>
            {remaining} units remaining
          </span>
        </div>
        <span className="text-muted-foreground">
          {total - remaining} sold
        </span>
      </div>
      <Progress value={percentageRemaining} className="h-2" />
    </div>
  )
}

