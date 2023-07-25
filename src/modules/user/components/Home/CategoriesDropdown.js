import {NavLink, useNavigate} from "react-router-dom";
import React, {useState} from "react";


export default function CategoriesDropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="dropdown " onMouseEnter={() => setIsDropdownOpen(true)}
                 onMouseLeave={() => setIsDropdownOpen(false)}
                 style={{position: "relative"}}>
                <a className="navbar-brand" role="button" data-bs-toggle="dropdown"
                   aria-expanded={isDropdownOpen}>
                    Kategoriler
                </a>
                <ul className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}>
                    <li><NavLink className="dropdown-item"
                                 to="/categories/deneme">Deneme</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/categories/category2">Kategori
                        2</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/categories/category3">Kategori
                        3</NavLink></li>
                </ul>
            </div>


        </>
    )
}