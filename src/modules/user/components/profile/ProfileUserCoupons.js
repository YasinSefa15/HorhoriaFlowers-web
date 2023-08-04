import React from "react";
import {useAuth} from "../../../../context/AuthContext";
import LoadingScreen from "../LoadingScreen";
import {getProfileUserCoupons} from "../../../../api.requests/profile/ProfileRequests";

export default function ProfileUserCoupons() {
    const [userCoupons, setUserCoupons] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const {secret} = useAuth();

    React.useEffect(() => {
        const fetchUserCoupons = async () => {
            await getProfileUserCoupons({setUserCoupons, setLoaded, secret})
        }

        fetchUserCoupons().then(() => {
        })
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <h3>Tanımlı Kuponlarım</h3>
                </div>

                <div className="row">
                    {((() => {
                        if (loaded === false) {
                            return <LoadingScreen></LoadingScreen>
                        } else if (userCoupons.length === 0) {
                            return (
                                <>
                                    <div className="alert alert-warning" role="alert">
                                        Tanımlı kuponunuz bulunmamaktadır.
                                    </div>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    {userCoupons.map((coupon) => {
                                        return (
                                            <>
                                                <div className="col-sm-4 mt-2">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <p className="card-text">Kupon Kodu: {coupon.code}</p>
                                                            <p className="card-text">Kupon
                                                                Tutarı: {coupon.discount} ₺</p>
                                                            <p className="card-text">Kupon Başlangıç
                                                                Tarihi: {coupon.start_date}</p>
                                                            <p className="card-text">Kupon Bitiş
                                                                Tarihi: {coupon.end_date}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </>
                            )
                        }
                    }))()}
                </div>
            </div>

        </>
    )
}