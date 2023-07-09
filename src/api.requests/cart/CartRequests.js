import axios from "axios";
import {api_helper} from "../../helpers/api_helper";
import NotificationHelper from "../../helpers/NotificationHelper";


const readLoggedInUserCart = ({setProducts}) => {
    axios.get(api_helper.api_url + api_helper.cart.view, {
        //add authorization header
        headers: {
            'Authorization': `Bearer: ${localStorage.getItem("secret")}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then(res => {
            let result = [];
            for (const key of Object.keys(res.data.data)) {
                result.push(res.data.data[key])
            }
            setProducts(result)
        })
        .catch(error => {
            console.log(error);
            NotificationHelper({
                httpStatus: error.response.data.status,
                title: error.response.data.statusText,
                message: error.response.data.message,
            })
        })
}

const updateLoggedInUserCart = ({input}) => {
    axios.put(api_helper.api_url + api_helper.cart.update, {
            product_id: input.id,
            quantity: input.quantity,
        },
        {
            headers: {
                'Authorization': `Bearer: ${localStorage.getItem("secret")}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(res => {

        })
        .catch(error => {
            console.log(error);
            NotificationHelper({
                httpStatus: error.response.status,
                title: error.response.statusText,
                message: error.response.data.message,
            })
        })
}

const deleteLoggedInUserProduct = ({input}) => {
    axios.delete(api_helper.api_url + api_helper.cart.delete, {
            data: {
                product_id: input.product_id,
            },
            headers: {
                'Authorization': `Bearer: ${localStorage.getItem("secret")}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
    )
        .then(res => {
            NotificationHelper({
                httpStatus: res.status,
                title: "Ürün sepetten silindi",
            })

        })
        .catch(error => {
            console.log(error);
            NotificationHelper({
                httpStatus: error.response.status,
                title: error.response.statusText,
                message: error.response.data.message,
            })
        })
}


export {
    updateLoggedInUserCart,
    readLoggedInUserCart,
    deleteLoggedInUserProduct
}