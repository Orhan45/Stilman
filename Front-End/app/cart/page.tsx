"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 30
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Alışveriş Sepeti</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="h-16 w-16 mx-auto text-gray-300 mb-4">🛒</div>
          <h2 className="text-2xl font-medium mb-2">Sepetiniz boş</h2>
          <p className="text-gray-500 mb-8">Henüz sepetinize ürün eklememişsiniz.</p>
          <Link href="/products">
            <Button>Alışverişe Devam Et</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 mb-4">
                  <div className="col-span-6">Ürün</div>
                  <div className="col-span-2 text-center">Fiyat</div>
                  <div className="col-span-2 text-center">Adet</div>
                  <div className="col-span-2 text-right">Toplam</div>
                </div>

                <Separator className="mb-6" />

                {cartItems.map((item) => (
                  <div key={item.id} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-6">
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="mt-1 text-sm text-gray-500">
                              <span>Beden: {item.size}</span>
                              <span className="mx-2">•</span>
                              <span>Renk: {item.color}</span>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="mt-2 flex items-center text-sm text-gray-500 hover:text-red-500 md:hidden"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Kaldır
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 md:text-center">
                        <div className="flex items-center justify-between md:block">
                          <span className="md:hidden text-sm font-medium">Fiyat:</span>
                          <span>{item.price.toFixed(2)} TL</span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 md:text-center">
                        <div className="flex items-center justify-between md:justify-center">
                          <span className="md:hidden text-sm font-medium">Adet:</span>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Azalt</span>
                            </Button>
                            <div className="h-8 w-10 flex items-center justify-center border-y">{item.quantity}</div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Artır</span>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 md:text-right">
                        <div className="flex items-center justify-between md:block">
                          <span className="md:hidden text-sm font-medium">Toplam:</span>
                          <span className="font-medium">{(item.price * item.quantity).toFixed(2)} TL</span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hidden md:inline-flex mt-2 items-center text-sm text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Kaldır
                        </button>
                      </div>
                    </div>
                    {cartItems.indexOf(item) < cartItems.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link href="/products">
                <Button variant="outline">Alışverişe Devam Et</Button>
              </Link>
              <Button variant="outline" onClick={() => setCartItems([])}>
                Sepeti Temizle
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Sipariş Özeti</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-medium">{subtotal.toFixed(2)} TL</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo</span>
                  <span className="font-medium">{shipping === 0 ? "Ücretsiz" : `${shipping.toFixed(2)} TL`}</span>
                </div>

                {shipping > 0 && <div className="text-xs text-gray-500">500 TL üzeri siparişlerde kargo ücretsiz</div>}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Toplam</span>
                  <span>{total.toFixed(2)} TL</span>
                </div>

                <div className="text-xs text-gray-500">Vergiler dahildir</div>
              </div>

              <Button className="w-full mt-6" onClick={() => alert("Ödeme sayfasına yönlendiriliyorsunuz...")}>
                Ödemeye Geç
              </Button>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Promosyon Kodu</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Kodu girin" className="flex-1" />
                    <Button variant="outline" onClick={() => alert("Promosyon kodu uygulandı!")}>
                      Uygula
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Sample data
const initialCartItems = [
  {
    id: 1,
    name: "Premium Pamuklu Gömlek",
    price: 399.99,
    quantity: 1,
    size: "M",
    color: "Beyaz",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Slim Fit Chino Pantolon",
    price: 299.99,
    quantity: 2,
    size: "32",
    color: "Lacivert",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Merino Yün Kazak",
    price: 449.99,
    quantity: 1,
    size: "L",
    color: "Gri",
    image: "/placeholder.svg?height=300&width=300",
  },
]
