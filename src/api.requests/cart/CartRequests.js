import axios from "axios";
import {api_helper} from "../../helpers/api_helper";
import HTTPNotificationHelper from "../../helpers/HTTPNotificationHelper";

const readLoggedInUserCart = async ({setProducts, secret}) => {
    await axios.get(api_helper.api_url + api_helper.carts.view, {
        //add authorization header
        headers: {
            'Authorization': `Bearer ` + secret,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => {
            //console.log("db: read cart")
            let result = [];
            res.data.data.map((product, index) => {
                result.push(product)
                return product
            })
            setProducts(result)
        })
        .catch(error => {
            console.log("2")
            HTTPNotificationHelper({
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
            console.log(error);
            HTTPNotificationHelper({
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
            HTTPNotificationHelper({
                httpStatus: res.status,
                title: "Ürün sepetten silindi",
            })

        })
        .catch(error => {
            //console.log(error);
            HTTPNotificationHelper({
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
            HTTPNotificationHelper({
                httpStatus: res.status,
                title: "Sepete eklendi",
                message: product_title + " sepete eklendi"
            })
        })
        .catch(error => {
            console.log(error);
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message
            })
        })
}


export default function addCartInDetail({title, id, quantity, secret, selectedSize, product}) {
    let storageProducts = JSON.parse(localStorage.getItem("cartProducts"));
    const oldQuantity = storageProducts.find((product) => (product.id || product.product_id) === id)?.quantity
    const newQuantityValue = (oldQuantity ?? 0) + quantity

    const data = {
        product_id: id,
        quantity: quantity,
        selectedSize: selectedSize
    }

    axios.post((api_helper.api_url + api_helper.carts.create), data, {
            headers: {
                'Authorization': `Bearer ${secret}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
    )
        .then(async res => {
            if (oldQuantity) {
                storageProducts.map((product) => {
                    if ((product.product_id || product.id) === id) {
                        product.quantity = newQuantityValue
                    }
                    return product
                })
                await localStorage.setItem("cartProducts", JSON.stringify(storageProducts))
            } else {
                let storageProduct = product
                storageProduct.quantity = newQuantityValue;
                storageProduct.image = storageProduct.images.find((img) => img.order === 0);

                storageProducts.push(storageProduct)
                await localStorage.setItem("cartProducts", JSON.stringify(storageProducts))
            }
            HTTPNotificationHelper({
                httpStatus: res.status,
                title: "Sepete eklendi",
                message: title + " sepete eklendi"
            })
        })
        .catch(error => {
            console.log(error);
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message
            })
        })
}

async function getCouponDiscount({
                                     coupon, discount,
                                     setDiscount, setLoaded,
                                     secret, setAppliedCoupons,
                                     appliedCoupons
                                 }) {
    try {
        axios.get(api_helper.api_url + api_helper.coupon.view + coupon,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                //console.log(response.data)
                await setDiscount(discount + parseFloat(response.data.data))
                await setLoaded(true);
                await setAppliedCoupons([...appliedCoupons, {
                    coupon: coupon,
                    discount: parseFloat(response.data.data)
                }])
                HTTPNotificationHelper({
                    httpStatus: response.status,
                    title: response.data.message,
                })
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

async function addCartIfNotExists({id,title, secret}) {
    let storageProducts = await JSON.parse(localStorage.getItem("cartProducts"));
    const oldQuantity = storageProducts.find((product) => (product.product_id) === id)


    if (oldQuantity) {
        HTTPNotificationHelper({
            title: "Ürün zaten sepetinizde",
            httpStatus: 409,
        })
        return
    }

    const data = {
        product_id: id,
        quantity: 1,
    }

    axios.post((api_helper.api_url + api_helper.carts.create), data, {
            headers: {
                'Authorization': `Bearer ${secret}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
    )
        .then(async res => {
            HTTPNotificationHelper({
                httpStatus: res.status,
                title: "Sepete eklendi",
                message: title + " sepete eklendi"
            })
        })
        .catch(error => {
            console.log(error);
            HTTPNotificationHelper({
                httpStatus: error.response.status,
                title: error.response.data.message
            })
        })
}

export {
    updateLoggedInUserCart,
    readLoggedInUserCart,
    deleteLoggedInUserProduct,
    createLoggedInUserProduct,
    getCouponDiscount,
    addCartIfNotExists
}