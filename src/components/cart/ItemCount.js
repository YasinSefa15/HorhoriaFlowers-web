import TrashIcon from "../../assests/trash.svg";

export default function ItemCount({count, id, updateProductQuantity, deleteProduct}) {
    return (
        <nav className="item-count-container">
            <div className=" row ">
                <ul className="pagination  ">
                    <li
                        className={"page-item " + (count === 1 ? "disabled" : "")}
                        onClick={() => {
                            updateProductQuantity(id, count - 1)
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
                            updateProductQuantity(id, count + 1)
                        }}
                    >
                        <a className="page-link" href="#">+</a>
                    </li>


                    <li style={{padding: "auto"}}>
                        <img
                            src={TrashIcon}
                            onClick={() => {
                                deleteProduct(id)
                            }}
                        ></img>
                    </li>
                </ul>
            </div>
        </nav>
    )
}