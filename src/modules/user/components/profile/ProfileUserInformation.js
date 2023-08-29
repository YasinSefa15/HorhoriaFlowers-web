import React from 'react'
import {useAuth} from "../../../../context/AuthContext";
import LoadingScreen from "../LoadingScreen";
import {profileGetUser, updateProfileInfo} from "../../../../api.requests/profile/ProfileRequests";
import CustomButton from "../CustomButton";
import {Helmet} from "react-helmet";

export default function ProfileUserInformation() {
    const [userForm, setUserForm] = React.useState(null)
    const [loaded, setLoaded] = React.useState(false)
    const {secret} = useAuth();

    React.useEffect(() => {
        if(secret){
            const fetchData = async () => {
                await profileGetUser({setUserForm, setLoaded, secret});
            };

            fetchData().then(r => {
            });
        }
    }, [secret]);


    const handleSubmit = () => {
        setLoaded(false)
        const fetchData = async () => {
            await updateProfileInfo({userForm, setLoaded, secret});
        };

        fetchData().then(r => {
        });

    }


    return (
        <>
            <Helmet>
                <title>Hooria E-Ticaret - Profilim</title>
                <meta
                    name="description"
                    content="Hooria e-ticaret platformunda profilinizi görüntüleyin, bilgilerinizi düzenleyin ve alışveriş deneyiminizi yönetin. Profilinizdeki bilgileri güncelleyebilir, sipariş geçmişinizi inceleyebilir ve hesap ayarlarınızı düzenleyebilirsiniz."
                />
                {/* Diğer meta etiketleri burada ekleyebilirsiniz */}
            </Helmet>

            {loaded ? (
                <>
                    <h2>Kullanıcı Bilgilerim</h2>

                    <br></br>

                    <div
                        className="container"
                    >

                        <div className="row ">
                            <div className="col-sm-1"></div>

                            <div className="col-sm-3">Adınız</div>

                            <div className="col-sm-6">
                                <input type="text" className="form-control " id="name" value={userForm.first_name || ''}
                                       onChange={(e) => {
                                           setUserForm({...userForm, first_name: e.target.value})
                                       }}
                                />
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col-sm-1"></div>

                            <div className="col-sm-3">Soyadınız</div>

                            <div className="col-sm-6">
                                <input type="text" className="form-control " id="name" value={userForm.last_name}
                                       onChange={(e) => {
                                           setUserForm({...userForm, last_name: e.target.value})
                                       }}
                                />
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col-sm-1"></div>

                            <div className="col-sm-3">Telefon Numaranız</div>

                            <div className="col-sm-6">
                                <input type="text" className="form-control " id="name" value={userForm.phone || ''}
                                       onChange={(e) => {
                                           setUserForm({...userForm, phone: e.target.value})
                                       }}
                                />
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col-sm-1"></div>

                            <div
                                className="col-sm-3"
                            >
                                Öncelikli Adresiniz
                            </div>

                            <div
                                className="col-sm-6"
                            >
                                <select className="form-select">
                                    <option>Mia</option>
                                    <option>köpük</option>
                                    <option>iş</option>
                                </select>
                            </div>
                        </div>

                        <br></br>

                        <div className="row justify-content-center">
                            <div className="">
                                <CustomButton
                                    text="Güncelle"
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                ></CustomButton>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <LoadingScreen></LoadingScreen>
            )}
        </>
    )
}