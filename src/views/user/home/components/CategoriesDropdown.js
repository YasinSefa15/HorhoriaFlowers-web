import {NavLink, } from "react-router-dom";
import React, {useState} from "react";
import {useData} from "../../../../context/DataProvider";
import {colorSchema} from "../../../../utils/ColorSchema";


export default function CategoriesDropdown({categories}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {categoriesList} = useData();


    const renderCategories = (category) => {
        return (
            <li key={category.id} style={{
                listStyleType: "none",
                marginTop: "5px",
            }}>
                <NavLink
                    className="dropdown-item my-dropdown-item"
                    to={"/categories/" + category.slug + "?page=1&onStock=0"}
                    state={{title: category.title, page: 1, onStock: 0, slug: category.slug}}
                    style={{
                        borderRadius: "5px",
                    }}
                >
                    {category.title}
                </NavLink>
                {category.children && category.children.length > 0 && (
                    <ul  style={{
                        padding: "0px 0px 0px 16px",
                        marginTop: "5px",
                    }}>{category.children.map((childCategory) => renderCategories(childCategory))}</ul>
                )}
            </li>
        );
    };


    return (
        <>
            <div className="dropdown" onMouseEnter={() => setIsDropdownOpen(true)}
                 onMouseLeave={() => setIsDropdownOpen(false)}
                 style={{position: "relative"}}>
                <a className="navbar-brand m-0" role="button" data-bs-toggle="dropdown"
                   aria-expanded={isDropdownOpen}>
                    Kategoriler
                </a>
                <ul className={`dropdown-menu p-2 ${isDropdownOpen ? " show" : ""}`}>
                    {categoriesList?.map((category) => renderCategories(category))}
                </ul>
            </div>
        </>
    )
}