import Products from "../../components/Products";
import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import {getCategoryTitleFromSlug} from "../../../../api.requests/ProductRequests";

export default function CategoryProducts() {
    const [heading, setHeading] = useState("");
    const [title, setTitle] = useState("");
    const [categoryTitle, setCategoryTitle] = useState("");
    const {slug} = useParams();
    let location = useLocation();

    useEffect(() => {
        console.log("slug   " + slug)
        if (location.state?.title !== undefined) {
            setCategoryTitle(location.state.title)
            setHeading(location.state.title + " kategorisindeki ürünleri görüntülüyorsunuz")
        } else if (location.state === undefined || location.state === null) {
            const getCategoryTitle = async () => {
                await getCategoryTitleFromSlug({slug, setCategoryTitle, setHeading})
            }
            getCategoryTitle().then(r => {
            })
        }
    }, [slug])

    return (
        <>
            <Helmet>
                <title>{categoryTitle} Kategorisi - Hooria E-Ticaret</title>
                <meta
                    name="description"
                    content={`Hooria e-ticaret platformunda ${categoryTitle} kategorisindeki en yeni ürünleri keşfedin. Geniş ürün yelpazemizle ihtiyacınız olan her şey burada!`}
                />
            </Helmet>

            <Products
                heading={heading}
                setTitle={setTitle}
                title={title}
                paramsProp={{
                    "category_slug": slug
                }}
                slug={slug}
            >

            </Products>
        </>
    )
}