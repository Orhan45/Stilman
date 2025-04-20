import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kullanım Koşulları | STILMAN",
  description: "STILMAN web sitesi kullanım koşulları.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Kullanım Koşulları</h1>

      <div className="max-w-3xl space-y-6">
        <p className="text-gray-600">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Giriş</h2>
            <p>
              Bu Kullanım Koşulları, STILMAN web sitesini (www.stilman.com) kullanımınızı düzenleyen şartları ve
              koşulları belirler. Siteyi kullanarak, bu koşulları kabul etmiş olursunuz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Tanımlar</h2>
            <p>Bu Kullanım Koşulları'nda:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>"Biz", "bize", "bizim" veya "STILMAN" ifadeleri, STILMAN şirketini ifade eder.</li>
              <li>"Siz" veya "sizin" ifadeleri, web sitesi kullanıcısını ifade eder.</li>
              <li>"Web sitesi" ifadesi, www.stilman.com adresindeki web sitesini ve tüm alt sayfalarını ifade eder.</li>
              <li>"Hizmetler" ifadesi, web sitesi aracılığıyla sunduğumuz tüm hizmetleri ifade eder.</li>
              <li>
                "İçerik" ifadesi, web sitesinde yer alan tüm metin, grafik, fotoğraf, ses, video, yazılım ve diğer
                materyalleri ifade eder.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Hesap Oluşturma</h2>
            <p>
              Web sitemizin bazı bölümlerine erişmek veya alışveriş yapmak için bir hesap oluşturmanız gerekebilir.
              Hesap oluşturduğunuzda, doğru, güncel ve eksiksiz bilgiler sağlamakla yükümlüsünüz. Hesap bilgilerinizin
              gizliliğini korumak ve hesabınız altında gerçekleşen tüm etkinliklerden sorumlu olmak sizin
              sorumluluğunuzdadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Fikri Mülkiyet Hakları</h2>
            <p>
              Web sitesindeki tüm içerik, STILMAN'a veya lisans verenlere aittir ve telif hakkı, ticari marka ve diğer
              fikri mülkiyet yasaları tarafından korunmaktadır. Web sitesini kullanmanız, size içeriğin mülkiyetini veya
              herhangi bir fikri mülkiyet hakkını vermez.
            </p>
            <p className="mt-2">
              Web sitesindeki içeriği, önceden yazılı izin almadan ticari amaçlarla kopyalayamaz, değiştiremez,
              dağıtamaz veya başka bir şekilde kullanamazsınız.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Ürünler ve Siparişler</h2>
            <p>
              Web sitemizde satılan ürünlerin fiyatları ve özellikleri, önceden bildirilmeksizin değiştirilebilir. Bir
              sipariş verdiğinizde, siparişinizi kabul etme hakkını saklı tutarız. Siparişinizi aldıktan sonra,
              siparişinizin onaylandığını belirten bir e-posta alacaksınız.
            </p>
            <p className="mt-2">
              Ürünlerin renkleri ve diğer özellikleri, ekranınızda göründüğünden farklı olabilir. Ürün açıklamalarında
              belirtilen özellikler, sadece bilgi amaçlıdır ve garanti teşkil etmez.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">6. İade ve Değişim Politikası</h2>
            <p>
              Ürünlerimizle ilgili iade ve değişim politikamız, web sitemizin İade ve Değişim sayfasında belirtilmiştir.
              Bir ürünü iade etmek veya değiştirmek istiyorsanız, lütfen bu politikayı inceleyiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Kullanıcı Davranışı</h2>
            <p>Web sitemizi kullanırken:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Yasalara uygun davranmalısınız</li>
              <li>Başkalarının haklarına saygı göstermelisiniz</li>
              <li>Web sitesinin normal işleyişini engelleyecek veya zarar verecek davranışlarda bulunmamalısınız</li>
              <li>İstenmeyen e-posta veya reklam göndermek için web sitemizi kullanmamalısınız</li>
              <li>Web sitemize virüs veya diğer zararlı kodlar yüklememelisiniz</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Sorumluluk Sınırlaması</h2>
            <p>
              Web sitemizi ve içeriğini "olduğu gibi" sunuyoruz ve herhangi bir garanti vermiyoruz. Web sitesinin
              kullanımından kaynaklanan doğrudan, dolaylı, tesadüfi, özel veya sonuç olarak ortaya çıkan zararlardan
              sorumlu değiliz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Değişiklikler</h2>
            <p>
              Bu Kullanım Koşulları'nı zaman zaman güncelleyebiliriz. Değişiklikler, web sitemizde yayınlandıktan sonra
              geçerli olacaktır. Web sitemizi kullanmaya devam ederek, güncellenmiş koşulları kabul etmiş olursunuz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">10. İletişim</h2>
            <p>
              Bu Kullanım Koşulları hakkında sorularınız veya endişeleriniz varsa, lütfen info@stilman.com adresinden
              bizimle iletişime geçin.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
