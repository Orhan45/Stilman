"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, ChevronRight, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [orderDate, setOrderDate] = useState("")
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [orderTotal, setOrderTotal] = useState(0)

  useEffect(() => {
    // In a real app, you would get this from the checkout process
    // Here we're simulating order data
    setOrderNumber(`ORD-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`)
    setOrderDate(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))

    // Simulate order items from localStorage or session
    setOrderItems([
      {
        id: 1,
        name: "Premium Cotton Oxford Shirt",
        price: 79.99,
        quantity: 1,
        size: "M",
        color: "White",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 2,
        name: "Slim Fit Chino Pants",
        price: 59.99,
        quantity: 2,
        size: "32",
        color: "Navy",
        image: "/placeholder.svg?height=300&width=300",
      },
    ])

    // Calculate total
    setOrderTotal(79.99 + 59.99 * 2 + 5.99 + 16.0) // Items + shipping + tax
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="font-bold text-xl md:text-2xl">
              MINIMAL
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-gray-500 mt-2">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Order #{orderNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <p className="text-sm font-medium">Order Date</p>
                    <p className="text-sm text-gray-500">{orderDate}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:text-right">
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-sm text-gray-500">
                      {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Order Status</h3>
                  <div className="relative">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black text-white">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">Order Confirmed</p>
                        <p className="text-sm text-gray-500">{orderDate}</p>
                      </div>
                    </div>
                    <div className="absolute top-8 left-4 bottom-8 w-0.5 bg-gray-200"></div>
                    <div className="flex items-center mt-6">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200">
                        <Package className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-500">Processing</p>
                        <p className="text-sm text-gray-500">Your order is being prepared</p>
                      </div>
                    </div>
                    <div className="absolute top-20 left-4 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="flex items-center mt-6">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200">
                        <Truck className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-500">Shipped</p>
                        <p className="text-sm text-gray-500">Estimated in 3-5 business days</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Items</h3>
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <div className="mt-1 text-xs text-gray-500">
                            <span>Size: {item.size}</span>
                            <span className="mx-2">•</span>
                            <span>Color: {item.color}</span>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-sm">${item.price.toFixed(2)}</span>
                            <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${(orderTotal - 5.99 - 16.0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>$5.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>$16.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Shipping Address</h3>
                  <div className="text-sm">
                    <p>John Doe</p>
                    <p>123 Fashion Street</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Payment Method</h3>
                  <p className="text-sm">Credit Card ending in 3456</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/profile">
              <Button className="w-full sm:w-auto flex items-center gap-2">
                View Order History
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} MINIMAL. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-900">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
