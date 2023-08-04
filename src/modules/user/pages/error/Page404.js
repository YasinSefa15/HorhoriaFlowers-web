import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import React from "react";

export default function Page404() {
    return (
        <>
            <Helmet>
                <title>Hooria E-Ticaret - Sayfa Bulunamadı</title>
                <meta
                    name="description"
                    content="Üzgünüz, aradığınız sayfa maalesef bulunamadı. Hooria e-ticaret platformunda en yeni ürünleri keşfedin, indirimlerden yararlanın ve hızlı alışveriş deneyimi yaşayın. Geniş ürün yelpazemizle ihtiyacınız olan her şey burada!"
                />
                {/* Diğer meta etiketleri burada ekleyebilirsiniz */}
            </Helmet>

            <div>
                <h1>404 Page Not Found</h1>
                <Link to="/"> Ana Sayfaya Dön</Link>
            </div>
        </>
    )
}