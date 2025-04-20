"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, CreditCard, ShoppingBag, Truck, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Replace the CheckoutPage component with this enhanced version that includes proper event handlers
export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cartItems, setCartItems] = useState(initialCartItems)

  // Form state management
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "ny",
    zipCode: "",
  })

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const [promoCode, setPromoCode] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax rate

  const getShippingCost = (method: string) => {
    switch (method) {
      case "standard":
        return 5.99
      case "express":
        return 12.99
      case "free":
        return 0
      default:
        return 5.99
    }
  }

  const shippingCost = getShippingCost(shippingMethod)
  const total = subtotal + tax + shippingCost

  // Handle shipping form input changes
  const handleShippingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle payment form input changes
  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle state select change
  const handleStateChange = (value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      state: value,
    }))
  }

  // Validate shipping form before proceeding
  const validateShippingForm = () => {
    const errors: Record<string, string> = {}

    if (!shippingAddress.firstName.trim()) errors.firstName = "First name is required"
    if (!shippingAddress.lastName.trim()) errors.lastName = "Last name is required"
    if (!shippingAddress.email.trim()) errors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(shippingAddress.email)) errors.email = "Invalid email format"
    if (!shippingAddress.phone.trim()) errors.phone = "Phone is required"
    if (!shippingAddress.address.trim()) errors.address = "Address is required"
    if (!shippingAddress.city.trim()) errors.city = "City is required"
    if (!shippingAddress.zipCode.trim()) errors.zipCode = "ZIP code is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Validate payment form before proceeding
  const validatePaymentForm = () => {
    if (paymentMethod !== "credit-card") return true

    const errors: Record<string, string> = {}

    if (!paymentDetails.cardName.trim()) errors.cardName = "Name on card is required"
    if (!paymentDetails.cardNumber.trim()) errors.cardNumber = "Card number is required"
    if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ""))) errors.cardNumber = "Invalid card number"
    if (!paymentDetails.expiryDate.trim()) errors.expiryDate = "Expiry date is required"
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) errors.expiryDate = "Invalid format (MM/YY)"
    if (!paymentDetails.cvv.trim()) errors.cvv = "CVV is required"
    if (!/^\d{3,4}$/.test(paymentDetails.cvv)) errors.cvv = "Invalid CVV"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 1 && !validateShippingForm()) return
    if (step === 3 && !validatePaymentForm()) return

    if (step < 4) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  // Handle quantity changes
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Handle promo code application
  const applyPromoCode = () => {
    // This would typically validate the promo code with the backend
    alert(`Promo code "${promoCode}" applied!`)
  }

  // Handle form submission
  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault()

    // This would typically send the order to the backend
    alert("Order placed successfully! Redirecting to confirmation page...")

    // Navigate to confirmation page
    window.location.href = "/order-confirmation"
  }

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
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your purchase</p>
        </div>

        {/* Checkout Steps - Desktop */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="relative flex items-center justify-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                  }`}
                  onClick={() => step > 1 && setStep(1)}
                  style={{ cursor: step > 1 ? "pointer" : "default" }}
                >
                  {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <div className="absolute -bottom-6 whitespace-nowrap text-sm font-medium">Shipping</div>
              </div>
            </div>
            <div className="w-full mx-4 h-1 bg-gray-200">
              <div className={`h-full bg-black ${step >= 2 ? "w-full" : "w-0"} transition-all duration-300`}></div>
            </div>
            <div className="flex-1">
              <div className="relative flex items-center justify-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                  }`}
                  onClick={() => step > 2 && setStep(2)}
                  style={{ cursor: step > 2 ? "pointer" : "default" }}
                >
                  {step > 2 ? <Check className="h-5 w-5" /> : "2"}
                </div>
                <div className="absolute -bottom-6 whitespace-nowrap text-sm font-medium">Delivery</div>
              </div>
            </div>
            <div className="w-full mx-4 h-1 bg-gray-200">
              <div className={`h-full bg-black ${step >= 3 ? "w-full" : "w-0"} transition-all duration-300`}></div>
            </div>
            <div className="flex-1">
              <div className="relative flex items-center justify-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                  }`}
                  onClick={() => step > 3 && setStep(3)}
                  style={{ cursor: step > 3 ? "pointer" : "default" }}
                >
                  {step > 3 ? <Check className="h-5 w-5" /> : "3"}
                </div>
                <div className="absolute -bottom-6 whitespace-nowrap text-sm font-medium">Payment</div>
              </div>
            </div>
            <div className="w-full mx-4 h-1 bg-gray-200">
              <div className={`h-full bg-black ${step >= 4 ? "w-full" : "w-0"} transition-all duration-300`}></div>
            </div>
            <div className="flex-1">
              <div className="relative flex items-center justify-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    step >= 4 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  4
                </div>
                <div className="absolute -bottom-6 whitespace-nowrap text-sm font-medium">Review</div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Steps - Mobile */}
        <div className="md:hidden mb-8">
          <Tabs value={`step-${step}`} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="step-1" onClick={() => step >= 1 && setStep(1)} disabled={step < 1}>
                1
              </TabsTrigger>
              <TabsTrigger value="step-2" onClick={() => step >= 2 && setStep(2)} disabled={step < 2}>
                2
              </TabsTrigger>
              <TabsTrigger value="step-3" onClick={() => step >= 3 && setStep(3)} disabled={step < 3}>
                3
              </TabsTrigger>
              <TabsTrigger value="step-4" onClick={() => step >= 4 && setStep(4)} disabled={step < 4}>
                4
              </TabsTrigger>
            </TabsList>
            <div className="flex justify-between text-xs mt-1 px-1">
              <span>Shipping</span>
              <span>Delivery</span>
              <span>Payment</span>
              <span>Review</span>
            </div>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                  <CardDescription>Enter your shipping information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      nextStep()
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={shippingAddress.firstName}
                          onChange={handleShippingInputChange}
                          placeholder="John"
                        />
                        {formErrors.firstName && <p className="text-sm text-red-500">{formErrors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={shippingAddress.lastName}
                          onChange={handleShippingInputChange}
                          placeholder="Doe"
                        />
                        {formErrors.lastName && <p className="text-sm text-red-500">{formErrors.lastName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={shippingAddress.email}
                          onChange={handleShippingInputChange}
                          placeholder="john.doe@example.com"
                        />
                        {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={shippingAddress.phone}
                          onChange={handleShippingInputChange}
                          placeholder="(555) 123-4567"
                        />
                        {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={shippingAddress.address}
                          onChange={handleShippingInputChange}
                          placeholder="123 Fashion Street"
                        />
                        {formErrors.address && <p className="text-sm text-red-500">{formErrors.address}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingInputChange}
                          placeholder="New York"
                        />
                        {formErrors.city && <p className="text-sm text-red-500">{formErrors.city}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Select value={shippingAddress.state} onValueChange={handleStateChange}>
                            <SelectTrigger id="state">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ny">New York</SelectItem>
                              <SelectItem value="ca">California</SelectItem>
                              <SelectItem value="tx">Texas</SelectItem>
                              <SelectItem value="fl">Florida</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={shippingAddress.zipCode}
                            onChange={handleShippingInputChange}
                            placeholder="10001"
                          />
                          {formErrors.zipCode && <p className="text-sm text-red-500">{formErrors.zipCode}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                      <Link href="/cart">
                        <Button type="button" variant="outline" className="flex items-center gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          Back to Cart
                        </Button>
                      </Link>
                      <Button type="submit" className="flex items-center gap-2">
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping Method */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Method</CardTitle>
                  <CardDescription>Select your preferred delivery option</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                    <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex items-center gap-2 cursor-pointer">
                          <Truck className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Standard Shipping</div>
                            <div className="text-sm text-gray-500">Delivery in 3-5 business days</div>
                          </div>
                        </Label>
                      </div>
                      <div className="font-medium">$5.99</div>
                    </div>
                    <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex items-center gap-2 cursor-pointer">
                          <Truck className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Express Shipping</div>
                            <div className="text-sm text-gray-500">Delivery in 1-2 business days</div>
                          </div>
                        </Label>
                      </div>
                      <div className="font-medium">$12.99</div>
                    </div>
                    <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="free" />
                        <Label htmlFor="free" className="flex items-center gap-2 cursor-pointer">
                          <Truck className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Free Shipping</div>
                            <div className="text-sm text-gray-500">Delivery in 5-7 business days</div>
                          </div>
                        </Label>
                      </div>
                      <div className="font-medium">$0.00</div>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={nextStep} className="flex items-center gap-2">
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select your preferred payment option</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      nextStep()
                    }}
                  >
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5" />
                            <div>
                              <div className="font-medium">Credit Card</div>
                              <div className="text-sm text-gray-500">
                                Pay with Visa, Mastercard, or American Express
                              </div>
                            </div>
                          </Label>
                        </div>
                      </div>

                      {paymentMethod === "credit-card" && (
                        <div className="border p-4 rounded-lg space-y-4 mt-2">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              value={paymentDetails.cardName}
                              onChange={handlePaymentInputChange}
                              placeholder="John Doe"
                            />
                            {formErrors.cardName && <p className="text-sm text-red-500">{formErrors.cardName}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              value={paymentDetails.cardNumber}
                              onChange={handlePaymentInputChange}
                              placeholder="1234 5678 9012 3456"
                            />
                            {formErrors.cardNumber && <p className="text-sm text-red-500">{formErrors.cardNumber}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={handlePaymentInputChange}
                                placeholder="MM/YY"
                              />
                              {formErrors.expiryDate && <p className="text-sm text-red-500">{formErrors.expiryDate}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={handlePaymentInputChange}
                                placeholder="123"
                              />
                              {formErrors.cvv && <p className="text-sm text-red-500">{formErrors.cvv}</p>}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                            <div className="font-medium">PayPal</div>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                          <Label htmlFor="cash-on-delivery" className="flex items-center gap-2 cursor-pointer">
                            <div>
                              <div className="font-medium">Cash on Delivery</div>
                              <div className="text-sm text-gray-500">Pay when you receive your order</div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="mt-6 flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <Button type="submit" className="flex items-center gap-2">
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Review Order */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                  <CardDescription>Please review your order details before placing your order</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitOrder}>
                    <div className="space-y-6">
                      {/* Shipping Address Summary */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Shipping Address</h3>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setStep(1)}>
                            Edit
                          </Button>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-sm">
                          <p>
                            {shippingAddress.firstName} {shippingAddress.lastName}
                          </p>
                          <p>{shippingAddress.address}</p>
                          <p>
                            {shippingAddress.city}, {shippingAddress.state.toUpperCase()} {shippingAddress.zipCode}
                          </p>
                          <p>United States</p>
                          <p className="mt-1">{shippingAddress.email}</p>
                          <p>{shippingAddress.phone}</p>
                        </div>
                      </div>

                      {/* Shipping Method Summary */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Shipping Method</h3>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setStep(2)}>
                            Edit
                          </Button>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-sm">
                          <p className="font-medium">
                            {shippingMethod === "standard"
                              ? "Standard Shipping"
                              : shippingMethod === "express"
                                ? "Express Shipping"
                                : "Free Shipping"}
                          </p>
                          <p className="text-gray-500">
                            {shippingMethod === "standard"
                              ? "Delivery in 3-5 business days"
                              : shippingMethod === "express"
                                ? "Delivery in 1-2 business days"
                                : "Delivery in 5-7 business days"}
                          </p>
                        </div>
                      </div>

                      {/* Payment Method Summary */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Payment Method</h3>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setStep(3)}>
                            Edit
                          </Button>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-sm">
                          <p className="font-medium">
                            {paymentMethod === "credit-card"
                              ? "Credit Card"
                              : paymentMethod === "paypal"
                                ? "PayPal"
                                : "Cash on Delivery"}
                          </p>
                          {paymentMethod === "credit-card" && paymentDetails.cardNumber && (
                            <p className="text-gray-500">Card ending in {paymentDetails.cardNumber.slice(-4)}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </Button>
                        <Button type="submit" className="flex items-center gap-2">
                          Place Order
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
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
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-5 w-5 rounded-full p-0"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease</span>
                              </Button>
                              <span className="text-xs w-4 text-center">{item.quantity}</span>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-5 w-5 rounded-full p-0"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Promo Code */}
                  <div className="pt-4">
                    <Label htmlFor="promo-code">Promo Code</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="promo-code"
                        placeholder="Enter code"
                        className="flex-1"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button type="button" variant="outline" onClick={applyPromoCode} disabled={!promoCode.trim()}>
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

// Sample data
const initialCartItems = [
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
  {
    id: 3,
    name: "Merino Wool Sweater",
    price: 89.99,
    quantity: 1,
    size: "L",
    color: "Gray",
    image: "/placeholder.svg?height=300&width=300",
  },
]
