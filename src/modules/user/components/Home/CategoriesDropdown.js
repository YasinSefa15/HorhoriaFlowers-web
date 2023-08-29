import {NavLink, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {getCategoriesList} from "../../../../api.requests/Home";
import {useData} from "../../../../context/DataProvider";


export default function CategoriesDropdown({categories}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {categoriesList} = useData();


    const renderCategories = (category) => {
        return (
            <li key={category.id}>
                <NavLink
                    className="dropdown-item"
                    to={"/categories/" + category.slug}
                    state={{title: category.title}}
                >
                    {category.title}
                </NavLink>
                {category.children && category.children.length > 0 && (
                    <ul>{category.children.map((childCategory) => renderCategories(childCategory))}</ul>
                )}
            </li>
        );
    };


    return (
        <>
            {//console.log("a", categoriesList)
            }
            <div className="dropdown" onMouseEnter={() => setIsDropdownOpen(true)}
                 onMouseLeave={() => setIsDropdownOpen(false)}
                 style={{position: "relative"}}>
                <a className="navbar-brand m-0" role="button" data-bs-toggle="dropdown"
                   aria-expanded={isDropdownOpen}>
                    Kategoriler
                </a>
                <ul className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}>
                    {categoriesList.map((category) => renderCategories(category))}
                </ul>
            </div>
        </>
    )
}