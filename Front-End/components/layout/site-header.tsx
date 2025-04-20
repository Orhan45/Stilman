import Link from "next/link"
import { ShoppingBag, Heart, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="font-bold text-xl md:text-2xl">
              STILMAN
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/new-arrivals" className="text-sm font-medium hover:underline underline-offset-4">
                Yeni Gelenler
              </Link>
              <Link href="/products" className="text-sm font-medium hover:underline underline-offset-4">
                Tüm Ürünler
              </Link>
              <Link href="/shoes" className="text-sm font-medium hover:underline underline-offset-4">
                Ayakkabılar
              </Link>
              <Link href="/accessories" className="text-sm font-medium hover:underline underline-offset-4">
                Aksesuarlar
              </Link>
            </nav>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Ara</span>
            </Button>
            <Link href="/favorites">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favoriler</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="hidden md:inline">Giriş Yap</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Sepet</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
