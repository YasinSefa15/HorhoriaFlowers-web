import {api_helper} from "../../utils/api_helper";
import axios from "axios";
import HTTPNotificationHelper from "../../utils/HTTPNotificationHelper";


const getAdminUsers = async ({setData, secret, setTotalPages, setCurrentPage, requestParams}) => {
    await axios.get(api_helper.api_url + api_helper.admin.users.read, {
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

const createAdminUser = async ({newData, secret, setValidationErrors}) => {
    await axios.post(api_helper.api_url + api_helper.admin.users.create, {
            first_name: newData.first_name,
            last_name: newData.last_name,
            phone: newData.phone,
            email: newData.email,
            password: newData.password,
            password_confirmation: newData.password_confirmation,
            is_admin: newData.is_admin,
        },
        {
            headers: {
                "Authorization": "Bearer " + secret,
            }
        })
        .then(async response => {
            HTTPNotificationHelper({
                httpStatus: response.status,
                title: response.data.message
            })

            setValidationErrors({})
        })
        .catch(error => {
            HTTPNotificationHelper({
                httpStatus: error.response?.status || 500,
                title: error.response.data?.message || "Bir hata oluştu",
            })

            if (error.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
        })
}

const updateAdminUser = async ({data, secret, pageData, setPageData,setValidationErrors}) => {
    await axios.put(api_helper.api_url + api_helper.admin.users.update + data.id, {
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
            await setPageData(pageData.map((item) => item.id === data.id ? data : item))
            HTTPNotificationHelper({
                httpStatus: response.status,
                title: response.data.message
            })

            setValidationErrors({})
        })
        .catch(error => {
            HTTPNotificationHelper({
                httpStatus: error.response?.status || 500,
                title: error.response.data?.message || "Bir hata oluştu",
            })
            if (error.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
            console.log(error.response.data)
        })
}

const deleteAdminUser = async ({userId, secret, pageData, setPageData}) => {
    await axios.delete(api_helper.api_url + api_helper.admin.users.delete.replace(":user_id", userId),
        {
            headers: {
                "Authorization": "Bearer " + secret,
            }
        })
        .then(async response => {
            await setPageData(pageData.filter((user) => user.id !== userId))

            HTTPNotificationHelper({
                httpStatus: response.status,
                title: response.data.message
            })
        })
        .catch(error => {
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })
        })
}

export {
    getAdminUsers,
    createAdminUser,
    updateAdminUser,
    deleteAdminUser
}