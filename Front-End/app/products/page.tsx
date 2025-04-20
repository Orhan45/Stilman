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

export default function ProductsPage() {
  // Önce state'leri ekleyelim
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const router = useRouter()

  // Kategori filtreleri için state ekliyoruz
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  // Tüm filtreleri sıfırlama fonksiyonu
  const resetAllFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedRatings([])
    setPriceRange([0, 200])
  }

  // Kategori seçimi için fonksiyon
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Beden seçimi için fonksiyon
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  // Renk seçimi için fonksiyon
  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  // Yıldız derecelendirmesi seçimi için fonksiyon
  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  return (
    <div className="w-full py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Erkek Giyim</h1>
        <p className="text-gray-500">Premium erkek giyim koleksiyonumuzu keşfedin</p>
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
                      defaultValue={[0, 200]}
                      max={300}
                      step={10}
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

                {/* Sizes */}
                <div>
                  <h3 className="font-medium mb-3">Bedenler</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSizes.includes(size) ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-medium mb-3">Renkler</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <div
                        key={color.name}
                        className={`w-6 h-6 rounded-full cursor-pointer border border-gray-200 ${
                          selectedColors.includes(color.name) ? "ring-2 ring-primary" : ""
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        onClick={() => toggleColor(color.name)}
                      />
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
                  defaultValue={[0, 200]}
                  max={300}
                  step={10}
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

            {/* Sizes */}
            <div>
              <h3 className="font-medium mb-3">Bedenler</h3>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-medium mb-3">Renkler</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <div
                    key={color.name}
                    className={`w-6 h-6 rounded-full cursor-pointer border border-gray-200 ${
                      selectedColors.includes(color.name) ? "ring-2 ring-primary" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    onClick={() => toggleColor(color.name)}
                  />
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
            <p className="text-sm text-gray-500">{products.length} ürün gösteriliyor</p>
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
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <Link href={`/products/${product.id}`}>
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
                            // Add to cart functionality would go here
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
                            // Add to favorites functionality would go here
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
                  <Link href={`/products/${product.id}`}>
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
  )
}

// Sample data
const categories = [
  "T-Shirts",
  "Gömlekler",
  "Kazaklar",
  "Hırkalar",
  "Ceketler",
  "Pantolonlar",
  "Kot Pantolonlar",
  "Şortlar",
]

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"]

const colors = [
  { name: "Siyah", hex: "#000000" },
  { name: "Beyaz", hex: "#FFFFFF" },
  { name: "Gri", hex: "#808080" },
  { name: "Lacivert", hex: "#000080" },
  { name: "Mavi", hex: "#0000FF" },
  { name: "Yeşil", hex: "#008000" },
  { name: "Kırmızı", hex: "#FF0000" },
  { name: "Kahverengi", hex: "#A52A2A" },
  { name: "Bej", hex: "#F5F5DC" },
]

const products = [
  {
    id: 1,
    name: "Yeşil Polo Yaka T-Shirt",
    price: "349",
    rating: 4.5,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c672a54c-591e-48ee-ae48-e1055460a96a_quality100_cropCenter-hlx2iafb7H0CyoInNpUtCJZiaSNOQn.webp",
  },
  {
    id: 2,
    name: "Mercan Rengi Basic T-Shirt",
    price: "299",
    rating: 4.7,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/67a7dc09-d14f-4f73-ae89-86f9b6da35ee_size555x830_quality90_cropCenter-jRsYKHKDLDrqq5S5uS9YkepZRAY86V.webp",
  },
  {
    id: 3,
    name: "Kırmızı Çizgili T-Shirt",
    price: "329",
    rating: 4.6,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ded5ded7-fb60-4520-8df3-539d7be63758_size555x830_quality90_cropCenter-WTXvNWQKPzJoY8TzildXRJKgOiAAPk.webp",
  },
  {
    id: 4,
    name: "Haki Keten Gömlek",
    price: "459",
    rating: 4.8,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/keten%20g%C3%B6mlek-miw0T3tug9E4Er9SpCFgyZiVNrpGX3.webp",
  },
  {
    id: 5,
    name: "Gri Yün Karışımlı Kazak",
    price: "699",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1638892447557-e897e3d8d849?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Mavi Keten Gömlek",
    price: "459",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Siyah Deri Ceket",
    price: "1299",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1335&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Bej Chino Pantolon",
    price: "549",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Grafik Baskılı T-Shirt",
    price: "349",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Mavi Kot Ceket",
    price: "899",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Lacivert Polo Yaka T-Shirt",
    price: "399",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1471&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "Haki Kargo Şort",
    price: "449",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1470&auto=format&fit=crop",
  },
]
