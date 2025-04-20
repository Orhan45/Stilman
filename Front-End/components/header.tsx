import Link from "next/link"
import { ShoppingBag, Heart, User } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <h1 className="font-bold text-xl">MINIMAL</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/products" className="text-sm font-medium hover:text-gray-600">
              Tüm Ürünler
            </Link>
            <Link href="/new-arrivals" className="text-sm font-medium hover:text-gray-600">
              Yeni Gelenler
            </Link>
            <Link href="/accessories" className="text-sm font-medium hover:text-gray-600">
              Aksesuarlar
            </Link>
            <Link href="/shoes" className="text-sm font-medium hover:text-gray-600">
              Ayakkabılar
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/favorites" className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
