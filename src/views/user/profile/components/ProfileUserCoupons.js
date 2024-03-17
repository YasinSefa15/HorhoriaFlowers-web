import React from "react";
import {useAuth} from "../../../../context/AuthContext";
import LoadingScreen from "../../../../components/LoadingScreen";
import {getProfileUserCoupons} from "../../../../requests/profile/ProfileRequests";
import {Helmet} from "react-helmet";

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
            <Helmet>
                <title>Horhoria Flowers - Kuponlarım</title>
                <meta name="description" content="Hooria e-ticaret platformunda sahip olduğunuz ve kullanabileceğiniz kuponları görüntüleyin. İndirimlerden yararlanarak alışveriş yapın ve avantajlı fiyatlarla ürünler satın alın." />
            </Helmet>

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