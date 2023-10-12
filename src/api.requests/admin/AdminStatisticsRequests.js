import {api_helper} from "../../helpers/api_helper";
import axios from "axios";


const getAdminStatistics = async ({setUserStatistics, secret}) => {
    await axios.get(api_helper.api_url + api_helper.admin.statistics.read, {
        headers: {
            "Authorization": "Bearer " + secret,
        }
    })
        .then(async response => {
            console.log(response.data)
            await setUserStatistics(response.data.data.users)
        })
        .catch(error => {
            console.log(error)
        })
}

export {
    getAdminStatistics,
}