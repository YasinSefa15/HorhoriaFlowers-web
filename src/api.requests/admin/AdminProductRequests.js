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
            await setData(response.data.data)
            await setTotalPages(response.data.meta.last_page)
            await setCurrentPage(response.data.meta.current_page)
        })
        .catch(error => {
            console.log(error.messages)
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

const createAdminProduct = async ({data, secret, setErrors}) => {
    await axios.post(api_helper.api_url + api_helper.admin.products.create, data,
        {
            headers: {
                "Authorization": "Bearer " + secret,
                "content-type": "multipart/form-data",
            }
        })
        .then(async response => {
            HTTPNotificationHelper({
                title: "Ürün Oluşturuldu",
                httpStatus: response.status,
            })
            setErrors([])
        })
        .catch(error => {
            setErrors(error.response.data.errors)
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


const updateAdminProduct = async ({product_id, data, secret, pageData, setPageData, setValidationErrors}) => {
    await axios.put((api_helper.api_url + api_helper.admin.products.update).replace(":product_id", product_id), {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            is_admin: data.is_admin,
        },
        {
            headers: {
                "Authorization": "Bearer " + secret,
            }
        })
        .then(async response => {
            if (response.status === 200) {
                await setPageData(pageData.map((item) => item.id === data.id ? data : item))

                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message
                })

                console.log(response.data)
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
            console.log(error.message)
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