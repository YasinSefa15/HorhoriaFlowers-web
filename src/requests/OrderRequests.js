import axios from "axios";
import {api_helper} from "../utils/api_helper";
import HTTPNotificationHelper from "../utils/HTTPNotificationHelper";

async function getOrderSelectedAddressDetail({selectedAddressId, setAddress, secret}) {
    try {
        await axios.get(api_helper.api_url + api_helper.user.addresses.view + selectedAddressId,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
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

async function giveOrder({selectedAddressId, secret, setIsOrdered, setOrderCode,setErrorMessages}) {
    await axios.post(api_helper.api_url + api_helper.user.orders.create, {
            address_id: selectedAddressId
        },
        {
            headers: {
                "Authorization": "Bearer " + secret,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(async (response) => {
            await setIsOrdered(true)
            await setOrderCode(response.data.data.order_code)
        })
        .catch((error) => {
            if (error.response.status === 400) {
                setErrorMessages(error.response.data.errors)
            }
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })
        })

}

export {
    getOrderSelectedAddressDetail,
    giveOrder
}