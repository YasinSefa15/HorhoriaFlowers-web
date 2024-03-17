import React, {useEffect, useState} from "react";
import './HomePage.css';
import {Carousel, Container, Row, Col, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import getDiscountedProducts from "../../../requests/HomePageRequests";
import {addVisitorProductToCartIfNotExists} from "../../../requests/cart/VisitorRequests";
import {useAuth} from "../../../context/AuthContext";
import {addCartIfNotExists, readLoggedInUserCart} from "../../../requests/cart/CartRequests";
import ProductCart from "../../../components/user/product_cart/ProductCart";
import uuidGenerator from "../../../utils/uuidGenerator";
import HomeImage1 from "../../../assests/HomeImage1.png";
import HomeImage2 from "../../../assests/HomeImage2.png";


export default function HomePage() {
    const navigate = useNavigate();
    const [discountedProducts, setDiscountedProducts] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [currentPageDiscount, setCurrentPageDiscount] = useState(1);
    const [currentPageNew, setCurrentPageNew] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4); // Varsayılan olarak 4 ürün göster

    useEffect(() => {
        const loadProducts = async () => {
            await getDiscountedProducts({setDiscountedProducts, setNewProducts})
        };
        loadProducts().then(r => {
        });
    }, [])

    useEffect(() => {
        updateItemsPerPage(); // Sayfa yüklendiğinde ve ekran boyutu değiştiğinde güncelle
        window.addEventListener('resize', updateItemsPerPage);
        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    const updateItemsPerPage = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1400) {
            setItemsPerPage(4); // Büyük ekranlarda 4 ürün göster
        } else if (screenWidth >= 992) {
            setItemsPerPage(3); // Orta ekranlarda 3 ürün göster
        } else if (screenWidth >= 768) {
            setItemsPerPage(2); // Orta ekranlarda 3 ürün göster
        } else {
            setItemsPerPage(2); // Küçük ekranlarda 2 ürün göster
        }
    };

    const totalPagesDiscount = Math.ceil(discountedProducts.length / itemsPerPage);
    const totalPagesNew = Math.ceil(newProducts.length / itemsPerPage);

    const showPrevItemsDiscount = () => {
        setCurrentPageDiscount(prev => Math.max(prev - 1, 1));
    };

    const showNextItemsDiscount = () => {
        setCurrentPageDiscount(prev => Math.min(prev + 1, totalPagesDiscount));
    };

    const showPrevItemsNew = () => {
        setCurrentPageNew(prev => Math.max(prev - 1, 1));
    };

    const showNextItemsNew = () => {
        setCurrentPageNew(prev => Math.min(prev + 1, totalPagesNew));
    };

    const startIndexDiscount = (currentPageDiscount - 1) * itemsPerPage;
    const startIndexNew = (currentPageNew - 1) * itemsPerPage;
    const visibleItemsDiscount = discountedProducts.slice(startIndexDiscount, startIndexDiscount + itemsPerPage);
    const visibleItemsNew = newProducts.slice(startIndexNew, startIndexNew + itemsPerPage);
    const {secret, setCartProducts} = useAuth();

    const addToCart = (event, id, title, secret, size_id, size_value) => {
        event.stopPropagation();

        if (!secret) {
            addVisitorProductToCartIfNotExists({title, id: id, quantity: 1, size_id, size_value});
            return;
        }

        const loadCartProducts = async () => {
            await addCartIfNotExists({
                id, secret, title, size_id
            }).then(r => {
            })

            await readLoggedInUserCart({setProducts: setCartProducts, secret: secret});
        };
        loadCartProducts().then(r => {
        });
    }

    return (
        <>
            <Helmet>
                <title>Horhoria Flowers - En Yeni Ürünleri Keşfedin!</title>
                <meta
                    name="description"
                    content="Hooria e-ticaret platformunda en yeni ürünleri keşfedin, indirimlerden yararlanın ve hızlı alışveriş deneyimi yaşayın. Geniş ürün yelpazemizle ihtiyacınız olan her şey burada!"
                />
                {/* Diğer meta etiketleri burada ekleyebilirsiniz */}
            </Helmet>

            {/* Carousel */}
            <Carousel>
                <Carousel.Item>
                    <div className="d-flex justify-content-center">
                        <img
                            className="d-block"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "480px",
                                objectFit: "fit"
                            }}
                            src={HomeImage1 ?? ""}
                            alt="Ana Sayfa Resmi 1"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="d-flex justify-content-center">
                        <img
                            className="d-block"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "480px",
                                objectFit: "fit"
                            }}
                            src={HomeImage2 ?? ""}
                            alt="Ana Sayfa Resmi 2"
                        />
                    </div>
                </Carousel.Item>
            </Carousel>

            <Container className="mt-5">
                <Row className="mb-3">
                    <Col md={12} className="arrow-button-col d-flex align-items-center justify-content-between">
                        <h2>İndirimdeki Ürünlerimiz</h2>
                        <div>
                            <Button
                                variant="light" // Butonun arka plan rengini gri yapıyoruz
                                className="arrow-button"
                                onClick={showPrevItemsDiscount}
                                disabled={currentPageDiscount === 1}
                            >
                                &lt;
                            </Button>
                            <Button
                                variant="light" // Butonun arka plan rengini gri yapıyoruz
                                className="arrow-button"
                                onClick={showNextItemsDiscount}
                                disabled={currentPageDiscount === totalPagesDiscount}
                            >
                                &gt;
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col>
                        <Row>
                            {visibleItemsDiscount.map((item) => (
                                <ProductCart
                                    key={uuidGenerator()}
                                    product={item}
                                    handleDivClick={() => {
                                        navigate("/products/" + item.slug, {state: {product: item}})
                                    }}
                                    addToCart={(event) => {
                                        addToCart(event, item.id, item.title, secret, item.sizes[0].id, item.sizes[0].value)
                                    }}

                                ></ProductCart>
                            ))}
                        </Row>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12} className="arrow-button-col d-flex align-items-center justify-content-between">
                        <h2>Yeni Ürünlerimiz</h2>
                        <div>
                            <Button
                                variant="light" // Butonun arka plan rengini gri yapıyoruz
                                className="arrow-button"
                                onClick={showPrevItemsNew}
                                disabled={currentPageNew === 1}
                            >
                                &lt;
                            </Button>
                            <Button
                                variant="light" // Butonun arka plan rengini gri yapıyoruz
                                className="arrow-button"
                                onClick={showNextItemsNew}
                                disabled={currentPageNew === totalPagesNew}
                            >
                                &gt;
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col>
                        <Row>
                            {visibleItemsNew.map(item => (
                                <ProductCart
                                    key={item.id + item.slug + item.sizes[0].id}
                                    product={item}
                                    handleDivClick={() => {
                                        navigate("/products/" + item.slug, {state: {product: item}})
                                    }}
                                    addToCart={(event) => {
                                        addToCart(event, item.id, item.title, secret, item.sizes[0].id, item.sizes[0].value)
                                    }}

                                ></ProductCart>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
