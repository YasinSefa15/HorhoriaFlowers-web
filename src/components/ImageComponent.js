export default function ImageComponent({image, className}) {
    return (
        <div>
            <img src={image.file_path} alt="product name" className={className}/>
        </div>
    )
}