import axios from "axios";
import {api_helper} from "../helpers/api_helper";
import HTTPNotificationHelper from "../helpers/HTTPNotificationHelper";

async function getOrderSelectedAddressDetail({selectedAddressId, setAddress, secret}) {
    try {
        axios.get(api_helper.api_url + api_helper.user.addresses.view + selectedAddressId,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                console.log("response " , response.data.data)
                await setAddress(response.data.data)
            })
            .catch((error) => {
                console.log(error.response)
                HTTPNotificationHelper({
                    httpStatus: error.response.status,
                    title: error.response.data.message,
                })
            })
    } catch (error) {
        console.log(error)
    }
}

export {
    getOrderSelectedAddressDetail
}