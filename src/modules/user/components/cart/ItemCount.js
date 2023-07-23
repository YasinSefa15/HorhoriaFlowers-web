export default function ItemCount({count, id, updateProductQuantity, updateTotal, price}) {
    return (
        <nav className="item-count-container">
            <div className=" row ">
                <ul className="pagination  ">
                    <li
                        className={"page-item " + (count === 1 ? "disabled" : "")}
                        onClick={() => {
                            updateProductQuantity(id, count - 1)
                            updateTotal(price, -1)
                        }}
                    >
                        <span className="page-link">-</span>
                    </li>

                    <li>
                        <span className="page-link">{count}</span>
                    </li>

                    <li
                        className={"page-item "}
                        onClick={() => {
                            updateProductQuantity(id, count + 1)
                            updateTotal(price, 1)
                        }}
                    >
                        <span className="page-link">+</span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}