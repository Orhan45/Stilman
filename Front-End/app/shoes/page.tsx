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

export default function ShoesPage() {
  // Önce state'leri ekleyelim
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1500])
  const router = useRouter()

  // Kategori filtreleri için state ekliyoruz
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  // Tüm filtreleri sıfırlama fonksiyonu
  const resetAllFilters = () => {
    setSelectedCategories([])
    setSelectedMaterials([])
    setSelectedSizes([])
    setSelectedRatings([])
    setPriceRange([0, 1500])
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

  // Beden seçimi için fonksiyon
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
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
          <h1 className="text-3xl font-bold mb-2">Erkek Ayakkabıları</h1>
          <p className="text-gray-500">Premium ayakkabı koleksiyonumuzla stilinizi tamamlayın</p>
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
                        defaultValue={[0, 1500]}
                        max={3000}
                        step={100}
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
                    <h3 className="font-medium mb-3">Numaralar</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {sizes.map((size) => (
                        <Button
                          key={size}
                          variant="outline"
                          size="sm"
                          className={`text-xs h-8 ${selectedSizes.includes(size) ? "bg-gray-200" : ""}`}
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
                    defaultValue={[0, 1500]}
                    max={3000}
                    step={100}
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
                <h3 className="font-medium mb-3">Numaralar</h3>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      className={`text-xs h-8 ${selectedSizes.includes(size) ? "bg-gray-200" : ""}`}
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
              <p className="text-sm text-gray-500">{shoes.length} ürün gösteriliyor</p>
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
              {shoes.map((product) => (
                <div key={product.id} className="group relative">
                  <Link href={`/shoes/${product.id}`}>
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
                    <Link href={`/shoes/${product.id}`}>
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
                src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Deri Ayakkabılar"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-xl font-bold text-white mb-2">Deri Ayakkabılar</h3>
                <p className="text-white text-sm mb-4">Her ortam için zamansız şıklık</p>
                <Button variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30">
                  Koleksiyonu Keşfet
                </Button>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Spor Ayakkabılar"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-xl font-bold text-white mb-2">Spor Ayakkabılar</h3>
                <p className="text-white text-sm mb-4">Performans ve stil bir arada</p>
                <Button variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30">
                  Koleksiyonu Keşfet
                </Button>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Günlük Ayakkabılar"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-xl font-bold text-white mb-2">Günlük Ayakkabılar</h3>
                <p className="text-white text-sm mb-4">Günlük kullanım için konfor</p>
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
  "Spor Ayakkabılar",
  "Loaferlar",
  "Botlar",
  "Klasik Ayakkabılar",
  "Sandaletler",
  "Atletik",
  "Günlük",
  "Resmi",
]

const sizes = ["40", "41", "42", "43", "44", "45", "46", "47"]

const colors = [
  { name: "Siyah", hex: "#000000" },
  { name: "Kahverengi", hex: "#8B4513" },
  { name: "Beyaz", hex: "#FFFFFF" },
  { name: "Lacivert", hex: "#000080" },
  { name: "Gri", hex: "#808080" },
  { name: "Bej", hex: "#D2B48C" },
  { name: "Kırmızı", hex: "#FF0000" },
  { name: "Mavi", hex: "#0000FF" },
]

const materials = ["Deri", "Süet", "Kanvas", "Sentetik", "File", "Kauçuk", "Naylon", "Gore-Tex"]

const shoes = [
  {
    id: 1,
    name: "Klasik Deri Oxford",
    price: "1499",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Klasik Ayakkabılar",
  },
  {
    id: 2,
    name: "Premium Süet Loafer",
    price: "1299",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1582897085656-c636d006a246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Loaferlar",
  },
  {
    id: 3,
    name: "Minimalist Spor Ayakkabı",
    price: "999",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Spor Ayakkabılar",
  },
  {
    id: 4,
    name: "Chelsea Bot",
    price: "1799",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Botlar",
  },
  {
    id: 5,
    name: "Deri Derby Ayakkabı",
    price: "1599",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Klasik Ayakkabılar",
  },
  {
    id: 6,
    name: "Kanvas Slip-On",
    price: "699",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1603808033176-9d134e6f2c74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Günlük",
  },
  {
    id: 7,
    name: "Koşu Performans Ayakkabısı",
    price: "1299",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Atletik",
  },
  {
    id: 8,
    name: "Deri Tekne Ayakkabısı",
    price: "899",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Günlük",
  },
  {
    id: 9,
    name: "Süet Desert Bot",
    price: "1199",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Botlar",
  },
  {
    id: 10,
    name: "Rugan Resmi Ayakkabı",
    price: "1899",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1613689690690-3d1857f7b0ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Resmi",
  },
  {
    id: 11,
    name: "Deri Penny Loafer",
    price: "1399",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1614253429340-98120bd6d753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Loaferlar",
  },
  {
    id: 12,
    name: "Trekking Botu",
    price: "1699",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1553545985-1e0d8781d5db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Botlar",
  },
]
