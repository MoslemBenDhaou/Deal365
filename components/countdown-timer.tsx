"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  endTime: Date
  onComplete?: () => void
}

export function CountdownTimer({ endTime, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  function getTimeLeft() {
    const total = endTime.getTime() - Date.now()
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((total / (1000 * 60)) % 60)
    const seconds = Math.floor((total / 1000) % 60)
    return { total, days, hours, minutes, seconds }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft()
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.total <= 0) {
        clearInterval(timer)
        onComplete?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onComplete])

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="flex flex-col">
        <div className="text-4xl font-bold tabular-nums">{timeLeft.days}</div>
        <div className="text-xs text-muted-foreground">DAYS</div>
      </div>
      <div className="flex flex-col">
        <div className="text-4xl font-bold tabular-nums">{timeLeft.hours}</div>
        <div className="text-xs text-muted-foreground">HOURS</div>
      </div>
      <div className="flex flex-col">
        <div className="text-4xl font-bold tabular-nums">{timeLeft.minutes}</div>
        <div className="text-xs text-muted-foreground">MINUTES</div>
      </div>
      <div className="flex flex-col">
        <div className="text-4xl font-bold tabular-nums">{timeLeft.seconds}</div>
        <div className="text-xs text-muted-foreground">SECONDS</div>
      </div>
    </div>
  )
}

