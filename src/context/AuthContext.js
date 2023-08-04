import React, {createContext, useContext, useEffect, useState} from "react";
import {readLoggedInUserCart} from "../api.requests/cart/CartRequests";
import {useNavigate} from "react-router-dom";

const Context = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || false);
    const [secret, setSecret] = useState(JSON.parse(localStorage.getItem('secret')) || null);
    const [cartProducts, setCartProducts] = useState(localStorage.getItem('cartProducts') || null)

    const navigate = useNavigate()

    const data = {
        user,
        setUser,
        secret,
        setSecret,
        cartProducts,
        setCartProducts
    }

    useEffect(() => {
        console.log("user changed")
        const loadCartProducts = async () => {
            await readLoggedInUserCart({setProducts: setCartProducts, secret: secret});
            //console.log("cart products loaded");
        };

        const removeLocalStorage = async () => {
            await localStorage.removeItem("user")
            await localStorage.removeItem("secret")
            await localStorage.removeItem("cartProducts")
        }

        const setLocalStorage = async () => {
            await localStorage.setItem("user", JSON.stringify(user))
            await localStorage.setItem("secret", JSON.stringify(secret))
        }

        const handleLogout = async () => {
            if (user === false || secret === null) {
                await removeLocalStorage();
                navigate("/");
                return;
            }
            await setLocalStorage();
            await loadCartProducts();
        };

        handleLogout().then(r => {
            // Burada herhangi bir sonuç işlemine ihtiyacınız yok,
            // işlem tamamlandığında zaten navigate edilmiş olacaktır.
        });
    }, [user, secret])


    useEffect(() => {
        const setCartProducts = async () => {
            if ((secret !== null && cartProducts !== null) || Array.isArray(localStorage.getItem('cartProducts'))) {
                await localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            }
        };
        setCartProducts().then(r => {
        });
    }, [cartProducts])


    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}


export const useAuth = () => useContext(Context)