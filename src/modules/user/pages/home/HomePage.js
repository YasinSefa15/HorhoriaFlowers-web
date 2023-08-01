import React, {useEffect, useState} from "react";
import './HomePage.css';

import {Carousel, Container, Row, Col, Button} from 'react-bootstrap';
import axios from "axios";
import getDiscountedProducts from "../../../../api.requests/HomePageRequests";
import ProductCart from "../../components/product_cart/ProductCart";

export default function HomePage() {
    const [discountedProducts, setDiscountedProducts] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [currentPageDiscount, setCurrentPageDiscount] = useState(1);
    const [currentPageNew, setCurrentPageNew] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4); // Varsayılan olarak 4 ürün göster

    useEffect(() => {
        getDiscountedProducts({setDiscountedProducts, setNewProducts})
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
            setItemsPerPage(1); // Küçük ekranlarda 2 ürün göster
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


    return (
        <>
            {/* Carousel */}
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/1920x500"
                        alt="Slide 1"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/1920x500"
                        alt="Slide 2"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/1920x500"
                        alt="Slide 3"
                    />
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
                            {visibleItemsDiscount.map(item => (
                                <>
                                    {console.log("discount item rendered")}
                                    <ProductCart
                                        product={item}
                                        handleDivClick={() => {

                                        }}
                                        addToCart={() => {

                                        }}

                                    ></ProductCart>
                                </>
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
                                <>
                                    {console.log("new item rendered")}
                                    <ProductCart
                                        product={item}
                                        handleDivClick={() => {

                                        }}
                                        addToCart={() => {

                                        }}

                                    ></ProductCart>
                                </>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
