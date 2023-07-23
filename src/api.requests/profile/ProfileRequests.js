import React from 'react'
import axios from "axios";
import {api_helper} from "../../helpers/api_helper";
import NotificationHelper from "../../helpers/NotificationHelper";
import {useAuth} from "../../context/AuthContext";

export default function ProfileGetUser() {
    const {secret} = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(api_helper.api_url + api_helper.user.view, {
                    headers: {
                        "Authorization": "Bearer " + secret,
                        "Content-Type": "application/json"
                    }
                });
                // Verileri kullanmak için burada işlemler yapabilirsiniz
            } catch (error) {
                console.log(error);
                NotificationHelper({
                    httpStatus: error.response.status,
                    title: error.response.data.message,
                    message: error.response.data.sub_message,
                });
            }
        };

        fetchData();
    }, [secret]);


    return null;
}