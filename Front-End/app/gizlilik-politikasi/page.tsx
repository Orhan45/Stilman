import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gizlilik Politikası | STILMAN",
  description: "STILMAN gizlilik politikası ve kişisel verilerin korunması hakkında bilgi.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Gizlilik Politikası</h1>

      <div className="max-w-3xl space-y-6">
        <p className="text-gray-600">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Giriş</h2>
            <p>
              STILMAN olarak, gizliliğinize saygı duyuyor ve kişisel verilerinizin korunmasına önem veriyoruz. Bu
              Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda kişisel
              verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Toplanan Bilgiler</h2>
            <p>Sizden aşağıdaki kişisel bilgileri toplayabiliriz:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Ad, soyad, e-posta adresi, telefon numarası gibi iletişim bilgileri</li>
              <li>Fatura ve teslimat adresi</li>
              <li>Ödeme bilgileri (kredi kartı bilgileri doğrudan tarafımızca saklanmaz)</li>
              <li>Alışveriş geçmişi ve tercihleriniz</li>
              <li>Web sitemizi nasıl kullandığınıza dair bilgiler (çerezler aracılığıyla)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Bilgilerin Kullanımı</h2>
            <p>Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Siparişlerinizi işlemek ve yönetmek</li>
              <li>Size ürün ve hizmetlerimiz hakkında bilgi sağlamak</li>
              <li>Müşteri hizmetleri sunmak</li>
              <li>Web sitemizi ve hizmetlerimizi geliştirmek</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
              <li>İzniniz olması durumunda, pazarlama iletişimleri göndermek</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Bilgilerin Paylaşımı</h2>
            <p>Kişisel bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmayız:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Siparişlerinizi işlemek için ödeme işlemcileri ve kargo şirketleri gibi hizmet sağlayıcılarla</li>
              <li>Yasal bir yükümlülüğümüz olduğunda veya yasal bir talep üzerine</li>
              <li>Şirketimizin satılması veya birleşmesi durumunda</li>
              <li>Açık izniniz olduğunda</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Çerezler</h2>
            <p>
              Web sitemiz, deneyiminizi geliştirmek için çerezler kullanmaktadır. Çerezler, tarayıcınız tarafından
              cihazınıza yerleştirilen küçük metin dosyalarıdır. Çerezleri kabul etmek istemiyorsanız, tarayıcı
              ayarlarınızı değiştirebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve organizasyonel önlemler alıyoruz. Ancak,
              internet üzerinden veri iletiminin %100 güvenli olmadığını unutmayın.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Haklarınız</h2>
            <p>Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Verilerinize erişim talep etme</li>
              <li>Verilerinizin düzeltilmesini talep etme</li>
              <li>Verilerinizin silinmesini talep etme</li>
              <li>Verilerinizin işlenmesine itiraz etme</li>
              <li>Veri taşınabilirliği talep etme</li>
            </ul>
            <p className="mt-2">Bu haklarınızı kullanmak için info@stilman.com adresine e-posta gönderebilirsiniz.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Değişiklikler</h2>
            <p>
              Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Önemli değişiklikler olması durumunda, web
              sitemizde bir bildirim yayınlayacağız.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">9. İletişim</h2>
            <p>
              Gizlilik Politikamız hakkında sorularınız veya endişeleriniz varsa, lütfen info@stilman.com adresinden
              bizimle iletişime geçin.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
