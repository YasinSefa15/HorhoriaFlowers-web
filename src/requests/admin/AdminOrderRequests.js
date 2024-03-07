import {api_helper} from "../../utils/api_helper";
import axios from "axios";
import HTTPNotificationHelper from "../../utils/HTTPNotificationHelper";


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

const viewAdminOrders = async ({setData, secret, order_code, setOrderStatuses}) => {
    await axios.get((api_helper.api_url + api_helper.admin.orders.view).replace(":order_code", order_code), {
        headers: {
            "Authorization": "Bearer " + secret,
        }
    })
        .then(async response => {
            console.log("viewAdminOrders response", response.data.data)
            await setData(response.data.data.order)
            await setOrderStatuses(response.data.data.statuses)
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

const updateAdminOrder = async ({data, secret, order_code,setValidationErrors}) => {
    await axios.put((api_helper.api_url + api_helper.admin.orders.update).replace(":order_code", order_code),
        data, {
            headers: {
                "Authorization": "Bearer " + secret,
            }
        })
        .then(response => {
            console.log(response)
            setValidationErrors({})
            HTTPNotificationHelper({
                title: "Sipariş Güncellendi",
                httpStatus: response.status,
            })
        })
        .catch(error => {
            if (error.response.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })
            console.log(error.response.data.errors)
        })
}


export {
    getAdminOrders,
    viewAdminOrders,
    //getAdminProductsSizedMapped,
    //createAdminCategory,
    updateAdminOrder,
}