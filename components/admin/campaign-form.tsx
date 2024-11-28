"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createCampaign, updateCampaign } from "@/lib/actions"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  startPrice: z.string().transform(val => parseFloat(val)),
  endDate: z.string(),
  totalStock: z.string().transform(val => parseInt(val)),
  priceLevels: z.array(z.object({
    price: z.string().transform(val => parseFloat(val)),
    orders: z.string().transform(val => parseInt(val)),
  })),
})

interface CampaignFormProps {
  initialData?: any
  campaignId?: string
}

export function CampaignForm({ initialData, campaignId }: CampaignFormProps) {
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      startPrice: "",
      endDate: "",
      totalStock: "",
      priceLevels: [{ price: "", orders: "" }],
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true)
    const formData = new FormData()
    
    // Add basic fields
    formData.append("name", values.name)
    formData.append("description", values.description)
    formData.append("startPrice", values.startPrice.toString())
    formData.append("endDate", values.endDate)
    formData.append("totalStock", values.totalStock.toString())
    
    // Add price levels
    formData.append("priceLevels", JSON.stringify(
      values.priceLevels.map(level => ({
        price: parseFloat(level.price.toString()),
        orders: parseInt(level.orders.toString()),
      }))
    ))
    
    try {
      const result = campaignId 
        ? await updateCampaign(campaignId, formData)
        : await createCampaign(formData)
      
      if (result.success) {
        toast({
          title: "Success",
          description: `Campaign has been ${campaignId ? 'updated' : 'created'} successfully.`,
        })
        router.push('/admin/campaigns')
      } else {
        throw new Error(result.error || "Something went wrong")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/campaigns')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="startPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting Price ($)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" step="0.01" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="totalStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Stock</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input {...field} type="datetime-local" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <FormLabel>Price Levels</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const currentLevels = form.getValues("priceLevels")
                form.setValue("priceLevels", [...currentLevels, { price: "", orders: "" }])
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Level
            </Button>
          </div>
          
          {form.watch("priceLevels").map((_, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <FormField
                control={form.control}
                name={`priceLevels.${index}.price`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} type="number" min="0" step="0.01" placeholder="Price ($)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`priceLevels.${index}.orders`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} type="number" min="1" placeholder="Orders needed" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {index > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    const currentLevels = form.getValues("priceLevels")
                    form.setValue("priceLevels", currentLevels.filter((_, i) => i !== index))
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Campaign"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

