import axios from "axios";
import {api_helper} from "../helpers/api_helper";

const getIsAdmin = async ({secret, setIsAdmin}) => {
    await axios.get(api_helper.api_url + api_helper.user.is_admin, {
        headers: {
            "Authorization": "Bearer " + secret,
        }
    })
        .then(async response => {
            await setIsAdmin(response.data.data.is_admin)
            //console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export default getIsAdmin