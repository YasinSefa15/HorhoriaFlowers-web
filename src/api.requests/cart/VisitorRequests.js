import HTTPNotificationHelper from "../../helpers/HTTPNotificationHelper";
import axios from "axios";
import {api_helper} from "../../helpers/api_helper";

const addVisitorProductToCart = ({title, id, quantity}) => {
    const add = async () => {
        let productsInCart = JSON.parse(localStorage.getItem("visitorCartProducts"));
        const foundItem = productsInCart.some(item => item.id === id);

        if (foundItem) {
            HTTPNotificationHelper({
                title: "Ürün zaten sepetinizde",
                httpStatus: 409,
            })
        } else {
            HTTPNotificationHelper({
                httpStatus: 201,
                title: "Sepete eklendi",
                message: title + " sepete eklendi"
            })
            productsInCart.push({
                id: id,
                quantity: quantity
            })
            localStorage.setItem("visitorCartProducts", JSON.stringify(productsInCart))
        }
    }

    add()
}

const updateVisitorProductCart = ({id, quantity, selectedSize}) => {
    const update = async () => {
        let productsInCart = JSON.parse(localStorage.getItem("visitorCartProducts"));

        let found = false;
        productsInCart.map(item => {
            if (item.id === id) {
                item.quantity = quantity
                found = true
            }
            return item
        });
        if (!found) {
            productsInCart.push({
                id: id,
                quantity: quantity,
                selectedSize: selectedSize
            })
        }

        localStorage.setItem("visitorCartProducts", JSON.stringify(productsInCart))

    }

    update()
}

const syncVisitorCartProductsToLoggedInUserCartProducts = async ({cartProducts, secret}) => {
    await axios.post(api_helper.api_url + api_helper.carts.sync, {
        products: JSON.parse(cartProducts)
    }, {
        headers: {
            "Authorization": `Bearer ${secret}`,
        }
    }).then(async res => {
        await localStorage.removeItem("visitorCartProducts")
    }).catch(error => {
    })
}

const getVisitorCartProducts = async ({cartProducts, setProducts}) => {
    await axios.post(api_helper.api_url + api_helper.carts.visitor_products, {
        products: JSON.parse(cartProducts)
    }).then(async res => {
        await setProducts(res.data.data)
    }).catch(error => {
        console.log("error", error)
    })
}

export {
    addVisitorProductToCart,
    updateVisitorProductCart,
    syncVisitorCartProductsToLoggedInUserCartProducts,
    getVisitorCartProducts
}