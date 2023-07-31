import React, {createContext, useContext, useEffect, useState} from "react";
import {readLoggedInUserCart} from "../api.requests/cart/CartRequests";

const Context = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || false);
    const [secret, setSecret] = useState(JSON.parse(localStorage.getItem('secret')) || "");
    const [cartProducts, setCartProducts] = useState(localStorage.getItem('cartProducts') || "[]")

    const data = {
        user,
        setUser,
        secret,
        setSecret,
        cartProducts,
        setCartProducts
    }

    useEffect(() => {
        const loadCartProducts = async () => {
            await readLoggedInUserCart({setProducts: setCartProducts, secret: secret});
            console.log("cart products loaded");
        };

        if (user === false) {
            localStorage.removeItem("user")
            localStorage.removeItem("secret")
            return
        }
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("secret", JSON.stringify(secret))

        loadCartProducts().then(r => {
        });
        //localStorage.setItem("cartProducts", JSON.stringify(cartProducts))

    }, [user, secret])


    useEffect(() => {
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
    }, [cartProducts])


    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}


export const useAuth = () => useContext(Context)