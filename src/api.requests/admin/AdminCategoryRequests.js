import {api_helper} from "../../helpers/api_helper";
import axios from "axios";


const getAdminCategories = async ({setData, secret, setTotalPages, setCurrentPage}) => {
    await axios.get(api_helper.api_url + api_helper.admin.categories.read, {
        headers: {
            "Authorization": "Bearer " + secret,
        }
    })
        .then(async response => {
            console.log(response.data.data)
            await setData(response.data.data)
            await setTotalPages(response.data.meta.last_page)
            await setCurrentPage(response.data.meta.current_page)
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
        })
        .catch(error => {
            console.log(error)
        })
}

export {
    getAdminCategories,
    createAdminCategory
}