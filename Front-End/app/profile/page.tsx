"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  ChevronRight,
  Edit,
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingBag,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState(initialUserInfo)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    // Here you would typically send the updated info to your backend
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="font-bold text-xl md:text-2xl">
              MINIMAL
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                New Arrivals
              </Link>
              <Link href="/products" className="text-sm font-medium hover:underline underline-offset-4">
                Clothing
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Shoes
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Accessories
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Sale
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Link href="/favorites">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <span className="hidden md:inline">Account</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              alert("Logged out successfully!")
              window.location.href = "/"
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle>
                      {userInfo.firstName} {userInfo.lastName}
                    </CardTitle>
                    <CardDescription>{userInfo.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-medium bg-gray-100">
                    <UserIcon className="h-4 w-4" />
                    Personal Information
                  </Link>
                  <Link
                    href="/profile/orders"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50"
                  >
                    <Package className="h-4 w-4" />
                    Order History
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50"
                  >
                    <Heart className="h-4 w-4" />
                    Saved Items
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Mobile Tabs */}
            <Tabs defaultValue="personal" className="md:hidden mb-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="personal">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Personal Information */}
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <Button variant="default" size="sm" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={userInfo.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={userInfo.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={userInfo.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={userInfo.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={userInfo.zipCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your recent orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">You haven&apos;t placed any orders yet.</p>
                    <Link href="/products">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">Order #{order.id}</h3>
                              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {order.date}
                              </div>
                              <div>{order.items.length} items</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-medium">${order.total.toFixed(2)}</div>
                            </div>
                            <Link href={`/profile/orders/${order.id}`}>
                              <Button variant="outline" size="sm" className="whitespace-nowrap">
                                View Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="h-16 w-16 relative rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {item.size} • {item.color}
                                </p>
                                <p className="text-sm">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex items-center justify-center">
                              <span className="text-sm text-gray-500">+{order.items.length - 3} more items</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 mt-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">MINIMAL</h3>
              <p className="text-sm text-gray-600">Modern, minimal clothing for the contemporary man.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Sale
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Collections
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Help</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black">
                    Terms & Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} MINIMAL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper function for order status badge variants
function getStatusVariant(status: string) {
  switch (status) {
    case "Delivered":
      return "success"
    case "Shipped":
      return "default"
    case "Processing":
      return "secondary"
    case "Cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

// Sample data
const initialUserInfo = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  address: "123 Fashion Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
}

const orders = [
  {
    id: "ORD-2025-1234",
    date: "April 15, 2025",
    status: "Delivered",
    total: 239.97,
    items: [
      {
        name: "Premium Cotton Oxford Shirt",
        price: 79.99,
        size: "M",
        color: "White",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Slim Fit Chino Pants",
        price: 59.99,
        size: "32",
        color: "Navy",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Merino Wool Sweater",
        price: 89.99,
        size: "L",
        color: "Gray",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Leather Belt",
        price: 39.99,
        size: "M",
        color: "Brown",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
  {
    id: "ORD-2025-1189",
    date: "March 28, 2025",
    status: "Shipped",
    total: 149.98,
    items: [
      {
        name: "Classic Denim Jacket",
        price: 99.99,
        size: "L",
        color: "Blue",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Graphic Print T-Shirt",
        price: 29.99,
        size: "M",
        color: "Black",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Cotton Socks (3-Pack)",
        price: 19.99,
        size: "One Size",
        color: "Mixed",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
  {
    id: "ORD-2025-1022",
    date: "February 12, 2025",
    status: "Delivered",
    total: 189.98,
    items: [
      {
        name: "Leather Chelsea Boots",
        price: 149.99,
        size: "10",
        color: "Brown",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Wool Blend Scarf",
        price: 39.99,
        size: "One Size",
        color: "Charcoal",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
]
