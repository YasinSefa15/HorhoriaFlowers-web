export default function MostSellingProductsList({data}) {

    return (
        <div>
            {data.map((item, index) => {
                return (
                    <div className="d-flex p-2">
                        <div className="d-flex align-items-center me-2">{index + 1}</div>

                        <div className="d-flex align-items-center">
                            <img
                                src={item.product.image.file_path}
                                alt="img"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "20px"
                                }}
                            />¬
                        </div>
                        <div className="row d-flex align-items-center">
                            <h5 className="fw-bolder">{item.product.title}</h5>
                            <p>{item.product.new_price}₺</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}