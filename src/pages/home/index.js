import TopNavigationBar from "../../components/TopNavigationBar";
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
                    //result.push(res.data.data[key])
                    result[key] = res.data.data[key]
                }
                console.log("...... ", result)
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
            <TopNavigationBar></TopNavigationBar>
            <div style={{display: "flex", marginBottom:"100px"}} >

                <div className="side-nav-categories">
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: "32px",
                            fontWeight: "bold",
                            marginBottom: "20px"

                            }}
                    >
                        Categories
                    </h1>
                    <hr
                        style={{
                            marginLeft: "20px",
                            width: "230",
                            height: "1px",
                            backgroundColor: "black",
                            marginBottom: "20px"
                        }}
                    />

                    <ul id="category-tabs">
                        {categories.map((category) => (
                            <CategoriesListComponent category={category}></CategoriesListComponent>
                            //<CategoriesListComponent categories={categories}></CategoriesListComponent>

                        ))}
                    </ul>
                </div>

                <Outlet></Outlet>
            </div>
            <TopNavigationBar></TopNavigationBar>

        </>
    )
}