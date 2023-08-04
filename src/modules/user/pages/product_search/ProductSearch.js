import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import Products from "../../components/Products";
import axios from "axios";
import {api_helper} from "../../../../helpers/api_helper";
import LoadingScreen from "../../components/LoadingScreen";

export default function ProductSearch() {
    const [heading, setHeading] = useState("");
    const [params, setParams] = useState(new URLSearchParams(window.location.search));
    const [title, setTitle] = useState(params.get('title'));

    useEffect(() => {
        setHeading(params.get('title') + " ürününü ile ilgili arama sonuçları görüntülüyorsunuz")
    }, [title])

    return (
        <>
            <Helmet>
                <title>{`${title} - Hooria E-Ticaret - Ürün Arama Sonuçları`}</title>
                <meta
                    name="description"
                    content={`Hooria e-ticaret platformunda aradığınız "${title}" ürününü bulun. En yeni ürünler, indirimler ve geniş ürün yelpazesiyle alışveriş deneyiminizi zenginleştirin. Arama sonuçları sayfasında "${title}" ürününün detaylarına ulaşabilirsiniz.`}
                />
                {/* Diğer meta etiketleri burada ekleyebilirsiniz */}
            </Helmet>


            <Products
                heading={heading}
                title={title}
                setTitle={setTitle}
            >

            </Products>


        </>
    )
}