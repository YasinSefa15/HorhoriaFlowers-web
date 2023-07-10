import {createContext, useContext, useEffect, useState} from "react";

const Context = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || false);
    const [secret, setSecret] = useState(JSON.parse(localStorage.getItem('secret')) || "");

    const data = {
        user,
        setUser,
        secret,
        setSecret
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", JSON.stringify(secret))
    }, [user,secret])


    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}


export const useAuth = () => useContext(Context)