import {api_helper} from "../../helpers/api_helper";
import axios from "axios";
import HTTPNotificationHelper from "../../helpers/HTTPNotificationHelper";


const getAdminProducts = async ({setData, secret, setTotalPages, setCurrentPage, requestParams}) => {
    console.log("SORGU GİTTİ")
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

export {
    getAdminProducts,
    createAdminProduct,
    getAdminCategoriesMapped
}