import {api_helper} from "../../helpers/api_helper";
import axios from "axios";
import HTTPNotificationHelper from "../../helpers/HTTPNotificationHelper";


const getAdminProducts = async ({setData, secret, setTotalPages, setCurrentPage, requestParams}) => {
    await axios.get(api_helper.api_url + api_helper.admin.products.read, {
        params: requestParams,
        headers: {
            "Authorization": "Bearer " + secret,
        }
    })
        .then(async response => {
            console.log("res", response.data.data)
            await setData(response.data.data)
            await setTotalPages(response.data.meta.last_page)
            await setCurrentPage(response.data.meta.current_page)
        })
        .catch(error => {
            console.log(error)
        })
}


const getAdminCategoriesMapped = async ({setCategoriesMapped, secret}) => {
    await axios.get(api_helper.api_url + api_helper.admin.categories.mapped, {
        headers: {
            "Authorization": "Bearer " + secret,
        }
    })
        .then(async response => {
            await setCategoriesMapped(response.data.data)
            console.log("resll", response.data.data)
        })
        .catch(error => {
            console.log(error.messages)
            console.log("HATA")
        })
}

const createAdminProduct = async ({newData, secret, setValidationErrors}) => {
    await axios.post(api_helper.api_url + api_helper.admin.products.create, newData,
        {
            headers: {
                "Authorization": "Bearer " + secret,
                "Content-Type": "multipart/form-data"
            }
        })
        .then(async response => {
            if (response.status === 201) {
                setValidationErrors([])
            }
            HTTPNotificationHelper({
                title: response.data.message,
                httpStatus: response.status,
            })
        })
        .catch(error => {
            if (error.response.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
            HTTPNotificationHelper({
                title: error.response.data.message,
                httpStatus: error.response.status,
            })

            console.log(error.response)
        })
}

const deleteAdminProduct = async ({data, setData, product, secret}) => {
    await axios.delete((api_helper.api_url + api_helper.admin.products.delete).replace(":product_id", product.id),
        {
            headers: {
                "Authorization": "Bearer " + secret,
            }
        })
        .then(async response => {
            if (response.status === 200) {
                HTTPNotificationHelper({
                    title: "Ürün Silindi",
                    httpStatus: response.status,
                })
                await setData(data.filter((item) => item.id !== product.id))
            }
        })
        .catch(error => {
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })
            console.log(error)
        })
}


const updateAdminProduct = async ({secret, newData, setValidationErrors}) => {
    await axios.post((api_helper.api_url + api_helper.admin.products.update).replace(":product_id", newData.id),
        newData,
        {
            headers: {
                "Authorization": "Bearer " + secret,
                "Content-Type": "multipart/form-data"
            }
        })
        .then(async response => {
            if (response.status === 200) {
                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message
                })
                setValidationErrors([])
            }
        })
        .catch(error => {
            if (error.response.status === 422) {
                setValidationErrors(error.response.data.errors)
            }

            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })
            console.log(error)
        })
}

async function getAdminProductDetail({
                                         product_id,
                                         setData,
                                         secret
                                     }) {
    try {
        await axios.get((api_helper.api_url + api_helper.admin.products.view).replace(":product_id", product_id), {
            headers: {
                Authorization: "Bearer " + secret,
            }
        })
            .then(async res => {
                await setData({...res.data.data, isLoaded: true})
            })
            .catch(async error => {
                await setData({isLoaded: false})
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

export {
    getAdminProducts,
    createAdminProduct,
    getAdminCategoriesMapped,
    deleteAdminProduct,
    updateAdminProduct,
    getAdminProductDetail
}