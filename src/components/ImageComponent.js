export default function ImageComponent({image}) {
    return (
        <div>
            <img src={image.file_path} alt="product name"/>
        </div>
    )
}