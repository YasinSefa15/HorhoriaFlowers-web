import React from "react";
import {Helmet} from "react-helmet";

export default function AboutUs() {
    const buttonStyle = {
        backgroundColor: "#f8f9fa",
        outline: "none",
    }

    return (
        <>
            <Helmet>
                <title>Horhoria Flowers - Hakkımızda</title>
                <meta
                    name="description"
                    content={`Hooria E-Ticaret olarak, müşterilerimize en kaliteli ürünleri sunma misyonu ile yola çıktık.
                     Geniş ürün yelpazemizde, sizin ihtiyaçlarınıza uygun ürünleri bulabileceğiniz bir alışveriş deneyimi sunmayı hedefliyoruz.`}
                />
            </Helmet>
            <div className="container mt-5">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                                    style={buttonStyle}
                            >
                                Biz Kimiz?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p><strong>Horhoria Flowers</strong> olarak, el emeği ve özenle hazırlanan <em>el örgüsü
                                    çiçek buketleriyle</em> özel anlarınıza renk katıyoruz.</p>

                                <p>Biz, bir <strong>anne ve kızın sevgi dolu işbirliğinden doğduk.</strong> Uzun
                                    yıllardır <em>örgü sanatına olan tutkumuz</em> ve <em>yeteneklerimizi bir araya
                                        getirerek,</em> özel günlerinizi unutulmaz kılmak için özenle hazırladığımız
                                    ürünlerimizi sizinle paylaşıyoruz. İşimizi sevgiyle yapıyor ve her bir ürünümüzde bu
                                    sevgiyi hissettiriyoruz.</p>

                                <p>El örgüsü çiçek buketlerimiz, <em>özel günlerinizde sevdiklerinize verebileceğiniz
                                    eşsiz ve özel bir hediye seçeneği sunar.</em> Her bir çiçeği titizlikle örer,
                                    renklerini özenle seçer ve en güzel şekilde sunarız. Her bir buket, sizin için özel
                                    anlam taşıyacak şekilde özelleştirilebilir.</p>

                                <p><strong>Horhoria Flowers</strong> olarak, müşteri memnuniyetini en üst seviyede
                                    tutmayı amaçlıyoruz. Her bir müşterimiz bizim için değerlidir ve her talebi
                                    önemsiyoruz. Sizlere en kaliteli ürünleri sunabilmek için sürekli olarak kendimizi
                                    geliştiriyor ve yeniliklere açık bir şekilde çalışıyoruz.</p>

                                <p>Bizimle çalışarak <em>özel günlerinizi unutulmaz kılmak ve sevdiklerinize sevginizi
                                    en güzel şekilde ifade etmek için bize katılın.</em> Sizlere en güzel örgü çiçek
                                    buketlerini sunmaktan mutluluk duyacağız.</p>

                                <p><em>Sevgiyle,<br/>Horhoria Flowers</em></p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                                    style={buttonStyle}
                            >
                                Ürünlerimiz Hakkında Merak Edilenler
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <h6><b><i>Örgü Çiçek Buketleri Nedir?</i></b></h6>
                                <p>Örgü çiçek buketleri, <strong>el emeği ile örülen özel tasarım çiçeklerin bir araya
                                    getirilerek oluşturulmuş bir buket türüdür.</strong> Her bir çiçek özenle seçilir ve
                                    renk uyumu gözetilerek bir araya getirilir. Bu özel buketler, özel günlerde
                                    sevdiklerinize hediye edebileceğiniz <em>benzersiz ve anlamlı bir seçenektir.</em>
                                </p>

                                <h6><b><i>Ürünlerinizde Kullanılan Malzemeler Nelerdir?</i></b></h6>
                                <p>Ürünlerimizde <strong>yüksek kaliteli örgü iplikleri</strong> kullanıyoruz. Her bir
                                    çiçek, <em>yumuşak ve dayanıklı malzemelerle örülür</em> ve uzun ömürlüdür. Ayrıca,
                                    çiçek saplarında da <em>sağlam ve estetik bir görünüm sunan malzemeler</em> tercih
                                    ediyoruz.</p>

                                <h6><b><i>Örgü Çiçek Buketleri Hangi Durumlar İçin Uygundur?</i></b></h6>
                                <p>Örgü çiçek buketleri, birçok farklı özel gün ve etkinlik için mükemmel bir
                                    seçenektir. <strong>Doğum günleri, anneler günü, sevgililer günü, düğünler,
                                        nişanlar, mezuniyet törenleri</strong> gibi çeşitli kutlamalarda
                                    kullanılabilirler. Ayrıca, ev dekorasyonunda veya iş yerlerinde masaları süslemek
                                    için de idealdirler.</p>

                                <h6><b><i>Ürünleriniz Özelleştirilebilir mi?</i></b></h6>
                                <p><strong>Evet, ürünlerimiz özelleştirilebilir.</strong> Müşterilerimiz, istekleri
                                    doğrultusunda çiçeklerin <em>renklerini ve buketin içeriğini
                                        belirleyebilirler.</em> Böylece, her bir buket kişiye özel ve anlamlı bir hediye
                                    olabilir.</p>

                                <h6><b><i>Örgü Çiçek Buketleri Nasıl Bakım Yapılmalıdır?</i></b></h6>
                                <p>Örgü çiçek buketlerimiz, uzun ömürlü olmaları için <em>düşük bakım
                                    gerektirirler.</em> Tozdan uzak tutulmaları ve doğrudan güneş ışığından korunmaları
                                    önemlidir. Gerektiğinde <em>hafif bir şekilde temizlenerek tazeliği
                                        korunabilir.</em></p>

                                <h6><b><i>Ürünlerinizin Fiyat Aralığı Nedir?</i></b></h6>
                                <p>Fiyatlarımız ürünlerin boyutuna, içeriğine ve özelleştirme seçeneklerine göre
                                    değişiklik gösterebilir. Daha fazla bilgi için lütfen web sitemizde bulunan <strong>ürünlerin
                                        fiyatlarını ve detaylarını inceleyiniz.</strong></p>

                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                                    style={buttonStyle}
                            >
                                İptal ve İade İşlemleri
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <h6><b><i>İptal Politikası:</i></b></h6>
                                <ul>
                                    <li><b>Siparişinizin iptal talebini vermeden önce, ürünlerin henüz kargoya
                                        verilmediğinden emin olun.</b> İptal talepleri, ürünler kargoya verilmeden önce
                                        yapılmalıdır.
                                    </li>
                                    <li><b>İptal talebiniz onaylandıktan sonra belirttiğiniz hesaba paranızın iade
                                        işlemi gerçekleştirilir.</b></li>
                                </ul>

                                <h6><b><i>İade Politikası:</i></b></h6>
                                <ul>
                                    <li><i>İade talepleriniz için, ürünü alış tarihinden itibaren <b> 14 gün
                                        içinde </b> bize ulaşarak iade prosedürümüzü başlatabilirsiniz.</i></li>
                                    <li><i>İade edilecek ürünlerin <b>kullanılmamış, hasar görmemiş ve orijinal
                                        ambalajında olması</b> gerekmektedir.</i></li>
                                    <li><i>İade talebinizin onaylanması durumunda, ödeme iadesi siparişinizin ödeme
                                        yöntemine göre en kısa sürede gerçekleştirilecektir.</i></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}