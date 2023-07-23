export default function ProductImage({images, visibleOrder}) {
    return (
        <>
            <img
                src={images[0].file_path}
                alt="product name"
                //style={{display: visibleOrder === images[0].order ? "block" : "none"}}
                className="img-fluid"
            />


    </>
    )
}