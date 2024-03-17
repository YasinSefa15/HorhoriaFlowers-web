import React from 'react';
import {Container, Row, Col, Alert} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import {Helmet} from "react-helmet";
import {useAuth} from "../../../context/AuthContext";

export default function OrderPlaced({orderCode}) {
    const {setCartProducts} = useAuth()

    React.useEffect(() => {
        setCartProducts([])
        //when order is placed, disable back button
        const disableBackButton = (e) => {
            e.preventDefault();
            window.history.forward();
        };

        window.history.pushState(null, '', window.location.href);
        window.onpopstate = disableBackButton;

        return () => {
            window.onpopstate = null;
        };
    }, [])


    return (
        <>
            <Helmet>
                <title>Siparişiniz Alındı - Horhoria Flowers</title>
                <meta name="description"
                      content={`Sipariş kodu: ${orderCode}. Hooria e-ticaret platformunda siparişiniz başarıyla alınmıştır.`}/>
            </Helmet>

            <Container>
                <Row className="justify-content-center mt-5">
                    <Col xs={12} sm={10} md={8} lg={6}>
                        <Alert variant="success">
                            <h4 className="mb-4">Siparişiniz Alınmıştır!</h4>
                            <p><strong>Sipariş Kodunuz:</strong> {orderCode}</p>
                            <br></br>
                            <h4>Ödeme Bilgileri</h4>
                            <p>Siparişinizin ödemesini aşağıdaki banka hesabına yapabilirsiniz.</p>
                            <p><b>Banka Adı: </b>Ziraat Bankası</p>
                            <p><b>Hesap Adı:</b> Bank Sahibi</p>
                            <p><b>IBAN:</b> TR 0000 0000 0000 0000 0000 0000</p>
                            <p><b>Açıklamaya Bunu Yazınız (aynısını):</b> sipariş {orderCode}</p>

                            <br></br>
                            <p>Bizi tercih ettiğiniz için teşekkür ederiz. Siparişiniz başarıyla oluşturulmuştur.</p>

                            <p>Siparişinizin durumunu <NavLink to="/profile/orders">profilim</NavLink> sayfasından takip
                                edebilirsiniz.</p>

                            <p>Ana sayfaya dönmek için <NavLink to="/">tıklayınız</NavLink>.</p>
                        </Alert>
                    </Col>

                </Row>
            </Container>
        </>
    );
}
