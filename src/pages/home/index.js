import NavigationBar from "../NavigationBar";
import React from "react";
import {Outlet} from "react-router-dom";
import CategoriesListComponent from "../../components/CategoriesListComponent";
import axios from "axios";
import {api_helper} from "../../helpers/api_helper";


export default function HomePageLayout() {
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
            <NavigationBar></NavigationBar>
            <div style={{display: "flex"}}>

                <CategoriesListComponent categories={categories}></CategoriesListComponent>
                <h1>Home Page</h1>
                <Outlet></Outlet>
            </div>
            <NavigationBar></NavigationBar>

        </>
    )
}