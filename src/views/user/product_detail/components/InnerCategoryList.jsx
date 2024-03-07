import React from "react";
import {useNavigate} from "react-router-dom";
import uuidGenerator from "../../../../utils/uuidGenerator";

export default function InnerCategoryList({
                                              categories
                                          }) {
    const navigate = useNavigate()
    const titles = categories.titles.split("/")
    const slugs = categories.slugs.split("/")

    return (
        <>
            <div className={"d-flex"}>
                {titles.map((title, index) => {
                    return (
                        <React.Fragment key={uuidGenerator()}>
                            <h5
                                className="text-decoration-none mb-4 cursor-pointer"
                                style={index !== 0 ? {
                                    marginLeft: "0.5rem",
                                    marginRight: "0.5rem",
                                } : {
                                    marginRight: "0.5rem",
                                }}
                                onClick={() => {
                                    navigate(`/categories/${slugs[index]}?page=1`)
                                }}
                            >{title}</h5>
                            {index !== titles.length - 1 && <span> / </span>}
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    )
}