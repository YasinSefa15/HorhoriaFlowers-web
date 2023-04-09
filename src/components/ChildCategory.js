import {NavLink} from "react-router-dom";
import React from "react";
import minusLogo from '../minus.svg'

export default function ChildCategory({category, parentVisible}) {
    const [childVisible, setChildVisible] = React.useState(false)
    let style = {}


    React.useEffect(() => {
        setChildVisible(!parentVisible ? false : childVisible)

    }, [parentVisible])

    return (
        <li
            key={category.id + "." + category.slug}

        >
            <div className="parent-category-container"
                 style={style}

            >
                < NavLink to={"categories/" + category.slug}
                          onClick={() => {
                              setChildVisible(!childVisible)
                          }}
                >
                    {category.title}
                </NavLink>


                {Object.entries(category.children).length > 0 ? <img src={minusLogo} alt="show"></img> : ""}

            </div>
            {
                Object.entries(category.children).map((child) => {
                    return <ul className="sub-category-tabs"
                               style={childVisible ? {visibility: "visible"} : {
                                   visibility: "hidden",
                                   height: 0
                               }}
                    >
                        <ChildCategory
                            key={child[1].id}
                            category={child[1]}
                            parentVisible={childVisible}
                        />

                    </ul>
                })
            }


        </li>
    )
}