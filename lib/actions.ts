'use server'

import { z } from "zod"
import { revalidatePath } from "next/cache"

const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
})

export async function updateProfile(formData: FormData) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  revalidatePath('/account')
  return { success: true }
}

export async function addAddress(formData: FormData) {
  const validatedFields = addressSchema.safeParse({
    fullName: formData.get("fullName"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
  })

  if (!validatedFields.success) {
    return { error: "Invalid fields. Please check your input." }
  }

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  revalidatePath('/account')
  return { success: true }
}

export async function deleteAddress(addressId: string) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  revalidatePath('/account')
  return { success: true }
}

export async function updateOrderQuantity(orderId: string, quantity: number) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  revalidatePath('/account')
  return { success: true }
}

export async function cancelOrder(orderId: string) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  revalidatePath('/account')
  return { success: true }
}

