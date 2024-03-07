import React from 'react';
import './LoadingScreen.css';
const LoadingScreen = () => {
    return (
            <div className="d-flex justify-content-center align-items-center" style={{
                width: "100%",
                height: "100%",
            }}>
                <span className="loader"></span>
            </div>
    );
};

export default LoadingScreen;
