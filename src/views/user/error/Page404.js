import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import React from "react";

export default function Page404() {
    const errorContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #e0c3fc, #8ec5fc)',
    };

    const headingStyle = {
        fontSize: '5rem',
        color: '#5928E3',
    };

    const descriptionStyle = {
        fontSize: '1.5rem',
        color: '#333',
    };

    const buttonStyle = {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1.2rem',
        backgroundColor: '#5928E3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        textDecoration: 'none',
    };

    return (
        <>
            <Helmet>
                <title>Horhoria Flowers - Sayfa Bulunamadı</title>
                <meta
                    name="description"
                    content="Üzgünüz, aradığınız sayfa maalesef bulunamadı. Hooria e-ticaret platformunda en yeni ürünleri keşfedin, indirimlerden yararlanın ve hızlı alışveriş deneyimi yaşayın. Geniş ürün yelpazemizle ihtiyacınız olan her şey burada!"
                />
                {/* Diğer meta etiketleri burada ekleyebilirsiniz */}
            </Helmet>
            <div style={errorContainerStyle}>
                <h1 style={headingStyle}>404</h1>
                <h2 style={descriptionStyle}>Üzgünüz, aradığınız sayfayı bulamadık.</h2>
                <Link to="/" style={buttonStyle}>
                    Anasayfa'ya Dön
                </Link>
            </div>
        </>
    )
}