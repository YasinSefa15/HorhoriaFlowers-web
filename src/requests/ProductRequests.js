import axios from "axios";
import {api_helper} from "../utils/api_helper";

async function getSearchedProducts({
                                       params,
                                       setProducts,
                                       setTotalPage,
                                       setLoading
                                   }) {
    try {
        await axios.get(api_helper.api_url + api_helper.product.read, {
            params: params
        })
            .then(res => {
                console.log("ÜRÜNLER ÇEKİLDİ")
                console.log("sent params", params)
                console.log("adet ", res.data.data.length)
                console.log(res.data)
                let result = [];
                setTotalPage(res.data.meta.last_page)
                //setCurrentPage(res.data.meta.current_page)

                res.data.data.forEach((product) => {
                    result.push(product)
                })
                //console.log(res.data.data)
                setProducts(result)
                window.scrollTo({top: 0, behavior: 'smooth'});
                setLoading(true)


            })
            .catch(error => {
                console.log("error");
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

async function getProductDetail({
                                    slug,
                                    setProduct,
                                    setLoading,
                                    setMainImage,
                                    setSelectedSize
                                }) {
    await axios.get(api_helper.api_url + api_helper.product.view + slug, {})
        .then(async res => {
            await setProduct(res.data.data)
            await setMainImage(res.data.data.images[0].file_path)
            await setLoading(true)
            await setSelectedSize(res.data.data.sizes[0])
        })
        .catch(error => {
            throw error
        })
}

async function getCategoryProducts({
                                       params,
                                       setProducts,
                                       setTotalPage,
                                       setLoading
                                   }) {
    try {
        await axios.get(api_helper.api_url + api_helper.category.view + params.slug, {
            params: params
        })
            .then(res => {
                console.log("ÜRÜNLER ÇEKİLDİ", res.data)
                setTotalPage(res.data.meta.last_page)
                setProducts(res.data.data)
                window.scrollTo({top: 0, behavior: 'smooth'});
                setLoading(true)
            })
            .catch(error => {
                console.log("error");
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

async function getCategoryTitleFromSlug({
                                            slug,
                                        }) {

    try {
        const response = await axios.get(api_helper.api_url + api_helper.category.get_title + slug);
        return response.data.data.title; // Varsayılan olarak döndürülen veriyi title olarak varsayalım
        //Başlık alınamazsa veya bir hata oluşursa, boş bir dize döndürür.
    } catch (error) {
        console.error('Error fetching category title:', error);
        return ''; // Hata durumunda boş bir string döndürelim
    }
}

export {
    getSearchedProducts,
    getCategoryProducts,
    getCategoryTitleFromSlug,
    getProductDetail
}