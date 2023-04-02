import {NavLink} from "react-router-dom";
import {api_helper} from "../helpers/api_helper";
import React from "react";
import ChildCategory from "./ChildCategory";
import "../styles/pages/CategoriesList.css"

export default function CategoriesListComponent({categories}) {

    //todo need recursive function

    return (
        <div>
            <h1>Categories</h1>

            <ul className="list-group">
                {categories.map((category) => {
                    if (category.parent_id !== null) {
                        return;
                    }


                    const list_item = <li
                        className="list-group"
                        key={category.id}
                        style={{marginLeft: 20, marginBottom: 10, width: 200, fontSize: 16, fontWeight: "bold"}}
                    >
                        < NavLink to={"categories/" + category.slug}>
                            {category.title}
                        </NavLink>
                        {
                            Object.keys(category.children).length > 0 ?
                                Object.entries(category.children).map((child) => {
                                    //console.log("category yyyy", category)
                                    //console.log("child xx", child[1])

                                    return <ul>
                                        <ChildCategory key={child[1].id} category={child[1]} fontSize={14}/>
                                    </ul>
                                })
                                : ""
                        }

                    </li>

                    return list_item
                })}

            </ul>
        </div>
    )
}