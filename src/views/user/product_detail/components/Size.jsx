import React from "react";

export default function Size({
                                 sizes,
                                 handleSizeChange
                             }) {
    return sizes.length > 0 ?
        (
            <>
                <select className="my-3" onChange={handleSizeChange}>
                    {sizes.map((size) => {
                        return (
                            <option key={size.id}
                                    value={size.id + "?=" + size.value}>{size.value}</option>
                        );
                    })}
                </select>
            </>
        ) : <div className="mb-3"></div>
}
