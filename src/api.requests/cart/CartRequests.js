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

const updateLoggedInUserCart = ({product_id, quantity, secret, size_id}) => {
    axios.put((api_helper.api_url + api_helper.carts.update).replace(':product_id', product_id), {
            quantity: quantity,
            size_id: size_id
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

const deleteLoggedInUserProduct = async ({product_id, secret, size_id}) => {
    await axios.post((api_helper.api_url + api_helper.carts.delete), {
            product_id: product_id,
            size_id: size_id
        }, {
            headers: {
                'Authorization': `Bearer ${secret}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
    )
        .then(res => {
            console.log("delete", res.data)
            HTTPNotificationHelper({
                httpStatus: res.status,
                title: "Ürün sepetten silindi",
            })

        })
        .catch(error => {
            console.log("silme hata " , error);
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


export default function addCartInDetail({title, id, quantity, secret, size_id, product, size_value}) {
    let storageProducts = JSON.parse(localStorage.getItem("cartProducts"));

    //const oldQuantity = storageProducts.find((product) => (product.id || product.product_id) === id)?.quantity

    const oldQuantity = storageProducts.find((product) => {
        return (product.id || product.product_id) === id && product.size_id === size_id
    })?.quantity

    console.log("old quantity ", oldQuantity)

    const newQuantityValue = (oldQuantity ?? 0) + quantity
    console.log("new quantity ", newQuantityValue)

    const data = {
        product_id: id,
        quantity: newQuantityValue,
        size_id: size_id
    }

    console.log("data", data)
    axios.post((api_helper.api_url + api_helper.carts.create), data, {
            headers: {
                'Authorization': `Bearer ${secret}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
    )
        .then(async res => {
            console.log("res", res.data)
            if (oldQuantity) {
                storageProducts.map((product) => {
                    if ((product.product_id || product.id) === id && product.size_id === size_id) {
                        product.quantity = newQuantityValue
                    }
                    return product
                })
                await localStorage.setItem("cartProducts", JSON.stringify(storageProducts))
            } else {
                let storageProduct = product
                storageProduct.quantity = newQuantityValue;
                product.size_id = size_id;
                storageProduct.image = storageProduct.images.find((img) => img.order === 0);
                storageProduct.size_value = size_value;
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
        await axios.get(api_helper.api_url + api_helper.coupon.view + coupon,
            {
                headers: {
                    "Authorization": "Bearer " + secret,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(async (response) => {
                console.log("x.", discount, discount + parseFloat(response.data.data))
                await setDiscount(discount + parseFloat(response.data.data))
                console.log("y.z", discount)
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

async function addCartIfNotExists({id, title, secret, size_id}) {
    let storageProducts = await JSON.parse(localStorage.getItem("cartProducts"));
    const oldQuantity = storageProducts.find((product) => {
        return (product.id || product.product_id) === id && product.size_id === size_id
    })


    console.log(oldQuantity)
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
        size_id: size_id
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