export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Şifremi Unuttum</h1>
        <p className="text-center text-gray-600 mb-8">
          E-posta adresinizi girin ve size şifre sıfırlama bağlantısı gönderelim.
        </p>

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

          <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
            Sıfırlama Bağlantısı Gönder
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          <a href="/login" className="font-medium text-black hover:underline">
            Giriş sayfasına geri dön
          </a>
        </p>
      </div>
    </div>
  )
}
