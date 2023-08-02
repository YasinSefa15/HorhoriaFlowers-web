import {useState} from "react";
import "./Profile.css"
export default function ProfileAddresses() {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const addresses = [
        {
            "title": "ev",
            id: 1,
            details: "Ev adresi",
            city: "İstanbul",
            country: "Türkiye"
        }
    ]

    const handleAddressClick = (address) => {
        if (selectedAddress?.id === address.id) {
            setSelectedAddress(null);
            return;
        }
        setSelectedAddress(selectedAddress === address ? null : address);
        console.log("address", address)
    };

    return (
        <>
            <div>
                <h2>Kayıtlı Adreslerim</h2>
                <ul className="address-list">
                    {addresses.map((address) => (
                        <li key={address.id} className="address-item">
                            <div
                                className="address-title"
                                onClick={() => {
                                    handleAddressClick(address)
                                }}
                            >
                                {address.title}
                            </div>
                            {selectedAddress?.id === address.id && (
                                <div className="address-details">
                                    <p>{address.details}</p>
                                    <p>{address.city}</p>
                                    <p>{address.country}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}