import axios from "axios";
import {api_helper} from "../../helpers/api_helper";
import NotificationHelper from "../../helpers/NotificationHelper";


const readLoggedInUserCart = ({setProducts, secret}) => {
    axios.get(api_helper.api_url + api_helper.carts.view, {
        //add authorization header
        headers: {
            'Authorization': `Bearer ` + secret,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => {
            let result = [];
            res.data.data.map((product, index) => {
                result.push(product)
            })
            setProducts(result)
        })
        .catch(error => {
            NotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message,
            })
        })
}

const updateLoggedInUserCart = ({product_id, quantity, secret}) => {
    axios.put((api_helper.api_url + api_helper.carts.update).replace(':product_id', product_id), {
            quantity: quantity,
        },
        {
            headers: {
                'Authorization': `Bearer ${secret}`,
                'Accept': 'application/json',
            }
        })
        .then(res => {

        })
        .catch(error => {
            //console.log(error);
            NotificationHelper({
                httpStatus: error.response.status,
                title: error.response.statusText,
                message: error.response.data.message,
            })
        })
}

const deleteLoggedInUserProduct = ({product_id, secret}) => {
    axios.delete((api_helper.api_url + api_helper.carts.delete).replace(':product_id', product_id), {
            headers: {
                'Authorization': `Bearer ${secret}`,
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
            //console.log(error);
            NotificationHelper({
                httpStatus: error.response.status,
                title: error.response.statusText,
                message: error.response.data.message,
            })
        })
}

const createLoggedInUserProduct = ({product_title, product_id, secret}) => {
    const data = {
        product_id: product_id,
        quantity: 1
    }
    axios.post((api_helper.api_url + api_helper.carts.create), data, {
            headers: {
                'Authorization': `Bearer ${secret}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
    )
        .then(res => {
            NotificationHelper({
                httpStatus: res.status,
                title: "Sepete eklendi",
                message: product_title + " sepete eklendi"
            })

        })
        .catch(error => {
            //console.log(error);
            NotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message
            })
        })
}


export {
    updateLoggedInUserCart,
    readLoggedInUserCart,
    deleteLoggedInUserProduct,
    createLoggedInUserProduct
}