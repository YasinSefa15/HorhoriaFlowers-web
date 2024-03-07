import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./ProductDetail.css"
import {useState} from "react";
import {getProductDetail} from "../../../requests/ProductRequests";
import addCartInDetail from "../../../requests/cart/CartRequests";
import {addVisitorProductToCart} from "../../../requests/cart/VisitorRequests";
import LoadingScreen from "../../../components/LoadingScreen";
import {useAuth} from "../../../context/AuthContext";
import MetaTags from "./MetaTags";
import ProductDetailsArea from "./components/ProductDetailsArea";

export default function ProductDetail() {
    const {slug} = useParams();
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [mainImage, setMainImage] = useState(null)// useState(product.images[0].file_path)
    const [quantity, setQuantity] = useState(1)
    const {secret, cartProducts, setCartProducts} = useAuth();
    const [selectedSize, setSelectedSize] = useState(null)
   const navigate = useNavigate();

    useEffect(() => {
        const productDetail = async () => {
            await getProductDetail({
                slug: slug,
                setProduct: setProduct,
                setLoading,
                setMainImage,
                setSelectedSize,
            })
        }

        productDetail().then(r => {
        }).catch(e => {
            navigate("/404")
        })

    }, [navigate, slug])

    const handleAddCart = async ({title, id, quantity, size_id, size_value}) => {
        if (secret) {
            //if product already in the cart, get old quantity field
            await addCartInDetail({
                title, id, quantity, secret, size_id,
                product, size_value, cartProducts, setCartProducts
            })

        } else {
            await addVisitorProductToCart({id, quantity, title, product, size_id, size_value})
        }
    }

    const handleSizeChange = (event) => {
        const [id] = event.target.value.split("?=")
        const x = product.sizes.find(size => size.id === parseInt(id))
        setSelectedSize(x)
    };

    const changeImage = (id) => {
        setMainImage(product.images[id].file_path)
    }


    return (
        <>
            {!loading ? <LoadingScreen></LoadingScreen> :
                <>
                    <MetaTags title={product.title}/>

                    <div className="container mt-5">
                        <ProductDetailsArea
                            product={product}
                            mainImage={mainImage}
                            changeImage={changeImage}
                            handleSizeChange={handleSizeChange}
                            selectedSize={selectedSize}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            handleAddCart={handleAddCart}
                        />
                    </div>
                </>
            }
        </>
    )
}