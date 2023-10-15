import React from 'react';
import './DashboardItem.css'; // Stil dosyasını eklemeyi unutmayın

const DashboardItem = ({ title, value ,backgroundColor}) => {
    return (
        <div className="col mb-3 col-6 col-sm-4 col-md-4 col-lg-3">
            <div className="dashboard-item" style={{backgroundColor}}>
                <div className="item-content">
                    <div className="item-title">
                        <span>{title}</span>
                    </div>
                    <div className="item-value">
                        <div className="value-circle">
                            {value}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardItem;
