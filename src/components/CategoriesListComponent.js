import {NavLink} from "react-router-dom";
import {api_helper} from "../helpers/api_helper";

export default function CategoriesListComponent({categories}) {
    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {console.log(categories)}
                {categories.map((category) => (
                    <li key={category.id}>
                        <NavLink to={"categories/" + category.slug}>
                            {category.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}