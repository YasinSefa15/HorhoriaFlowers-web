import {NavLink} from "react-router-dom";
import {api_helper} from "../helpers/api_helper";
import React from "react";

export default function CategoriesListComponent({categories}) {
    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {console.log(categories)}
                <ul className="list-group">
                    {categories.map((category) => (
                        <li
                            className="list-group-item"
                            key={category.id}
                            style={{marginLeft: 20, marginBottom: 10, width: 200}}
                        >
                            < NavLink to={"categories/" + category.slug}>
                                {category.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </ul>
        </div>
    )
}