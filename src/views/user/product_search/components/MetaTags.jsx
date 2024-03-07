import {Helmet} from "react-helmet";
import React from "react";

export default function MetaTags({title}) {
    return <Helmet>
        <title>{`${title} - Hooria E-Ticaret - Ürün Arama Sonuçları`}</title>
        <meta
            name="description"
            content={`Hooria e-ticaret platformunda aradığınız "${title}" ürününü bulun.
             En yeni ürünler, indirimler ve geniş ürün yelpazesiyle alışveriş deneyiminizi zenginleştirin.
              Arama sonuçları sayfasında "${title}" ürününün detaylarına ulaşabilirsiniz.`}
        />
    </Helmet>
}