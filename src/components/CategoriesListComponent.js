import {NavLink} from "react-router-dom";
import {api_helper} from "../helpers/api_helper";
import React from "react";
import ChildCategory from "./ChildCategory";
import "../styles/pages/CategoriesList.css"
import minusLogo from '../minus.svg'
import plusLogo from '../plus.svg'

export default function CategoriesListComponent({category}) {
    const [childVisible, setChildVisible] = React.useState(false)

    //todo open and clı

    return (

        <>
            {(() => {
                if (category.parent_id !== null) {
                    return;
                }


                const list_item = <li

                    key={category.id + "." + category.slug}
                    //style={{marginLeft: 20, marginBottom: 10, width: 200, fontSize: 16, fontWeight: "bold"}}
                >
                    <div className="parent-category-container">
                        < NavLink to={"categories/" + category.slug}
                                  onClick={() => {
                                      setChildVisible(!childVisible)
                                  }}
                        >
                            {category.title}
                        </NavLink>

                        {
                            Object.keys(category.children).length > 0
                                ? <img
                                    src={childVisible ? minusLogo : plusLogo}
                                    alt="show
                                    ">
                                </img> : ""
                        }

                    </div>

                    {
                        Object.keys(category.children).length > 0 ?
                            Object.entries(category.children).map((child) => {
                                //console.log("category yyyy", category)
                                //console.log("child xx", child[1])

                                return <ul className="sub-category-tabs"
                                           style={childVisible ? {visibility: "visible"} : {
                                               visibility: "hidden",
                                               height: 0
                                           }}
                                >
                                    < ChildCategory
                                        key={child[1].id}
                                        category={child[1]}
                                        fontSize={14}
                                        parentVisible={childVisible}
                                    />
                                </ul>
                            })
                            :
                            ""
                    }
                    <hr/>

                </li>

                return list_item

            })()}
        </>

    )
}