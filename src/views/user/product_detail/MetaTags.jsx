import {Helmet} from "react-helmet";
import React from "react";

export default function MetaTags({title}) {
    return (
        <>
            <Helmet>
                <title>Horhoria Flowers - {title}</title>
                <meta
                    name="description"
                    content={`Hooria e-ticaret platformunda ${title} ürününün detaylarını keşfedin. En yeni ürünleri inceleyin, indirimlerden yararlanın ve hızlı alışveriş deneyimi yaşayın. Geniş ürün yelpazemizle ihtiyacınız olan her şey burada!`}
                />
            </Helmet>
        </>
    )
}
