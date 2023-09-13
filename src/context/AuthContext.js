import React, {createContext, useContext, useEffect, useState} from "react";
import {readLoggedInUserCart} from "../api.requests/cart/CartRequests";
import {syncVisitorCartProductsToLoggedInUserCartProducts} from "../api.requests/cart/VisitorRequests";
import getIsAdmin from "../api.requests/UnclassifiedRequests";

const Context = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [isAdmin, setIsAdmin] = useState(false)
    const [secret, setSecret] = useState(JSON.parse(localStorage.getItem('secret')) || null);
    const [cartProducts, setCartProducts] = useState(localStorage.getItem('cartProducts') || null)

    //todo yetkisiz işlem ise çıkıp yap
    useEffect(() => {
        const isAdmin = async () => {
            await getIsAdmin({secret: secret, setIsAdmin: setIsAdmin})
        }
        isAdmin().then(r => {

        })
    }, []);

    useEffect(() => {
        const loadCartProducts = async () => {
            const visitorCartProducts = JSON.parse(localStorage.getItem("visitorCartProducts") ?? "[]")
            if (visitorCartProducts.length) {
                await syncVisitorCartProductsToLoggedInUserCartProducts({
                    cartProducts: visitorCartProducts ?? JSON.stringify([]),
                    secret: secret
                })
            }
            await localStorage.removeItem("visitorCartProducts")
            await readLoggedInUserCart({setProducts: setCartProducts, secret: secret});
        };

        const removeLocalStorage = async () => {
            await localStorage.removeItem("user")
            await localStorage.removeItem("secret")
            await localStorage.removeItem("cartProducts")
            await localStorage.setItem("visitorCartProducts", localStorage.getItem("visitorCartProducts") ?? JSON.stringify([]))
            await setIsAdmin(false)
        }

        const setLocalStorage = async () => {
            await localStorage.setItem("user", JSON.stringify(user))
            await localStorage.setItem("secret", JSON.stringify(secret))
            await getIsAdmin({secret: secret, setIsAdmin: setIsAdmin})
        }

        const handleLogout = async () => {
            if (user === null || secret === null) {
                await removeLocalStorage();
                //await navigate("/");
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
            if ((secret !== null && cartProducts !== null) || Array.isArray(JSON.parse(localStorage.getItem('cartProducts')))) {
                console.log("setCartProducts", cartProducts)
                await localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                //await localStorage.setItem("cartProducts", JSON.stringify([]))
            }
        };
        setCartProducts().then(r => {
        });
    }, [cartProducts])

    const handleLogin = async (data) => {
        await setUser({
            id: data.data.id,
            first_name: data.data.first_name,
            last_name: data.data.last_name,
        })

        await setSecret(data.token)
    }

    const data = {
        user,
        setUser,
        secret,
        setSecret,
        cartProducts,
        setCartProducts,
        handleLogin,
        isAdmin,
        setIsAdmin
    }

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}


export const useAuth = () => useContext(Context)