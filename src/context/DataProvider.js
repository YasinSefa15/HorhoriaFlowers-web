import React, {createContext, useContext, useEffect, useState} from "react";
import {getCategoriesList} from "../requests/Home";

const Context = createContext();

export const DataProvider = ({children}) => {
    const [categoriesList, setCategoriesList] = useState([]);

    const data = {
        categoriesList,
        setCategoriesList
    }

    useEffect(() => {
        const loadCartProducts = async () => {
            await getCategoriesList({setCategories: setCategoriesList});
            //console.log("categories read db");
        };

        loadCartProducts().then(r => {
        });
        //localStorage.setItem("cartProducts", JSON.stringify(cartProducts))

    }, [])


    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}


export const useData = () => useContext(Context)