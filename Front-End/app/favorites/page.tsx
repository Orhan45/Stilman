"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites)

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Favorilerim</h1>
        <p className="text-sm text-gray-500">{favorites.length} ürün</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium mb-2">Favori listeniz boş</h2>
          <p className="text-gray-500 mb-8">Beğendiğiniz ürünleri favorilere ekleyerek burada saklayabilirsiniz.</p>
          <Link href="/products">
            <Button>Ürünlere Göz At</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="group relative border rounded-lg overflow-hidden bg-white">
                <div className="aspect-square relative overflow-hidden">
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromFavorites(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Favorilerden kaldır</span>
                  </Button>
                </div>
                <div className="p-4">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-medium hover:underline">{item.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-medium">{item.price} TL</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => removeFromFavorites(item.id)}
                      >
                        <Heart className="h-4 w-4 fill-black" />
                        <span className="sr-only">Favorilerden kaldır</span>
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          alert(`${item.name} sepete eklendi!`)
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Sepete ekle</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/products">
              <Button variant="outline">Alışverişe Devam Et</Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                setFavorites([])
                alert("Tüm favoriler temizlendi!")
              }}
            >
              Tüm Favorileri Temizle
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

// Sample data
const initialFavorites = [
  {
    id: 1,
    name: "Premium Pamuklu Gömlek",
    price: "399.99",
    category: "Gömlekler",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Slim Fit Chino Pantolon",
    price: "299.99",
    category: "Pantolonlar",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Merino Yün Kazak",
    price: "449.99",
    category: "Kazaklar",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Klasik Kot Ceket",
    price: "599.99",
    category: "Ceketler",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Deri Chelsea Bot",
    price: "899.99",
    category: "Ayakkabılar",
    image: "/placeholder.svg?height=300&width=300",
  },
]
