export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Hesap Oluştur</h1>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Ad Soyad
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ad Soyad"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="ornek@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password-confirm" className="block text-sm font-medium">
              Şifre Tekrar
            </label>
            <input
              id="password-confirm"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" className="h-4 w-4 border-gray-300 rounded" required />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                <a href="#" className="text-black hover:underline">
                  Kullanım Koşulları
                </a>{" "}
                ve{" "}
                <a href="#" className="text-black hover:underline">
                  Gizlilik Politikası
                </a>
                'nı kabul ediyorum
              </label>
            </div>
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
            Kayıt Ol
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{" "}
          <a href="/login" className="font-medium text-black hover:underline">
            Giriş yap
          </a>
        </p>
      </div>
    </div>
  )
}
