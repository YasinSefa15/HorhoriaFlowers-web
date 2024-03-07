import {Helmet} from "react-helmet";
import React from "react";

export default function MetaTags({title}) {
    return (
        <>
            <Helmet>
                <title>{title} Kategorisi - Hooria E-Ticaret</title>
                <meta
                    name="description"
                    content={`Hooria e-ticaret platformunda ${title} kategorisindeki en yeni ürünleri keşfedin. Geniş ürün yelpazemizle ihtiyacınız olan her şey burada!`}
                />
            </Helmet>
        </>
    );
}