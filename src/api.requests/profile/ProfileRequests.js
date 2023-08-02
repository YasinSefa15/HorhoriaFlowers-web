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


async function updateProfilePassword({passwordForm,secret}) {
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

export {
    profileGetUser,
    updateProfileInfo,
    getProfileEmail,
    updateProfileEmail,
    updateProfilePassword
}