import { CategoryNavigation } from "@/components/category-navigation"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"

// Kategori verilerini tanımlayalım
const categories = {
  shirts: {
    title: "Gömlekler",
    description: "Şık ve rahat erkek gömlekleri",
    products: [
      {
        id: 1,
        name: "Klasik Beyaz Gömlek",
        price: 399.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1925&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Slim Fit Mavi Gömlek",
        price: 349.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 3,
        name: "Keten Karışımlı Gömlek",
        price: 449.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1602810316693-3667c854239a?q=80&w=1770&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Çizgili Pamuklu Gömlek",
        price: 379.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac5?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 5,
        name: "Oxford Pamuklu Gömlek",
        price: 429.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1776&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Denim Gömlek",
        price: 459.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?q=80&w=1974&auto=format&fit=crop",
      },
    ],
  },
  pants: {
    title: "Pantolonlar",
    description: "Rahat ve dayanıklı erkek pantolonları",
    products: [
      {
        id: 1,
        name: "Slim Fit Chino Pantolon",
        price: 499.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1997&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Klasik Kot Pantolon",
        price: 599.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop",
      },
      {
        id: 3,
        name: "Kargo Pantolon",
        price: 549.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Keten Pantolon",
        price: 479.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=1972&auto=format&fit=crop",
      },
      {
        id: 5,
        name: "Jogger Pantolon",
        price: 399.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1854&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Kumaş Pantolon",
        price: 649.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1974&auto=format&fit=crop",
      },
    ],
  },
  jackets: {
    title: "Ceketler",
    description: "Stil sahibi erkek ceketleri",
    products: [
      {
        id: 1,
        name: "Deri Ceket",
        price: 1299.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1770&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Kot Ceket",
        price: 899.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 3,
        name: "Bomber Ceket",
        price: 999.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Yağmurluk",
        price: 799.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?q=80&w=1770&auto=format&fit=crop",
      },
      {
        id: 5,
        name: "Blazer Ceket",
        price: 1199.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1780&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Spor Ceket",
        price: 849.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=1769&auto=format&fit=crop",
      },
    ],
  },
  shoes: {
    title: "Ayakkabılar",
    description: "Konforlu ve şık erkek ayakkabıları",
    products: [
      {
        id: 1,
        name: "Deri Oxford Ayakkabı",
        price: 1199.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1780&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Süet Loafer",
        price: 999.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1769&auto=format&fit=crop",
      },
      {
        id: 3,
        name: "Spor Ayakkabı",
        price: 899.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Chelsea Bot",
        price: 1299.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1935&auto=format&fit=crop",
      },
      {
        id: 5,
        name: "Kanvas Ayakkabı",
        price: 699.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?q=80&w=1780&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Koşu Ayakkabısı",
        price: 1099.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
      },
    ],
  },
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Kategori var mı kontrol edelim
  if (!categories[slug as keyof typeof categories]) {
    return notFound()
  }

  const category = categories[slug as keyof typeof categories]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold mb-6">Erkek Giyim Mağazası</h1>
          <CategoryNavigation />
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
          <p className="text-gray-500">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  unoptimized
                />
              </div>
              <h3 className="text-sm font-medium">{product.name}</h3>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm font-medium">{product.price.toFixed(2)} TL</p>
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-current text-yellow-400" />
                  <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                </div>
              </div>
              <div className="mt-3">
                <Button size="sm" className="w-full">
                  Sepete Ekle
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
