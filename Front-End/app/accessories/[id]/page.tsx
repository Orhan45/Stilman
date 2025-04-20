"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function AccessoryDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  // Find the product based on the ID from the URL
  const productId = Number.parseInt(params.id)
  const product = accessories.find((item) => item.id === productId) || accessories[0]

  const nextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container py-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <Link href="/accessories" className="hover:text-gray-900">
            Aksesuarlar
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Önceki görsel</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Sonraki görsel</span>
              </Button>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2 overflow-auto pb-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
                    selectedImage === index ? "ring-2 ring-black" : "ring-1 ring-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} küçük görsel ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">{product.reviewCount} değerlendirme</span>
              </div>
              <p className="mt-4 text-2xl font-bold">{product.price} TL</p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Color Selection */}
            {product.colors && (
              <div>
                <h3 className="text-sm font-medium mb-3">Renk</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`h-8 w-8 rounded-full ${color.selected ? "ring-2 ring-black ring-offset-2" : ""}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium mb-3">Adet</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart and Wishlist */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1"
                onClick={() => {
                  alert(`${product.name} sepete eklendi!`)
                  router.push("/cart")
                }}
              >
                Sepete Ekle
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {
                  alert(`${product.name} favorilere eklendi!`)
                  router.push("/favorites")
                }}
              >
                <Heart className="h-5 w-5" />
                Favorilere Ekle
              </Button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Detaylar</TabsTrigger>
                  <TabsTrigger value="shipping">Kargo</TabsTrigger>
                  <TabsTrigger value="returns">İade</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4 text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>Malzeme:</strong> {product.material}
                  </p>
                  {product.dimensions && (
                    <p>
                      <strong>Boyutlar:</strong> {product.dimensions}
                    </p>
                  )}
                  {product.warranty && (
                    <p>
                      <strong>Garanti:</strong> {product.warranty}
                    </p>
                  )}
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features && product.features.map((feature, index) => <li key={index}>{feature}</li>)}
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4 text-sm text-gray-600">
                  <p>100 TL üzeri siparişlerde ücretsiz kargo.</p>
                  <p className="mt-2">Tahmini teslimat süresi: 3-5 iş günü.</p>
                </TabsContent>
                <TabsContent value="returns" className="mt-4 text-sm text-gray-600">
                  <p>Kullanılmamış, etiketli ürünler için 30 gün iade hakkı.</p>
                  <p className="mt-2">Türkiye içindeki müşterilerimiz için iade kargo ücretsizdir.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Müşteri Değerlendirmeleri</h2>

          {/* Review Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold">{product.rating.toFixed(1)}</div>
              <div className="flex items-center mt-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">{product.reviewCount || 0} değerlendirme üzerinden</p>
            </div>

            <div className="col-span-2">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const percentage = product.ratingDistribution
                    ? Math.round((product.ratingDistribution[star] / product.reviewCount) * 100)
                    : 0
                  return (
                    <div key={star} className="flex items-center">
                      <div className="flex items-center w-24">
                        <span className="text-sm text-gray-600">{star} yıldız</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mx-2">
                        <div
                          className="h-2 bg-yellow-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                          aria-label={`Değerlendirmelerin %${percentage}'i ${star} yıldız`}
                        ></div>
                      </div>
                      <div className="w-12 text-right">
                        <span className="text-sm text-gray-600">%{percentage}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-8">
            {product.reviews &&
              product.reviews.map((review, index) => (
                <div key={index} className="border-b pb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{review.author}</h3>
                      <div className="flex items-center mt-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                    {review.verified && (
                      <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Onaylı Satın Alma</div>
                    )}
                  </div>
                  <h4 className="font-medium mt-3">{review.title}</h4>
                  <p className="mt-2 text-gray-600">{review.content}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex mt-4 space-x-2">
                      {review.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="h-16 w-16 relative rounded overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Değerlendirme görseli ${imgIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Write a Review */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Değerlendirme Yaz</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="review-name">Adınız</Label>
                  <Input id="review-name" placeholder="Adınızı girin" />
                </div>
                <div>
                  <Label htmlFor="review-email">E-posta Adresiniz</Label>
                  <Input id="review-email" type="email" placeholder="E-posta adresinizi girin" />
                </div>
              </div>

              <div>
                <Label htmlFor="review-title">Değerlendirme Başlığı</Label>
                <Input id="review-title" placeholder="Değerlendirmenize bir başlık verin" />
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Label>Puanlama</Label>
                  <div className="flex ml-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                        >
                          <Star className="h-5 w-5" />
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="review-content">Değerlendirme</Label>
                <Textarea id="review-content" placeholder="Değerlendirmenizi buraya yazın" rows={4} />
              </div>

              <div>
                <Label htmlFor="review-images">Fotoğraf Ekle (isteğe bağlı)</Label>
                <Input id="review-images" type="file" multiple className="mt-1" />
              </div>

              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  alert("Değerlendirmeniz gönderildi! Geri bildiriminiz için teşekkür ederiz.")
                }}
              >
                Değerlendirme Gönder
              </Button>
            </form>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Bunlar da İlginizi Çekebilir</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/accessories/${product.id}`}>
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="mt-1 text-sm font-medium">{product.price} TL</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const accessories = [
  {
    id: 1,
    name: "Klasik Deri Kemer",
    price: "349",
    rating: 4.8,
    reviewCount: 86,
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Bu premium deri kemer, şık bir toka ile klasik bir tasarım sunuyor. Gerçek deriden üretilmiş, hem dayanıklı hem de şık, günlük kullanım için mükemmel.",
    material: "Gerçek Deri",
    dimensions: "Genişlik: 3,8 cm",
    warranty: "1 Yıl Sınırlı Garanti",
    features: [
      "Gerçek deri yapısı",
      "Dayanıklı metal toka",
      "Ayarlanabilir boyut",
      "Dayanıklılık için dikişli kenarlar",
      "Siyah ve kahverengi renklerde mevcut",
    ],
    colors: [
      { name: "Siyah", hex: "#000000", selected: true },
      { name: "Kahverengi", hex: "#8B4513", selected: false },
      { name: "Taba", hex: "#D2B48C", selected: false },
    ],
    ratingDistribution: {
      5: 65,
      4: 15,
      3: 4,
      2: 1,
      1: 1,
    },
    reviews: [
      {
        author: "Mehmet T.",
        rating: 5,
        title: "Mükemmel kalitede kemer",
        content:
          "Bu kemer tam aradığım gibiydi. Deri kalitesi çok iyi ve toka sağlam. Beden tam olarak uyuyor ve hem günlük hem de resmi kıyafetlerle harika görünüyor.",
        date: "15 Mart 2025",
        verified: true,
      },
      {
        author: "Ahmet K.",
        rating: 4,
        title: "İyi kemer, başlangıçta biraz sert",
        content: "Kalite mükemmel ama alışması birkaç gün sürdü. Şimdi rahat ve harika görünüyor. Tavsiye ederim.",
        date: "28 Şubat 2025",
        verified: true,
      },
    ],
  },
]

const relatedProducts = [
  {
    id: 2,
    name: "Minimalist Saat",
    price: "1299",
    image:
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Deri Cüzdan",
    price: "449",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    name: "Çift Taraflı Kemer",
    price: "399",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Paslanmaz Çelik Kol Düğmesi",
    price: "399",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94c4b6b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
]
