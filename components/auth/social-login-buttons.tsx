"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter } from 'lucide-react'
import Image from "next/image"

export function SocialLoginButtons() {
  return (
    <div className="grid gap-4">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="h-5 w-5"
        />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => signIn("facebook", { callbackUrl: "/" })}
      >
        <Facebook className="h-5 w-5" />
        Continue with Facebook
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => signIn("twitter", { callbackUrl: "/" })}
      >
        <Twitter className="h-5 w-5" />
        Continue with Twitter
      </Button>
    </div>
  )
}

