import {api_helper} from "../../helpers/api_helper";
import axios from "axios";
import HTTPNotificationHelper from "../../helpers/HTTPNotificationHelper";


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
        })
        .catch(error => {
            console.log(error.messages)
        })
}

const createAdminCategory = async ({data, secret}) => {
    let formData = {
        title: data.title,
    };

    if (data.parent_id) {
        formData.parent_id = parseInt(data.parent_id);
    }

    await axios.post(api_helper.api_url + api_helper.admin.categories.create, formData,
        {
            headers: {
                "Authorization": "Bearer " + secret,
            }
        })
        .then(async response => {
            HTTPNotificationHelper({
                title: "Kategori Eklendi",
                httpStatus: response.status,
            })
        })
        .catch(error => {
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })
            console.log(error.messages)
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
            console.log(error)
        })
}

export {
    getAdminCategories,
    createAdminCategory,
    getAdminCategoriesMapped,
    deleteAdminCategory,
}