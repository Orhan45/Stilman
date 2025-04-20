"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Filter, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

// Yeni gelenler verisi
const yeniGelenlerVerisi = {
  giyim: [
    {
      id: "c1",
      name: "Premium Pamuk Oxford Gömlek",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1925&auto=format&fit=crop",
      category: "Gömlekler",
      dateAdded: "2 gün önce",
      colors: ["Lacivert", "Beyaz", "Açık Mavi"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: "c2",
      name: "Slim Fit Streç Chino Pantolon",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1997&auto=format&fit=crop",
      category: "Pantolonlar",
      dateAdded: "3 gün önce",
      colors: ["Haki", "Lacivert", "Zeytin Yeşili"],
      sizes: ["30", "32", "34", "36", "38"],
    },
    {
      id: "c3",
      name: "Merino Yün Bisiklet Yaka Kazak",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1638890816116-8e73cf9dbd0d?q=80&w=1964&auto=format&fit=crop",
      category: "Kazaklar",
      dateAdded: "1 gün önce",
      colors: ["Antrasit", "Bordo", "Orman Yeşili"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "c4",
      name: "Hafif Performans Ceket",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      category: "Dış Giyim",
      dateAdded: "Yeni eklendi",
      colors: ["Siyah", "Lacivert", "Gri"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: "c5",
      name: "Slim Fit Yün Blazer",
      price: 229.99,
      image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1780&auto=format&fit=crop",
      category: "Blazerlar",
      dateAdded: "4 gün önce",
      colors: ["Lacivert", "Antrasit", "Siyah"],
      sizes: ["38R", "40R", "42R", "44R", "46R"],
    },
    {
      id: "c6",
      name: "Premium Denim Kot Pantolon",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop",
      category: "Kotlar",
      dateAdded: "2 gün önce",
      colors: ["Koyu Yıkama", "Orta Yıkama", "Açık Yıkama"],
      sizes: ["30", "32", "34", "36", "38"],
    },
    {
      id: "c7",
      name: "Lüks Pima Pamuk T-Shirt",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
      category: "T-Shirtler",
      dateAdded: "Yeni eklendi",
      colors: ["Beyaz", "Siyah", "Gri", "Lacivert"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: "c8",
      name: "Performans Golf Polo",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
      category: "Pololar",
      dateAdded: "3 gün önce",
      colors: ["Lacivert", "Beyaz", "Açık Mavi", "Kırmızı"],
      sizes: ["S", "M", "L", "XL"],
    },
  ],
  ayakkabi: [
    {
      id: "s1",
      name: "Premium Deri Oxford Ayakkabı",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1780&auto=format&fit=crop",
      category: "Klasik Ayakkabılar",
      dateAdded: "Yeni eklendi",
      colors: ["Siyah", "Kahverengi", "Taba"],
      sizes: ["40", "41", "42", "43", "44", "45"],
    },
    {
      id: "s2",
      name: "Performans Koşu Spor Ayakkabı",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop",
      category: "Spor Ayakkabılar",
      dateAdded: "2 gün önce",
      colors: ["Siyah/Beyaz", "Gri/Mavi", "Tamamen Siyah"],
      sizes: ["40", "41", "42", "43", "44", "45"],
    },
    {
      id: "s3",
      name: "Günlük Süet Loafer",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1769&auto=format&fit=crop",
      category: "Loaferlar",
      dateAdded: "3 gün önce",
      colors: ["Lacivert", "Kahverengi", "Taba"],
      sizes: ["40", "41", "42", "43", "44", "45"],
    },
    {
      id: "s4",
      name: "Su Geçirmez Yürüyüş Botu",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
      category: "Botlar",
      dateAdded: "1 gün önce",
      colors: ["Kahverengi", "Siyah", "Zeytin Yeşili"],
      sizes: ["40", "41", "42", "43", "44", "45"],
    },
    {
      id: "s5",
      name: "Klasik Kanvas Spor Ayakkabı",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?q=80&w=1780&auto=format&fit=crop",
      category: "Spor Ayakkabılar",
      dateAdded: "Yeni eklendi",
      colors: ["Beyaz", "Siyah", "Lacivert", "Kırmızı"],
      sizes: ["40", "41", "42", "43", "44", "45"],
    },
    {
      id: "s6",
      name: "Premium Deri Chelsea Bot",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1935&auto=format&fit=crop",
      category: "Botlar",
      dateAdded: "4 gün önce",
      colors: ["Siyah", "Kahverengi", "Taba"],
      sizes: ["40", "41", "42", "43", "44", "45"],
    },
  ],
  aksesuar: [
    {
      id: "a1",
      name: "İtalyan Deri Kemer",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1624222247344-550fb60ae8b1?q=80&w=1770&auto=format&fit=crop",
      category: "Kemerler",
      dateAdded: "Yeni eklendi",
      colors: ["Siyah", "Kahverengi", "Taba"],
      sizes: ["85", "90", "95", "100", "105"],
    },
    {
      id: "a2",
      name: "Lüks Otomatik Saat",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop",
      category: "Saatler",
      dateAdded: "2 gün önce",
      colors: ["Gümüş/Siyah", "Altın/Kahverengi", "Tamamen Siyah"],
      sizes: ["Tek Beden"],
    },
    {
      id: "a3",
      name: "Premium Deri Cüzdan",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1887&auto=format&fit=crop",
      category: "Cüzdanlar",
      dateAdded: "3 gün önce",
      colors: ["Siyah", "Kahverengi", "Taba"],
      sizes: ["Tek Beden"],
    },
    {
      id: "a4",
      name: "İpek Kravat Koleksiyonu",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?q=80&w=1776&auto=format&fit=crop",
      category: "Kravatlar",
      dateAdded: "1 gün önce",
      colors: ["Lacivert Desenli", "Kırmızı Desenli", "Siyah Desenli"],
      sizes: ["Tek Beden"],
    },
    {
      id: "a5",
      name: "Tasarım Güneş Gözlüğü",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop",
      category: "Gözlükler",
      dateAdded: "Yeni eklendi",
      colors: ["Siyah", "Kahverengi Desenli", "Gümüş"],
      sizes: ["Tek Beden"],
    },
    {
      id: "a6",
      name: "Deri Evrak Çantası",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1769&auto=format&fit=crop",
      category: "Çantalar",
      dateAdded: "4 gün önce",
      colors: ["Kahverengi", "Siyah", "Taba"],
      sizes: ["Tek Beden"],
    },
    {
      id: "a7",
      name: "Kaşmir Atkı",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1887&auto=format&fit=crop",
      category: "Atkılar",
      dateAdded: "2 gün önce",
      colors: ["Lacivert", "Antrasit", "Bordo"],
      sizes: ["Tek Beden"],
    },
    {
      id: "a8",
      name: "Deri Eldiven",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1584189990481-a74a74f022ba?q=80&w=1780&auto=format&fit=crop",
      category: "Eldivenler",
      dateAdded: "3 gün önce",
      colors: ["Siyah", "Kahverengi", "Taba"],
      sizes: ["S", "M", "L", "XL"],
    },
  ],
}

export default function YeniGelenlerSayfasi() {
  const [activeCategory, setActiveCategory] = useState("tumu")
  const [sortOption, setSortOption] = useState("en-yeni")

  // Tüm ürünleri birleştir ve filtreleri uygula
  const tumUrunleriGetir = () => {
    let tumUrunler = [
      ...yeniGelenlerVerisi.giyim.map((item) => ({ ...item, productType: "giyim" })),
      ...yeniGelenlerVerisi.ayakkabi.map((item) => ({ ...item, productType: "ayakkabi" })),
      ...yeniGelenlerVerisi.aksesuar.map((item) => ({ ...item, productType: "aksesuar" })),
    ]

    // Kategori "tümü" değilse filtrele
    if (activeCategory !== "tumu") {
      tumUrunler = tumUrunler.filter((product) => product.productType === activeCategory)
    }

    // Ürünleri sırala
    switch (sortOption) {
      case "en-yeni":
        // Demo amaçlı, ekleme tarihine göre sıralama
        // Gerçek bir uygulamada, gerçek zaman damgaları kullanırsınız
        const tarihSirasi = ["Yeni eklendi", "1 gün önce", "2 gün önce", "3 gün önce", "4 gün önce"]
        tumUrunler.sort((a, b) => {
          return tarihSirasi.indexOf(a.dateAdded) - tarihSirasi.indexOf(b.dateAdded)
        })
        break
      case "fiyat-dusuk":
        tumUrunler.sort((a, b) => a.price - b.price)
        break
      case "fiyat-yuksek":
        tumUrunler.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    return tumUrunler
  }

  const urunler = tumUrunleriGetir()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">
          Ana Sayfa
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-900">Yeni Gelenler</span>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Yeni Gelenler</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Premium erkek giyim koleksiyonumuzun en yeni ürünlerini keşfedin. Olağanüstü kalite ve detaylara özen
            gösterilerek tasarlanmış en yeni modellerimizle tarzınızı yükseltin.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Alışverişe Başla
            </Button>
          </div>
        </div>
      </div>

      {/* Yeni Eklenenler Banner */}
      <div className="bg-gray-50 p-6 rounded-lg mb-10 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">Bugün Eklenenler</h3>
          <p className="text-gray-600 max-w-xl">
            En yeni ürünlerimizi ilk keşfeden siz olun. Bu ürünler yeni geldi ve uzun süre stokta kalmayacak.
          </p>
        </div>
        <Button className="mt-4 md:mt-0">Bugün Eklenen Tüm Ürünler</Button>
      </div>

      {/* Kategori Sekmeleri ve Filtreler */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Tabs defaultValue="tumu" className="w-full md:w-auto" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="tumu">Tümü</TabsTrigger>
            <TabsTrigger value="giyim">Giyim</TabsTrigger>
            <TabsTrigger value="ayakkabi">Ayakkabı</TabsTrigger>
            <TabsTrigger value="aksesuar">Aksesuar</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filtreler</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Ürünleri Filtrele</SheetTitle>
                <SheetDescription>Belirli filtrelerle aramanızı daraltın.</SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="category">
                    <AccordionTrigger>Kategori</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="all-categories" />
                          <label htmlFor="all-categories">Tüm Kategoriler</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="shirts" />
                          <label htmlFor="shirts">Gömlekler</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="pants" />
                          <label htmlFor="pants">Pantolonlar</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="shoes" />
                          <label htmlFor="shoes">Ayakkabılar</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="accessories" />
                          <label htmlFor="accessories">Aksesuarlar</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price">
                    <AccordionTrigger>Fiyat Aralığı</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Input type="number" placeholder="Min" className="w-full" />
                          <span>ile</span>
                          <Input type="number" placeholder="Max" className="w-full" />
                        </div>
                        <Button className="w-full">Uygula</Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="size">
                    <AccordionTrigger>Beden</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                          <div key={size} className="border rounded-md px-3 py-1 cursor-pointer hover:bg-gray-100">
                            {size}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="color">
                    <AccordionTrigger>Renk</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-3">
                        {["Siyah", "Beyaz", "Lacivert", "Gri", "Kahverengi", "Kırmızı", "Yeşil", "Mavi"].map(
                          (color) => (
                            <div key={color} className="flex items-center space-x-2">
                              <Checkbox id={`color-${color.toLowerCase()}`} />
                              <label htmlFor={`color-${color.toLowerCase()}`}>{color}</label>
                            </div>
                          ),
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="arrival-date">
                    <AccordionTrigger>Eklenme Tarihi</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="just-added" />
                          <label htmlFor="just-added">Yeni Eklenenler</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="last-24-hours" />
                          <label htmlFor="last-24-hours">Son 24 Saat</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="last-week" />
                          <label htmlFor="last-week">Son Hafta</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="last-month" />
                          <label htmlFor="last-month">Son Ay</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex items-center justify-between mt-8">
                  <Button variant="outline">Tümünü Sıfırla</Button>
                  <Button>Filtreleri Uygula</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sırala" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-yeni">En Yeni</SelectItem>
              <SelectItem value="fiyat-dusuk">Fiyat: Düşükten Yükseğe</SelectItem>
              <SelectItem value="fiyat-yuksek">Fiyat: Yüksekten Düşüğe</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Ürünler Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {urunler.map((urun) => (
          <Link href={`/${urun.productType}/${urun.id}`} key={`${urun.productType}-${urun.id}`} className="group">
            <div className="relative overflow-hidden rounded-lg mb-3">
              {urun.dateAdded === "Yeni eklendi" && (
                <Badge className="absolute top-2 right-2 z-10 bg-black text-white">YENİ EKLENEN</Badge>
              )}
              <div className="relative h-80 overflow-hidden rounded-lg">
                <Image
                  src={urun.image || "/placeholder.svg"}
                  alt={urun.name}
                  width={300}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button className="bg-white text-black hover:bg-gray-100">Hızlı Bakış</Button>
              </div>
            </div>
            <h3 className="font-medium text-lg mb-1">{urun.name}</h3>
            <p className="text-gray-700 mb-1">{urun.price.toFixed(2)} ₺</p>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{urun.dateAdded}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {urun.colors.slice(0, 3).map((color, index) => (
                <span key={index} className="text-xs text-gray-500">
                  {color}
                  {index < Math.min(urun.colors.length, 3) - 1 ? ", " : ""}
                </span>
              ))}
              {urun.colors.length > 3 && <span className="text-xs text-gray-500">+{urun.colors.length - 3} daha</span>}
            </div>
          </Link>
        ))}
      </div>

      {/* Bülten Aboneliği */}
      <div className="bg-gray-100 rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Yeni Ürünlerden İlk Siz Haberdar Olun</h3>
          <p className="text-gray-600 mb-6">
            Bültenimize abone olun ve yeni ürünler, özel teklifler ve stil ilhamları hakkında ilk siz haberdar olun.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="E-posta adresiniz" className="flex-grow" />
            <Button>Abone Ol</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
