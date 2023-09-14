import axios from "axios";
import {api_helper} from "../helpers/api_helper";

async function getSearchedProducts({
                                       params,
                                       setProducts,
                                       setTitle,
                                       setTotalPage,
                                       setCurrentPage,
                                       requestedPage,
                                       setLoading
                                   }) {
    try {
        axios.get(api_helper.api_url + api_helper.product.read, {
            params: params
        })
            .then(res => {
                const params = new URLSearchParams(window.location.search);
                setTitle(params.get("title"))

                if (params.get("page") === null) {
                    params.set("page", requestedPage.toString())

                    const newUrl = `${window.location.pathname}?${params.toString()}`;
                    window.history.pushState({}, '', newUrl);
                }

                let result = [];
                setTotalPage(res.data.meta.last_page)
                setCurrentPage(res.data.meta.current_page)

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
                                    setSelectedSizeID,
                                    setSelectedSizeValue,
                                    setSelectedSize
                                }) {
    try {
        axios.get(api_helper.api_url + api_helper.product.view + slug, {})
            .then(async res => {
                await setProduct(res.data.data)
                await setMainImage(res.data.data.images[0].file_path)
                await setLoading(true)
                await setSelectedSizeID(res.data.data.sizes[0].id)
                await setSelectedSizeValue(res.data.data.sizes[0].value)
                await setSelectedSize(res.data.data.sizes[0])
            })
            .catch(error => {
                console.log("error");
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

async function getCategoryProducts({
                                       params,
                                       setProducts,
                                       setTotalPage,
                                       setCurrentPage,
                                       requestedPage,
                                       setLoading
                                   }) {
    try {
        axios.get(api_helper.api_url + api_helper.category.view + params.category_slug, {
            params: params
        })
            .then(res => {
                const params = new URLSearchParams(window.location.search);
                //console.log(res.data)
                if (params.get("page") === null) {
                    params.set("page", requestedPage.toString())

                    const newUrl = `${window.location.pathname}?${params.toString()}`;
                    window.history.pushState({}, '', newUrl);
                }

                let result = [];
                setTotalPage(res.data.meta.last_page)
                setCurrentPage(res.data.meta.current_page)

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

async function getCategoryTitleFromSlug({
                                            slug,
                                            setCategoryTitle,
                                            setHeading
                                        }) {
    try {
        await axios.get(api_helper.api_url + api_helper.category.get_title + slug)
            .then(async res => {
                await setCategoryTitle(res.data.data.title)
                await setHeading(res.data.data.title + " kategorisindeki ürünleri görüntülüyorsunuz")
            })
            .catch(error => {
                console.log("error");
                console.log(error)
            })
    } catch (error) {
        console.log("erroe" + error)
    }
}

export {
    getSearchedProducts,
    getCategoryProducts,
    getCategoryTitleFromSlug,
    getProductDetail
}