import {api_helper} from "../../utils/api_helper";
import axios from "axios";
import HTTPNotificationHelper from "../../utils/HTTPNotificationHelper";


const getAdminCategories = async ({setData, secret, setTotalPages, setCurrentPage, requestParams}) => {
    await axios.get(api_helper.api_url + api_helper.admin.categories.read, {
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
        })
        .catch(error => {
        })
}

const createAdminCategory = async ({newData, secret, setValidationErrors}) => {
    await axios.post(api_helper.api_url + api_helper.admin.categories.create, newData,
        {
            headers: {
                "Authorization": "Bearer " + secret,
            }
        })
        .then(async response => {
            HTTPNotificationHelper({
                title: response.data.message,
                httpStatus: response.status,
            })
            setValidationErrors({})
        })
        .catch(error => {
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })

            if (error.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
        })
}

const deleteAdminCategory = async ({data, setData, category, secret}) => {
    await axios.delete((api_helper.api_url + api_helper.admin.categories.delete).replace(":category_id", category.id),
        {
            headers: {
                "Authorization": "Bearer " + secret,
            }
        })
        .then(async response => {
            if (response.status === 200) {
                HTTPNotificationHelper({
                    title: "Kategori Silindi",
                    httpStatus: response.status,
                })
                await setData(data.filter((item) => item.id !== category.id))
            }
        })
        .catch(error => {
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })
        })
}

const updateAdminCategory = async ({newData, slug, secret, setValidationErrors}) => {
    await axios.put((api_helper.api_url + api_helper.admin.categories.update).replace(":slug", slug),
        newData,
        {
            headers: {
                "Authorization": "Bearer " + secret,
            }
        })
        .then(async response => {
            if (response.status === 200) {
                HTTPNotificationHelper({
                    title: "Kategori Güncellendi",
                    httpStatus: response.status,
                })
                setValidationErrors({})
            }
        })
        .catch(error => {
            HTTPNotificationHelper({
                httpStatus: error.response?.status,
                title: error.response?.data.message,
            })

            if (error.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
        })
}

export {
    getAdminCategories,
    createAdminCategory,
    getAdminCategoriesMapped,
    deleteAdminCategory,
    updateAdminCategory
}