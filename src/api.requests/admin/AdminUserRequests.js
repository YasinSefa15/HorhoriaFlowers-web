import {api_helper} from "../../helpers/api_helper";
import axios from "axios";
import NotificationHelper from "../../helpers/NotificationHelper";
import HTTPNotificationHelper from "../../helpers/HTTPNotificationHelper";


const getAdminUsers = async ({setData, secret, setTotalPages, setCurrentPage}) => {
    await axios.get(api_helper.api_url + api_helper.admin.users.read, {
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

const createAdminUser = async ({data, secret}) => {
    await axios.post(api_helper.api_url + api_helper.admin.users.create, {
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
        })
        .catch(error => {
            console.log(error.message)
        })
}

const updateAdminUser = async ({data, secret, pageData, setPageData}) => {
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
        })
        .catch(error => {
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
                message: "E-posta ve/veya şifreniz hatalı",
            })
            console.log(error.message)
        })
}

export {
    getAdminUsers,
    createAdminUser,
    updateAdminUser,
}