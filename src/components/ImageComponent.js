export default function ImageComponent({images, className}) {
    return images.map(image => (
        <div>
            <img src={image.file_path} alt="product name" className={className}/>
        </div>
    ))


}