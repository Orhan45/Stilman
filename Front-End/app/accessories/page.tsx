"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, Filter, Heart, ShoppingCart, Star, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AccessoriesPage() {
  // State tanımlamaları
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const router = useRouter()

  // Kategori filtreleri için state ekliyoruz
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  // Tüm filtreleri sıfırlama fonksiyonu
  const resetAllFilters = () => {
    setSelectedCategories([])
    setSelectedMaterials([])
    setSelectedRatings([])
    setPriceRange([0, 1000])
  }

  // Kategori seçimi için fonksiyon
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Malzeme seçimi için fonksiyon
  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  // Yıldız derecelendirmesi seçimi için fonksiyon
  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Erkek Aksesuarları</h1>
          <p className="text-gray-500">Stilinizi tamamlayacak premium aksesuar koleksiyonumuz</p>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtreler
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filtreler</h2>
                  <Button variant="ghost" size="sm" onClick={() => setFilterOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {/* Mobile Filters - Same as desktop sidebar */}
                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-3">Kategoriler</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label htmlFor={`mobile-${category}`} className="text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-3">Fiyat Aralığı</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 1000]}
                        max={2000}
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-4"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{priceRange[0]} TL</span>
                        <span className="text-sm">{priceRange[1]} TL</span>
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="font-medium mb-3">Renkler</h3>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <div
                          key={color.name}
                          className="w-6 h-6 rounded-full cursor-pointer border border-gray-200"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <h3 className="font-medium mb-3">Malzemeler</h3>
                    <div className="space-y-2">
                      {materials.map((material) => (
                        <div key={material} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-material-${material}`}
                            checked={selectedMaterials.includes(material)}
                            onCheckedChange={() => toggleMaterial(material)}
                          />
                          <label htmlFor={`mobile-material-${material}`} className="text-sm">
                            {material}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div>
                    <h3 className="font-medium mb-3">Değerlendirme</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-rating-${rating}`}
                            checked={selectedRatings.includes(rating)}
                            onCheckedChange={() => toggleRating(rating)}
                          />
                          <label htmlFor={`mobile-rating-${rating}`} className="text-sm flex items-center">
                            {Array(rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                              ))}
                            {Array(5 - rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-gray-300" />
                              ))}
                            <span className="ml-1">& Üzeri</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <Button className="flex-1">Uygula</Button>
                    <Button variant="outline" onClick={resetAllFilters}>
                      Sıfırla
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sırala" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Öne Çıkanlar</SelectItem>
              <SelectItem value="newest">En Yeniler</SelectItem>
              <SelectItem value="price-low">Fiyat: Düşükten Yükseğe</SelectItem>
              <SelectItem value="price-high">Fiyat: Yüksekten Düşüğe</SelectItem>
              <SelectItem value="rating">En Çok Değerlendirilenler</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Filtreler</h2>
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={resetAllFilters}>
                  Tümünü Sıfırla
                </Button>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Kategoriler</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={category} className="text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Fiyat Aralığı</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={2000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{priceRange[0]} TL</span>
                    <span className="text-sm">{priceRange[1]} TL</span>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-medium mb-3">Renkler</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div
                      key={color.name}
                      className="w-6 h-6 rounded-full cursor-pointer border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="font-medium mb-3">Malzemeler</h3>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`material-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onCheckedChange={() => toggleMaterial(material)}
                      />
                      <label htmlFor={`material-${material}`} className="text-sm">
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="font-medium mb-3">Değerlendirme</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={() => toggleRating(rating)}
                      />
                      <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                        {Array(rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                          ))}
                        {Array(5 - rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-gray-300" />
                          ))}
                        <span className="ml-1">& Üzeri</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Filtreleri Uygula</Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort - Desktop */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">{accessories.length} ürün gösteriliyor</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sırala:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sırala" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Öne Çıkanlar</SelectItem>
                    <SelectItem value="newest">En Yeniler</SelectItem>
                    <SelectItem value="price-low">Fiyat: Düşükten Yükseğe</SelectItem>
                    <SelectItem value="price-high">Fiyat: Yüksekten Düşüğe</SelectItem>
                    <SelectItem value="rating">En Çok Değerlendirilenler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {accessories.map((product) => (
                <div key={product.id} className="group relative">
                  <Link href={`/accessories/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-90 transition-opacity">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-9 w-9 rounded-full"
                            onClick={(e) => {
                              e.preventDefault()
                              alert(`${product.name} sepete eklendi!`)
                              router.push("/cart")
                            }}
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span className="sr-only">Sepete ekle</span>
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-9 w-9 rounded-full"
                            onClick={(e) => {
                              e.preventDefault()
                              alert(`${product.name} favorilere eklendi!`)
                              router.push("/favorites")
                            }}
                          >
                            <Heart className="h-4 w-4" />
                            <span className="sr-only">Favorilere ekle</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-2">
                    <Link href={`/accessories/${product.id}`}>
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-medium">{product.price} TL</p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-current text-yellow-400" />
                          <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-12">
              <Button variant="outline" size="icon" disabled>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                3
              </Button>
              <span>...</span>
              <Button variant="outline" size="sm" className="h-8 w-8">
                8
              </Button>
              <Button variant="outline" size="icon">
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collections Banner */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Öne Çıkan Koleksiyonlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Deri Aksesuarlar"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-xl font-bold text-white mb-2">Deri Aksesuarlar</h3>
                <p className="text-white text-sm mb-4">Zamansız şıklık için premium deri</p>
                <Button variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30">
                  Koleksiyonu Keşfet
                </Button>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Saatler"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-xl font-bold text-white mb-2">Saatler</h3>
                <p className="text-white text-sm mb-4">Zamanı stilinizle yakalayın</p>
                <Button variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30">
                  Koleksiyonu Keşfet
                </Button>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Güneş Gözlükleri"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-xl font-bold text-white mb-2">Güneş Gözlükleri</h3>
                <p className="text-white text-sm mb-4">Tarzınızı tamamlayan detaylar</p>
                <Button variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30">
                  Koleksiyonu Keşfet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const categories = [
  "Kemerler",
  "Saatler",
  "Güneş Gözlükleri",
  "Cüzdanlar",
  "Kravatlar",
  "Kol Düğmeleri",
  "Şapkalar",
  "Çantalar",
]

const colors = [
  { name: "Siyah", hex: "#000000" },
  { name: "Kahverengi", hex: "#8B4513" },
  { name: "Gümüş", hex: "#C0C0C0" },
  { name: "Altın", hex: "#FFD700" },
  { name: "Lacivert", hex: "#000080" },
  { name: "Bordo", hex: "#800000" },
  { name: "Yeşil", hex: "#008000" },
  { name: "Gri", hex: "#808080" },
]

const materials = ["Deri", "Metal", "Ahşap", "Kumaş", "Plastik", "Cam", "Paslanmaz Çelik", "İpek"]

const accessories = [
  {
    id: 1,
    name: "Klasik Deri Kemer",
    price: "349",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Kemerler",
  },
  {
    id: 2,
    name: "Minimalist Saat",
    price: "1299",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Saatler",
  },
  {
    id: 3,
    name: "Aviator Güneş Gözlüğü",
    price: "599",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Güneş Gözlükleri",
  },
  {
    id: 4,
    name: "Deri Cüzdan",
    price: "449",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Cüzdanlar",
  },
  {
    id: 5,
    name: "İpek Kravat",
    price: "299",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1598879445146-5a1d1f0c1c9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Kravatlar",
  },
  {
    id: 6,
    name: "Paslanmaz Çelik Kol Düğmesi",
    price: "399",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94c4b6b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Kol Düğmeleri",
  },
  {
    id: 7,
    name: "Yün Fötr Şapka",
    price: "499",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Şapkalar",
  },
  {
    id: 8,
    name: "Deri Evrak Çantası",
    price: "1899",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Çantalar",
  },
  {
    id: 9,
    name: "Kronograf Saat",
    price: "2499",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Saatler",
  },
  {
    id: 10,
    name: "Polarize Güneş Gözlüğü",
    price: "799",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Güneş Gözlükleri",
  },
  {
    id: 11,
    name: "Çift Taraflı Kemer",
    price: "399",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Kemerler",
  },
  {
    id: 12,
    name: "Kartlık Cüzdan",
    price: "299",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Cüzdanlar",
  },
]
