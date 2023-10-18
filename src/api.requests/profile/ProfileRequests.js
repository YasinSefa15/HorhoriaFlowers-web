import axios from "axios";
import {api_helper} from "../../helpers/api_helper";
import HTTPNotificationHelper from "../../helpers/HTTPNotificationHelper";

async function profileGetUser({setUserForm, setLoaded, secret}) {
    try {
        const response = await axios.get(api_helper.api_url + api_helper.user.view, {
            headers: {
                "Authorization": "Bearer " + secret,
                "Content-Type": "application/json"
            }
        });

        await setUserForm(response.data.data);
        //await new Promise(r => setTimeout(r, 1000));
        await setLoaded(true);
    } catch (error) {
        console.log(error.response);
        // Error handling if necessary
    }
}

function updateProfileInfo({userForm, setLoaded, secret}) {
    try {
        axios.put(api_helper.api_url + api_helper.user.update,
            userForm,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                await setLoaded(true);
                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message,
                })
            })
            .catch((error) => {
                console.log("asd")
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

function getProfileEmail({setEmailForm, setLoaded, secret}) {
    try {
        //console.log(api_helper.api_url + api_helper.user.email.get_email)
        axios.get(api_helper.api_url + api_helper.user.email.get_email,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                //console.log(response.data.data.email)
                await setEmailForm({
                    old_email: response.data.data.email,
                    email: response.data.data.email,
                    email_verified_at: response.data.data.email_verified_at
                })
                await setLoaded(true);
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

async function updateProfileEmail({emailForm, setEmailForm, setLoaded, secret}) {
    try {
        console.log("form ", emailForm)
        axios.put(api_helper.api_url + api_helper.user.email.update_email,
            {
                old_email: emailForm.old_email,
                new_email: emailForm.email,
            },
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                await setLoaded(true);
                await setEmailForm({
                    ...emailForm,
                    old_email: emailForm.email,
                    verified_at: null
                })
                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message,
                })
            })
            .catch(async (error) => {
                await setLoaded(true);
                console.log("asd")
                console.log(error.response)
                HTTPNotificationHelper({
                    httpStatus: error.response.status,
                    title: error.response.data.message,
                })
            })
    } catch (error) {
        await setLoaded(true);
        console.log(error)
    }
}


async function updateProfilePassword({passwordForm, secret}) {
    try {
        axios.put(api_helper.api_url + api_helper.user.email.update_password,
            {
                old_password: passwordForm.old_password,
                new_password: passwordForm.new_password,
                new_password_confirmation: passwordForm.new_password_confirmation,
            },
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message,
                })
            })
            .catch(async (error) => {
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


async function getProfileAddresses({setAddresses, setLoaded, secret}) {
    try {
        axios.get(api_helper.api_url + api_helper.user.addresses.read,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                //console.log(response.data.data.email)
                await setAddresses(response.data.data)
                await setLoaded(true);
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

async function createProfileAddresses({addressForm, addresses, setAddresses, setLoaded, secret}) {
    try {
        const address = {
            title: addressForm.title,
            first_name: addressForm.first_name,
            last_name: addressForm.last_name,
            city: addressForm.city,
            state: addressForm.state,
            description: addressForm.description,
            phone: addressForm.phone,
        }
        axios.post(api_helper.api_url + api_helper.user.addresses.read,
            address,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                //console.log(response.data.data.email)
                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message,
                })
                await setAddresses([...addresses, address])
                await setLoaded(true);
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

async function updateProfileAddresses({updateAddressForm, addresses, setAddresses, setLoaded, secret}) {
    try {
        const address = {
            id: updateAddressForm.id,
            title: updateAddressForm.title,
            first_name: updateAddressForm.first_name,
            last_name: updateAddressForm.last_name,
            city: updateAddressForm.city,
            state: updateAddressForm.state,
            description: updateAddressForm.description,
            phone: updateAddressForm.phone,
        }
        console.log("axios ", address)
        axios.put(api_helper.api_url + api_helper.user.addresses.update + updateAddressForm.id,
            address,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message,
                })
                await setAddresses(addresses.map((item) => {
                    if (item.id === address.id) {
                        return address;
                    }
                    return item;
                }))
                await setLoaded(true);
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

async function deleteProfileAddresses({selectedAddressId, addresses, setAddresses, setLoaded, secret}) {
    try {
        console.log("id", selectedAddressId)
        axios.delete(api_helper.api_url + api_helper.user.addresses.delete + selectedAddressId,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                console.log(response.data)
                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message,
                })
                await setAddresses(addresses.filter((item) => {
                    return item.id !== selectedAddressId;
                }))
                await setLoaded(true);
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

async function getProfileOrders({setOrders, setLoaded, secret}) {
    try {
        await axios.get(api_helper.api_url + api_helper.user.orders.read,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                console.log(response.data.data[0])
                await setOrders(response.data.data)
                await setLoaded(true);
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

async function getProfileUserCoupons({setUserCoupons, setLoaded, secret}) {
    try {
        axios.get(api_helper.api_url + api_helper.coupon.index,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                //console.log(response.data)
                await setUserCoupons(response.data.data)
                await setLoaded(true);
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
    profileGetUser,
    updateProfileInfo,
    getProfileEmail,
    updateProfileEmail,
    updateProfilePassword,
    getProfileAddresses,
    createProfileAddresses,
    updateProfileAddresses,
    deleteProfileAddresses,
    getProfileOrders,
    getProfileUserCoupons
}