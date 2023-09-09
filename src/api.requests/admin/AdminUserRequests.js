import {api_helper} from "../../helpers/api_helper";
import axios from "axios";


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

export {
    getAdminUsers,
    createAdminUser
}