import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hakkımızda | STILMAN",
  description: "STILMAN markası hakkında bilgi edinin.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Hakkımızda</h1>

      <div className="max-w-3xl space-y-6">
        <p>
          STILMAN, 2015 yılında İstanbul'da kurulmuş, modern ve minimalist erkek giyim markasıdır. Amacımız, yüksek
          kaliteli, zamansız ve şık parçalar sunarak erkeklerin gardıroplarını sadeleştirmek ve aynı zamanda
          zenginleştirmektir.
        </p>

        <h2 className="text-xl font-semibold mt-8">Vizyonumuz</h2>
        <p>
          Erkek modasında sadeliğin ve kalitenin öncüsü olmak. Her erkeğin gardırobunda bulunması gereken temel
          parçaları, en kaliteli malzemelerle ve sürdürülebilir üretim yöntemleriyle sunmak.
        </p>

        <h2 className="text-xl font-semibold mt-8">Misyonumuz</h2>
        <p>
          Müşterilerimize uzun ömürlü, kaliteli ve şık giyim ürünleri sunarak, onların kendilerini iyi hissetmelerini
          sağlamak. Sürdürülebilir moda anlayışıyla, çevreye duyarlı üretim süreçleri benimseyerek gelecek nesillere
          daha yaşanabilir bir dünya bırakmak.
        </p>

        <h2 className="text-xl font-semibold mt-8">Değerlerimiz</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Kalite:</strong> Her ürünümüzde en yüksek kalite standartlarını gözetiyoruz.
          </li>
          <li>
            <strong>Sadelik:</strong> Tasarımlarımızda gereksiz detaylardan kaçınıyor, özün güzelliğine odaklanıyoruz.
          </li>
          <li>
            <strong>Sürdürülebilirlik:</strong> Çevreye duyarlı üretim süreçleri ve malzemeler kullanıyoruz.
          </li>
          <li>
            <strong>Dürüstlük:</strong> Müşterilerimizle olan ilişkilerimizde şeffaflık ve dürüstlük ilkelerini
            benimsiyoruz.
          </li>
          <li>
            <strong>Yenilikçilik:</strong> Sürekli olarak kendimizi geliştiriyor, yeni fikirler ve teknolojiler ile
            ürünlerimizi iyileştiriyoruz.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Ekibimiz</h2>
        <p>
          STILMAN, moda ve tekstil sektöründe deneyimli profesyonellerden oluşan bir ekip tarafından yönetilmektedir.
          Tasarımcılarımız, üretim ekibimiz ve müşteri hizmetleri personelimiz, size en iyi deneyimi sunmak için
          çalışmaktadır.
        </p>

        <div className="mt-12 pt-8 border-t">
          <p className="italic">"Sadelik, nihai sofistikasyondur." - Leonardo da Vinci</p>
        </div>
      </div>
    </div>
  )
}
