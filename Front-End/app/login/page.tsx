export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>

        <form className="space-y-4">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">
                Şifre
              </label>
              <a href="/forgot-password" className="text-xs text-gray-600 hover:text-black">
                Şifremi unuttum
              </a>
            </div>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex items-center">
            <input id="remember-me" type="checkbox" className="h-4 w-4 border-gray-300 rounded" />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
              Beni hatırla
            </label>
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
            Giriş Yap
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">veya şununla devam et</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Google
            </button>
            <button
              type="button"
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Apple
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Hesabınız yok mu?{" "}
          <a href="/signup" className="font-medium text-black hover:underline">
            Kayıt ol
          </a>
        </p>
      </div>
    </div>
  )
}
