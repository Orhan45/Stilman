import Link from "next/link"

export function SiteFooter() {
  const categories = [
    {
      name: "Gömlekler",
      href: "/category/shirts",
    },
    {
      name: "Pantolonlar",
      href: "/category/pants",
    },
    {
      name: "Ceketler",
      href: "/category/jackets",
    },
    {
      name: "Ayakkabılar",
      href: "/category/shoes",
    },
  ]

  return (
    <footer className="py-12 border-t">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">STILMAN</h3>
            <p className="text-gray-600">Premium erkek giyim ve aksesuarları. Minimal tasarım, maksimum stil.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Kategoriler</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href} className="text-gray-600 hover:text-black">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Bilgi</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/hakkimizda" className="text-gray-600 hover:text-black">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-600 hover:text-black">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="text-gray-600 hover:text-black">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kullanim-kosullari" className="text-gray-600 hover:text-black">
                  Kullanım Koşulları
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">İletişim</h4>
            <address className="not-italic text-gray-600">
              <p>Moda Caddesi No:42</p>
              <p>Kadıköy, İstanbul</p>
              <p className="mt-2">info@stilman.com</p>
              <p>+90 212 123 4567</p>
            </address>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} STILMAN. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
