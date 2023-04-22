import PageItems from "../pagination/PageItems";

export default function ItemCount({count,id,updateProductQuantity}) {
    return (
        <nav className="item-count-container">
            <div className=" row justify-content-md-center">
                <ul className="pagination col-md-auto">
                    <li
                        className={"page-item " + (count === 1 ? "disabled" : "")}
                        onClick={() => {
                            updateProductQuantity(id,count - 1)
                        }}
                    >
                        <a className="page-link" href="#">-</a>
                    </li>

                    <li>
                        <a className="page-link disabled">{count}</a>
                    </li>

                    <li
                        className={"page-item "}
                        onClick={() => {
                            updateProductQuantity(id,count + 1)
                        }}
                    >
                        <a className="page-link" href="#">+</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}