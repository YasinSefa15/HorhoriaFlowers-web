import {Routes, Route, Link, NavLink} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import React from 'react';
import ProductsPage from "./pages/ProductsPage";
import axios from "axios";
import {api_helper} from "./helpers/api_helper";
import CategoriesListComponent from "./components/CategoriesListComponent";

function App() {
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        axios.get(api_helper.api_url + api_helper.category.read)
            .then(res => {
                let result = [];
                for (const key of Object.keys(res.data.data)) {
                    //TODO SERVER ERROR FALAN OLURSA PROMP
                    //console.log(key, res.data.data[key]);
                    result.push(res.data.data[key])
                }
                setCategories(result)
                console.log("fetched")
                console.log("result ", result)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <CategoriesListComponent categories={categories}></CategoriesListComponent>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/categories/:slug" element={<ProductsPage/>}></Route>
            </Routes>
        </>
    );
}

export default App;
