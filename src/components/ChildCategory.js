import {NavLink} from "react-router-dom";
import React from "react";

export default function ChildCategory({category, fontSize}) {

    return (
        <li>
            < NavLink to={"categories/" + category.slug}>
                {category.title}
            </NavLink>


            {
                Object.entries(category.children).map((child) => {
                    return <ul className="child-ul">
                        <ChildCategory key={child[1].id} category={child[1]}></ChildCategory>
                    </ul>
                })
            }


        </li>
    )
}