export default function ImageComponent({images, visibleOrder}) {
    return images.map((image, index) => (
        <>
            <img
                src={image.file_path}
                alt="product name"
                className=""
                style={{display: visibleOrder === image.order ? "block" : "none"}}
            />
        </>
    ))


}