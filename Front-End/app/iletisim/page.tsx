import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "İletişim | STILMAN",
  description: "STILMAN ile iletişime geçin.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">İletişim</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Bize Ulaşın</h2>
            <p className="text-gray-600 mb-6">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz. En kısa sürede
              size dönüş yapacağız.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Adres</h3>
                  <p className="text-gray-600">
                    Moda Caddesi No:42
                    <br />
                    Kadıköy, İstanbul
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <p className="text-gray-600">+90 212 123 4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">E-posta</h3>
                  <p className="text-gray-600">info@stilman.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Çalışma Saatleri</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Pazartesi - Cuma:</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Cumartesi:</span>
                <span>10:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Pazar:</span>
                <span>Kapalı</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">İletişim Formu</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Adınız Soyadınız
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-posta Adresiniz
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Konu
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Mesajınızın konusu"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Mesajınız
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Mesajınızı buraya yazın..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
