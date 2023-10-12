import {api_helper} from "../../helpers/api_helper";
import axios from "axios";
import HTTPNotificationHelper from "../../helpers/HTTPNotificationHelper";


const getAdminOrders = async ({setData, secret, setTotalPages, setCurrentPage, requestParams}) => {
    await axios.get(api_helper.api_url + api_helper.admin.orders.read, {
        params: requestParams,
        headers: {
            "Authorization": "Bearer " + secret,
        }
    })
        .then(async response => {
            //console.log("getAdminOrders response", response.data.data)
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
            console.log(error)
        })
}

export {
    getAdminOrders,
    //getAdminProductsSizedMapped,
    //createAdminCategory,
}